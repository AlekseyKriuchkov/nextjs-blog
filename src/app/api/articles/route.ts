import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Article } from "@/types/article/types";

const filePath = path.join(process.cwd(), 'data.json');

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const article = await getArticleById(id);
    if (article) {
      return NextResponse.json(article);
    }
    return NextResponse.json({ message: 'Articles not found' });
  }

  const articles = await getArticles();
  if (articles) {
    return NextResponse.json(articles);
  }
  return []
}

export const POST = async (req: Request) => {
  const article: Omit<Article, 'id'> = await req.json();
  const createdArticle = await createArticle(article);
  if (createdArticle) {
    return NextResponse.json(createdArticle);
  }
  return NextResponse.json({ message: 'Article not created' });
}

export const PUT = async (req: Request) => {
  const updatedArticle: Article = await req.json();

  const updated = await updateArticle(updatedArticle.id, updatedArticle);

  if (updated) {
    return NextResponse.json(updated);
  }

  return NextResponse.json({ message: 'Article not found' }, { status: 404 });
};

export const DELETE = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  const deleted = await deleteArticle(id);

  if (deleted) {
    return NextResponse.json({ message: 'Article deleted' });
  } else {
    return NextResponse.json({ message: 'Article not found' }, { status: 404 });
  }
}

const getArticles = async (): Promise<Article[]> => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
}

const getArticleById = async (id: string): Promise<Article | null> => {
  const articles = await getArticles();
  const article = articles.find((article) => article.id === id);
  return article || null;
}

const createArticle = async (article: Omit<Article, 'id'>)=> {
  const articles = await getArticles();
  const newArticle = { id: String(Date.now()), ...article };
  const updatedArticles = [newArticle, ...articles];

  try {
    await fs.writeFile(filePath, JSON.stringify(updatedArticles));
    return newArticle;
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

const updateArticle = async (id: string, updatedData: Article) => {
  const articles = await getArticles();
  const index = articles.findIndex((a) => a.id === id);

  if (index !== -1) {
    articles[index] = { ...articles[index], ...updatedData };

    try {
      await fs.writeFile(filePath, JSON.stringify(articles));
      return articles[index];
    } catch (error) {
      console.error('Error writing data:', error);
      return null;
    }
  }

  return null;
};

const deleteArticle = async (id: string)=> {
  const articles = await getArticles();
  const index = articles.findIndex((a) => a.id === id);

  if (index !== -1) {
    articles.splice(index, 1);
    try {
      await fs.writeFile(filePath, JSON.stringify(articles));
      return true;
    } catch (error) {
      console.error('Error writing data:', error);
    }
  }
  return false;
}

"use client"

import styles from "@/app/edit/[id]/styles.module.scss";
import {FormEvent, useEffect, useState} from "react";
import {Article} from "@/types/article/types";
import {useParams, useRouter} from "next/navigation";
import {articleApi} from "@/services/article-services";

export const EditArticle = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      const data = await articleApi.getArticleById(id.toString());

      if (data) {
        setArticle(data);
        setTitle(data.title);
        setContent(data.content);
      } else {
        console.error('Article not found');
      }
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!article?.id) {
      console.error("Article ID not found");
      return;
    }

    const updatedArticle = {
      id: article.id,
      title,
      content,
    };

    try {
      const res = await articleApi.updateArticle(updatedArticle);
      if (res) {
        router.push('/articles');
      } else {
        console.error('Error creating article');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <label htmlFor="title">Заголовок</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputWrapper}>
        <label htmlFor="content">Содержание</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit">Сохранить изменения</button>
    </form>
  );
};

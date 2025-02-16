"use client"

import {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import Link from "next/link";

const ArticlePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      const res = await fetch(`/api/articles?id=${id}`);
      const data = await res.json();

      if (data && data.id) {
        setTitle(data.title);
        setContent(data.content);
      } else {
        console.error('Статья не найдена');
      }
    };
    fetchArticle();
  }, [id]);

  return (
    <div>
      <Link href="/articles">Вернуться к статьям</Link>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default ArticlePage;
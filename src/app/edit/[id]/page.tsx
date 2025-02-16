'use client'

import {FormEvent, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Article } from "@/types/article/types";
import styles from "./styles.module.scss";

const EditArticlePage = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const router = useRouter();

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      const res = await fetch(`/api/articles?id=${id}`);
      const data = await res.json();

      if (data && data.id) {
        setArticle(data);
        setTitle(data.title);
        setContent(data.content);
      } else {
        console.error('Статья не найдена');
      }
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!article?.id) {
      console.error("ID статьи не найден");
      return;
    }

    const updatedArticle = {
      id: article.id,
      title,
      content,
    };

    const res = await fetch(`/api/articles`, {
      method: 'PUT',
      body: JSON.stringify(updatedArticle),
    });

    if (res.ok) {
      router.push('/articles');
    } else {
      console.error('Ошибка при обновлении статьи');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Редактировать статью</h1>
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
    </div>
  );
};

export default EditArticlePage;

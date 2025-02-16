'use client'

import {FormEvent, useState} from 'react';
import { useRouter } from 'next/navigation';
import styles from "./styles.module.scss";

const CreateArticlePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newArticle = { title, content };

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        body: JSON.stringify(newArticle),
      });

      if (res.ok) {
        router.push('/articles');
      } else {
        console.error('Ошибка при создании статьи');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Создать статью</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputWrapper}>
          <label htmlFor="title">Заголовок статьи</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="content">Текст статьи</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Создаю...' : 'Создать'}
        </button>
      </form>
    </div>
  );
};

export default CreateArticlePage;

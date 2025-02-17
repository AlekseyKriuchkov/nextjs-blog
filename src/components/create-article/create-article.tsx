"use client"

import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import styles from "@/app/create/styles.module.scss";
import {articleApi} from "@/services/article-services";

export const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newArticle = { title, content };

    try {
      const res = await articleApi.createArticle(newArticle);
      if (res) {
        router.push('/articles');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Создаю...' : 'Создать'}
      </button>
    </form>
  );
};

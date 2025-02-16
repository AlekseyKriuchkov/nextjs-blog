'use client'

import {useEffect, useState} from 'react';
import {ArticleCard} from "@/shared/article-card/article-card";
import Link from "next/link";
import {Article} from "@/types/article/types";
import styles from "./styles.module.scss";

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await fetch('/api/articles');
      const data = await res.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/articles?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setArticles(articles.filter((article) => article.id !== id));
    } else {
      alert('Не удалось удалить статью');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Блог</h1>
      <Link className={styles.link} href="/create">Создать статью</Link>
      <div>
        {articles.map((article) => (
          <div key={article.id} className={styles.articlesWrapper}>
            <span className={styles.articleWrapper}>
              <Link className={styles.link} href={`/articles/${article.id}`}>
                <ArticleCard article={article} />
              </Link>
              <button className={styles.deleteButton} onClick={() => handleDelete(article.id)}>Удалить</button>
            </span>
              <Link className={styles.editLink} href={`/edit/${article.id}`}>
                Редактировать
              </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
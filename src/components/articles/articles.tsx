"use client"

import {useEffect, useState} from "react";
import {Article} from "@/types/article/types";
import styles from "@/app/articles/styles.module.scss";
import Link from "next/link";
import {ArticleCard} from "@/components/article-card/article-card";
import {articleApi} from "@/services/article-services";

export const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await articleApi.getArticles();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await articleApi.deleteArticle(id);
    console.log(res)

    if (res) {
      setArticles(articles.filter((article) => article.id !== id));
    } else {
      alert('Не удалось удалить статью');
    }
  };
  return (
    <>
      {articles.map((article) => (
        <div key={article.id} className={styles.articlesWrapper}>
            <span className={styles.articleWrapper}>
              <Link className={styles.link} href={`/articles/${article.id}`}>
                <ArticleCard title={article.title} content={article.content} />
              </Link>
              <button className={styles.deleteButton} onClick={() => handleDelete(article.id)}>Удалить</button>
            </span>
          <Link className={styles.editLink} href={`/edit/${article.id}`}>
            Редактировать
          </Link>
        </div>
      ))}
    </>
  );
};

"use client"

import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import {ArticleCard} from "@/components/article-card/article-card";
import {articleApi} from "@/services/article-services";

export const Article = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      const data = await articleApi.getArticleById(id.toString());
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      } else {
        console.error('Article not found');
      }
    };
    fetchArticle();
  }, [id]);
  return (
    <>
      <ArticleCard title={title} content={content} />
    </>
  );
};
import { Article } from '@/types/article/types';

export const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
}
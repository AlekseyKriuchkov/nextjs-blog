import Link from "next/link";
import {Article} from "@/components/article/article";

const ArticlePage = () => {
  return (
    <>
      <Link href="/articles">Вернуться к статьям</Link>
      <Article />
    </>
  );
};

export default ArticlePage;
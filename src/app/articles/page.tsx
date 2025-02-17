import Link from "next/link";
import styles from "./styles.module.scss";
import {Articles} from "@/components/articles/articles";

const ArticlesPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Блог</h1>
      <Link className={styles.link} href="/create">Создать статью</Link>
      <Articles />
    </div>
  );
}

export default ArticlesPage;
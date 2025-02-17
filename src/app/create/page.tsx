import styles from "./styles.module.scss";
import {CreateArticle} from "@/components/create-article/create-article";

const CreateArticlePage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Создать статью</h1>
      <CreateArticle />
    </div>
  );
};

export default CreateArticlePage;

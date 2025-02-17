import styles from "./styles.module.scss";
import {EditArticle} from "@/components/edit-article/edit-article";

const EditArticlePage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Редактировать статью</h1>
      <EditArticle />
    </div>
  );
};

export default EditArticlePage;

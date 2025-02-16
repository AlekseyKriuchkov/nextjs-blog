import styles from "./styles.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href="/articles">К статьям</Link>
    </div>
  );
}

import styles from "./PageButtom.module.css";
import Link from "next/link";

const PageButtom = () => {
  return (
    <div className={styles.container_buttom}>
      <div className={styles.grey_container}>
        <div className={styles.first_container}>
          <button className={styles.button}>
          <Link href="/terminology/terms">
            <a className={styles.button_text}>Learn Terms</a>
          </Link>
          </button>
          <Link href="/terminology/terms">
            <a className={styles.join_game}>Join Market Game &#x2192;</a>
          </Link>
        </div>
      </div>
      <div className={styles.green_container}>
        <div className={styles.contact_container}>
          <p className={styles.contact}>Contact:</p>
          <p className={styles.contact}>AvrilCui0717@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default PageButtom;

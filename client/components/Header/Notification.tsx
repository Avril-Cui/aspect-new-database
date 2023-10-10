import styles from "./Notification.module.css";
import Link from "next/link";

const Notification = () => {
  return (
    <div className={styles.background_note}>
      <p className={styles.notification}>
        New Season Is Released, Check It Out Here:{" "}
        <Link href="/game">
          <a className={styles.link}>Learn Aspect Virtual Market Game</a>
        </Link>
      </p>
    </div>
  );
};

export default Notification; 

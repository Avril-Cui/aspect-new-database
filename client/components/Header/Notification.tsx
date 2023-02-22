import styles from "./Notification.module.css";
import Link from "next/link";

const Notification = () => {
  return (
    <div className={styles.background_note}>
      <p className={styles.notification}>
        New Season Is Released, Check It Out Here:{" "}
        <Link href="/game">
          <a className={styles.link}>Stock Simulator</a>
        </Link>
        . Market Open From 8:00AM EST to 5:00PM EST.
      </p>
    </div>
  );
};

export default Notification; 

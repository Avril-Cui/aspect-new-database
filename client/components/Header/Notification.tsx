import styles from "./Notification.module.css";
import Link from "next/link";
import { useEffect } from "react";

const Notification = () => {
  return (
    <div className={styles.background_note}>
      <p className={styles.notification}>
        New Version of Stock Simulator Is Released, Check It Out Here:{" "}
        <Link href="/simulator">
          <a className={styles.link}>Stock Simulator</a>
        </Link>
      </p>
    </div>
  );
};

export default Notification; 

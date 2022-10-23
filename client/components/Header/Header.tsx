import styles from "./Header.module.css";
import dynamic from "next/dynamic";
const Manu = dynamic(
  () => import("./Manu"),
  {
    ssr: false,
  }
);
const Notification = dynamic(
  () => import("./Notification"),
  {
    ssr: false,
  }
);

const Header = () => {
  return (
    <div className={styles.header}>
      <Notification />
      <Manu />
    </div>
  );
};

export default Header;
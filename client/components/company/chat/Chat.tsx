import styles from "./Chat.module.css";
import Link from "next/link";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import ChatPages from "./ChatPages";
import Cookies from "universal-cookie";


const Chat = () => {
  const cookies = new Cookies();
  const user = cookies.get("userData");
  const router = useRouter();
  const handleLogout = () => {
    cookies.remove("userData")
  };
  return (
    <div>
      <div className={styles.chat_header}>
        <p className={styles.icon}>🔥 🚀 💬</p>
        <button className={styles.button_login}>
          <p className={styles.style_but}>
            {user ? (
              <Nav.Link
                className={styles.section}
                onClick={() => {
                  handleLogout;
                  router.push("/");
                }}
              >
                Sign Out
              </Nav.Link>
            ) : (
              <Link className={styles.section} href="/">
                Log In
              </Link>
            )}
          </p>
        </button>
      </div>

        <ChatPages />
    </div>
  );
};

export default Chat;

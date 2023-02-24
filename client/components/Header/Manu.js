import styles from "./Manu.module.css";
import Button from "../UI/Button";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import alien from "../../image/logo/alien.png";
import Image from "next/image";

const Manu = () => {
  const router = useRouter();

  const cookies = new Cookies();
  const userData = cookies.get("userData");

  const handleLogout = () => {
    cookies.remove("userData", { path: "/" });
    cookies.remove("user_uid", { path: "/" });

    router.push("/");
  };

  return (
    <header className={styles.manu}>
      <div className={styles.center}>
        <Link href="/">
          <a className={styles.inline} style={{ marginTop: "0.2em" }}>
            <p className={styles.logo}>ASPECT</p>
            <div style={{ marginLeft: "0.5em" }}>
              <Image src={alien} width="55px" height="45px" alt="" />
            </div>
          </a>
        </Link>
        <div className={styles.sections}>
          <div>
            <Link href="/game">
              <a>Game</a>
            </Link>
          </div>
          <div>
            <Dropdown link={"/terms"} className={styles.drop}>
              <Link href="/terms">
                <a>Terminology</a>
              </Link>
            </Dropdown>
          </div>
          <div>
            <Dropdown link={"/model"} className={styles.drop}>
              <Link href="/model">
                <a>Model</a>
              </Link>
            </Dropdown>
          </div>
          {userData ? (
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          ) : null}
        </div>

        <Button>
          <p className={styles.style_but}>
            {userData ? (
              <Nav.Link className={styles.text} onClick={handleLogout}>
                <a>Log Out</a>
              </Nav.Link>
            ) : (
              <Nav.Link className={styles.text} href="/auth/login">
                <a className={styles.login_text}>Log In</a>
              </Nav.Link>
            )}
          </p>
        </Button>
      </div>
    </header>
  );
};

export default Manu;

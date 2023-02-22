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

  // const news_sections = {
  //   one: "Today's News",
  //   two: "Global Market",
  //   three: "Economics",
  //   four: "Technology",
  // };
  // const terms_sections = {
  //   one: "Accounting",
  //   two: "Valuation",
  //   three: "Portfolio",
  //   four: "De-Fi",
  // };
  // const model_sections = {
  //   one: "Excel",
  //   two: "Portfolio",
  //   three: "Black Scholes",
  //   four: "Technical",
  // };

  const handleLogout = () => {
    cookies.remove("userData", { path: "/" });
    cookies.remove("user_uid", { path: "/" });

    router.push("/");
  };

  return (
    <header className={styles.manu}>
      <Link href="/">
        <div className={styles.inline} style={{ marginTop: "0.2em" }}>
          <a className={styles.logo}>ASPECT</a>
          <div style={{ marginLeft: "0.5em" }}>
            <Image src={alien} width="55px" height="45px" alt=""/>
          </div>
        </div>
      </Link>
      <div className={styles.sections}>
        <div>
          <Link href="/game">
            <a>Game</a>
          </Link>
        </div>
        {/* <div>
          <Dropdown
            link={"/news"}
            content={news_sections}
            className={styles.drop}
          >
            <Link href="/news">
              <a className={styles.news}>News</a>
            </Link>
          </Dropdown>
        </div> */}
        <div>
          <Dropdown
            link={"/terms"}
            className={styles.drop}
          >
            <Link href="/terms">
              <a>Terminology</a>
            </Link>
          </Dropdown>
        </div>
        <div>
          <Dropdown
            link={"/model"}
            className={styles.drop}
          >
            <Link href="/model">
              <a>Model</a>
            </Link>
          </Dropdown>
        </div>
      </div>

      <Button>
        <p className={styles.style_but}>
          {userData ? (
            <Nav.Link className={styles.text} onClick={handleLogout}>
              Log Out
            </Nav.Link>
          ) : (
            <Nav.Link className={styles.text} href="/auth/login">
              <a className={styles.login_text}>Log In</a>
            </Nav.Link>
          )}
        </p>
      </Button>
    </header>
  );
};

export default Manu;

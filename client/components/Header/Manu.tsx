import styles from "./Manu.module.css";
import Button from "../UI/Button";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { Nav } from 'react-bootstrap'
import { useRouter } from 'next/router';
import Cookies from "universal-cookie";

const Manu = () => {
  const router = useRouter();

  const cookies = new Cookies();
  const userData = cookies.get("userData");

  const news_sections = {
    one: "Today's News",
    two: "Global Market",
    three: "Economics",
    four: "Technology",
  };
  const terms_sections = {
    one: "Accounting",
    two: "Valuation",
    three: "Portfolio",
    four: "De-Fi",
  };
  const model_sections = {
    one: "Excel",
    two: "Portfolio",
    three: "Black Scholes",
    four: "Technical",
  };
  const simulator_sections = {
    one: "Learn Company",
    two: "View News",
    three: "Join Game",
    four: "Trade",
  };

  const handleLogout = () => {
    cookies.remove('userData', { path: '/' });
    router.push("/")
    console.log(userData)
  };

  return (
    <header className={styles.manu}>
      <Link href="/">
        <a className={styles.logo}>ASPECT</a>
      </Link>
      <div className={styles.sections}>
        <div>
          <Dropdown
            link={"/news"}
            content={news_sections}
            className={styles.drop}
          >
            <Link href="/news">
              <a className={styles.news}>News</a>
            </Link>
          </Dropdown>
        </div>
        <div>
          <Dropdown
            link={"/terms"}
            content={terms_sections}
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
            content={model_sections}
            className={styles.drop}
          >
            <Link href="/model">
              <a>Model</a>
            </Link>
          </Dropdown>
        </div>
        <div>
          <Dropdown
            link={"/simulator"}
            content={simulator_sections}
            className={styles.drop}
          >
            <Link href="/simulator">
              <a>Simulator</a>
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
            <Nav.Link className={styles.text} href="/">
              <a className={styles.login_text}>Log In</a>
            </Nav.Link>
          )}
        </p>
      </Button>
    </header>
  );
};

export default Manu;

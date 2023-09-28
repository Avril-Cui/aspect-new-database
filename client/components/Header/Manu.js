import styles from "./Manu.module.css";
import Button from "../UI/Button";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import alien from "../../image/logo/alien.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Manu = () => {

  // const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();

  const cookies = new Cookies();
  // const userData = cookies.get("userData");]
  const [userData, setUserData] = useState(null);

  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    console.log(user)
    console.log("users")
    console.log(cookies.get(userData))
    if (user != null) {
      const email = user.email;
      const user_name = user.nickname;
      const uid = user.email;
      console.log("user");
      console.log(user);
      cookies.set("userData", { email, user_name }, { path: "/" });
      cookies.set("user_uid", uid, { path: "/" });
      const data = JSON.stringify({ uid, user_name });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.serverConnection}/login`,
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios.request(config);
    }
    const newUserData = cookies.get("userData");
    setUserData(newUserData);
    console.log("is auth");
    console.log(isAuthenticated);
  }, [user]);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: "https://www.aspect-game.com" } });
    cookies.remove("userData", { path: "/" });
    cookies.remove("user_uid", { path: "/" });
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
          {userData ? (
            <Link href="/dashboard">
              <a style={{ color: "#c3fcc2" }}>Dashboard</a>
            </Link>
          ) : null}
          {isEnd ? (
            <div>
              <Link href="/season-review">
                <a style={{ color: "#f3ec78" }}>Season Review</a>
              </Link>
            </div>
          ) : null}
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
        </div>

        <Button>
          <div className={styles.style_but}>
            {userData != null ? (
              <a className={styles.text} onClick={handleLogout}>
                Log Out
              </a>
            ) : (
              <a
                className={styles.login_text}
                onClick={() => loginWithRedirect()}
              >
                Log In
              </a>
            )}
          </div>
        </Button>
      </div>
    </header>
  );
};

export default Manu;

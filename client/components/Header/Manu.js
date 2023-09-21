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
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

const Manu = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const cookies = new Cookies();
  // const userData = cookies.get("userData");]
  const [userData, setUserData] = useState(null);

  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (user != null) {
      console.log(user.nickname);
      const email = user.email;
      const user_name = user.nickname;
      const uid = user.sid;
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

    // if (userData == undefined) {
    //   cookies.remove("userData", { path: "/" });
    //   cookies.remove("user_uid", { path: "/" });
    //   const axios = require("axios");
    //   axios
    //     .request({
    //       method: "post",
    //       maxBodyLength: Infinity,
    //       url: `${process.env.serverConnection}/is-end-game`,
    //     })
    //     .then((response) => {
    //       if (response.data == "0") {
    //         setIsEnd(true);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    const newUserData = cookies.get("userData");
    setUserData(newUserData);
  }, [user]);

  const handleLogout = () => {
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
              <Nav.Link
                className={styles.text}
                href="/api/auth/logout"
                onClick={handleLogout}
              >
                <a>Log Out</a>
              </Nav.Link>
            ) : (
              <Link href="/api/auth/login">
                <a className={styles.login_text} id="log-in-btn">
                  Log In
                </a>
              </Link>
            )}
          </div>
        </Button>
      </div>
    </header>
  );
};

export default Manu;

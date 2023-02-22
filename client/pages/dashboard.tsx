import { useState, useEffect } from "react";
import TradeInput from "../components/dashboard/TradeInput";
import ShowPortfolio from "../components/dashboard/ShowPortfolio";
import Head from "next/head";
import ShowCompValue from "../components/dashboard/ShowCompValue";
import styles from "../styles/portfolio.module.css";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "../components/Header/Header";
import LeaderBoard3 from "../components/simulator/LeaderBoard3";

const Home = (props: any) => {
  const cookies = new Cookies();
  const user_uid = cookies.get("user_uid");

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [rank, setRank] = useState(0);

  useEffect(() => {
    var data = JSON.stringify(user_uid);
    var config = {
      method: "post",
      url: "https://aspect-server.onrender.com/show-ranking",
      headers: {
        "Content-Type": "text/plain",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setRank(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => clearInterval(data);
  }, [user_uid]);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
      <div className={styles.container}>
        <div className={styles.center_container}>
          <div className={styles.inline}>
            <div>
              <p className={styles.header}>PORTFOLIO OVERVIEW</p>
              <div
                className={styles.value_container}
                style={{ marginBottom: "1.25em" }}
              >
                <ShowPortfolio />
              </div>
              <div>
                <p className={styles.header}>GAME STATUS</p>
                <div
                  className={styles.value_container}
                  style={{
                    paddingLeft: "1em",
                    paddingTop: "0.5em",
                    paddingBottom: "0.75em",
                  }}
                >
                  <p className={styles.title}>CURRENT RANK</p>
                  <p className={styles.account_value}>{rank}</p>
                  <button className={styles.trade_btn} onClick={togglePopup}>
                    <p>Trade Stocks</p>
                  </button>
                  {isOpen && <TradeInput toggleClose={togglePopup} />}
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "1em" }}>
              <p className={styles.header}>HOLDING DETAIL</p>
              <div className={styles.holdings_container}>
                <ShowCompValue />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.center_container}>
          <div style={{ marginTop: "1.5em", marginBottom: "7em" }}>
            <div style={{ marginLeft: "1em" }}>
              <p className={styles.header}>GAME RANKING</p>
              <div className={styles.leaderboard}>
                <LeaderBoard3 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

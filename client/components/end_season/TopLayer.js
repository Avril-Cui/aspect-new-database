import React from "react";
import Cookies from "universal-cookie";
// import BotRanking from "./BotRanking";
import dynamic from "next/dynamic";
// import PortfolioDetail from "./portfolio_datail";
import LeaderBoard3 from "./LeaderBoard3";
import { useState, useEffect } from "react";
import styles from "../../styles/EndSeason/SeasonalReview.module.css";
const BotRanking = dynamic(() => import("./BotRanking"), {
  ssr: false,
});
const PortfolioDetail = dynamic(() => import("./portfolio_datail"), {
  ssr: false,
});


function TopLayer() {
  const cookies = new Cookies();
  const user_uid = cookies.get("user_uid");
  const [isLogIn, setIsLogIn] = useState(false);
  useEffect(() => {
    if (user_uid != undefined) {
      setIsLogIn(true);
    }
  }, [isLogIn]);

  return (

    <div className={styles.layer}>
      <p className={styles.layer_header}>🏆 Top 15 Users 🏆</p>
      {isLogIn == false ? (
        <div className={styles.inline}>
          <div className={styles.leaderboard}>
            <LeaderBoard3 />
          </div>
          <div
            style={{
              marginLeft: "1.5em",
              paddingTop: "0.5em",
              paddingBottom: "0.75em",
            }}
          >
            <div className={styles.login}>
              <p>Log In To Check Your Seasonal Stats!</p>
            </div>
            <div>
              <p
                className={styles.layer_header}
              >
                👾 Bot Ranking 👾
              </p>
              <div className={styles.BotRanking}>
                <BotRanking />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.inline}>
          <div className={styles.leaderboard}>
            <LeaderBoard3 />
          </div>
          <div
            style={{
              marginLeft: "1.5em",
              paddingTop: "0.5em",
              paddingBottom: "0.75em",
            }}
          >
            <PortfolioDetail user_uid={user_uid}/>

            <div>
              <p className={styles.layer_header1} style={{ marginTop: "0.75em" }}>
                👾 Bot Ranking 👾
              </p>
              <div className={styles.BotRanking}>
                <BotRanking />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopLayer;

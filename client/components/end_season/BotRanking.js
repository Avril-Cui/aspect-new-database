import React from "react";
import styles from "./BotRanking.module.css";
import { useState, useEffect } from "react";

function BotRanking() {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [botRank, setBotRanking] = useState({
    "loading...": {
      cash_value: 0,
      value_change: 0,
      pct_change: 0,
      ranking: 0,
    },
  });
  useEffect(() => {
    const axios = require("axios");
    axios({
      method: "post",
      url: `${process.env.serverConnection}/total-bot-rank`,
    })
      .then(function (response) {
        setBotRanking(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <table className={styles.user_table}>
      <tbody>
        <tr>
          <th>Rank</th>
          <th>Bot Name</th>
          <th style={{ width: "12em" }}>%</th>
        </tr>
      </tbody>
      <tbody>
        <tr key="1">
          <td className={styles.normal}>1</td>
          <td className={styles.normal}>Arima</td>
          <td
            className={styles.normal}
            style={
              1 > 0
                ? { color: "#C9FFD1" }
                : { color: "#FD6565" }
            }
          >
            273.79%
          </td>
        </tr>
        <tr key="2">
          <td className={styles.normal}>2</td>
          <td className={styles.normal}>MysticAdventurer</td>
          <td
            className={styles.normal}
            style={
              1 > 0
                ? { color: "#C9FFD1" }
                : { color: "#FD6565" }
            }
          >
            15.5%
          </td>
        </tr>
        <tr key="3">
          <td className={styles.normal}>3</td>
          <td className={styles.normal}>KnightNexus</td>
          <td
            className={styles.normal}
            style={
              1 > 0
                ? { color: "#C9FFD1" }
                : { color: "#FD6565" }
            }
          >
            12.19%
          </td>
        </tr>
        <tr key="1">
          <td className={styles.normal}>4</td>
          <td className={styles.normal}>MagicRider</td>
          <td
            className={styles.normal}
            style={
              1 > 0
                ? { color: "#C9FFD1" }
                : { color: "#FD6565" }
            }
          >
            2.05%
          </td>
        </tr>
        <tr key="1">
          <td className={styles.normal}>5</td>
          <td className={styles.normal}>DiamondCrystal</td>
          <td
            className={styles.normal}
            style={
              -1 > 0
                ? { color: "#C9FFD1" }
                : { color: "#FD6565" }
            }
          >
            -14.67%
          </td>
        </tr>
        <tr key="1">
          <td className={styles.normal}>6</td>
          <td className={styles.normal}>MadInvestor</td>
          <td
            className={styles.normal}
            style={
              -1 > 0
                ? { color: "#C9FFD1" }
                : { color: "#FD6565" }
            }
          >
            -19.46%
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default BotRanking;

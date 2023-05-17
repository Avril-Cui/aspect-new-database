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
          <th>Percentage Change</th>
        </tr>
      </tbody>
      <tbody>
        {Object.entries(botRank).map(([key, value], i) => (
          <tr key={key}>
            <td className={styles.normal}>{value["ranking"]}</td>
            <td className={styles.normal}>{key}</td>
            <td
              className={styles.normal}
              style={
                value["pct_change"] > 0
                  ? { color: "#C9FFD1" }
                  : { color: "#FD6565" }
              }
            >
              {formatter.format(value["pct_change"] * 100)} %
            </td>
          </tr>
        ))}        
      </tbody>
    </table>
  );
}

export default BotRanking;

import React from 'react'
import styles from "./BotRanking.module.css";
import { useEffect, useState } from "react";

function BotRanking() {
    const formatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    
      const [ranking, setRanking] = useState({
        "": {
          cash_value: null,
          value_change: 0,
          pct_change: 0,
          ranking: 0,
        },
      });
    
      useEffect(() => {
        var axios = require("axios");
        var config = {
          method: "POST",
          url: `${process.env.serverConnection}/total-bot-rank`,
          headers: {},
        };
    
        axios(config)
          .then(function (response) {
            setRanking(response.data);
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
            {Object.entries(ranking).map(([key, value], i) => (
              <tr key={key}>
                <td className={styles.ranking}>{value["ranking"]}</td>
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

export default BotRanking
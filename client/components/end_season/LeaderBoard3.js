import React from "react";
import styles from "./LeaderBoard3.module.css";
import { useState, useEffect } from "react";

function LeaderBoard3() {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const [ranking, setRanking] = useState({
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
      url: `${process.env.serverConnection}/fifteen-rank`,
    })
      .then(function (response) {
        setRanking(response.data);
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
          <th style={{width: "12em"}}>User Name</th>
          <th>Cash Value</th>
          <th>Value Change</th>
          <th>Percentage</th>
        </tr>
      </tbody>
      <tbody>
        {Object.entries(ranking).map(([key, value], i) => (
          <tr key={key}>
            <td className={styles.normal}>{value["ranking"]}</td>
            <td className={styles.normal} style={{width: "12em"}}>{key}</td>
            <td className={styles.normal}>${value["cash_value"]}</td>
            <td
              className={styles.normal}
              style={
                value["value_change"] > 0
                  ? { color: "#C9FFD1" }
                  : { color: "#FD6565" }
              }
            >
              {value["value_change"]}
            </td>
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

export default LeaderBoard3;

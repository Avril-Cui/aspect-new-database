import React from "react";
import styles from "./LeaderBoard3.module.css";
import { useEffect, useState } from "react";

function LeaderBoard3() {
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
      url: "https://aspect-server.onrender.com/total-rank",
      headers: {},
    };

    axios(config)
      .then(function (response: any) {
        setRanking(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, []);

  return (
    <table className={styles.user_table}>
      <tbody>
        <tr>
          <th>Rank</th>
          <th>User Name</th>
          <th>Cash Value</th>
          <th>Value Change</th>
          <th>Percentage Change</th>
        </tr>
      </tbody>
      <tbody>
        {Object.entries(ranking).map(([key, value], i) => (
          <tr key={key}>
            <td className={styles.ranking}>{value["ranking"]}</td>
            <td className={styles.normal}>{key}</td>
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

import React from "react";
import styles from "./LeaderBoard.module.css";
import { useEffect, useState } from "react";

function LeaderBoard() {
  const [ranking, setRanking] = useState({
    avrilcui: {
      cash_value: 100000.0,
      value_change: 0.0,
      pct_change: 0.0,
      ranking: 1,
    },
  });
  console.log(typeof ranking);
  useEffect(() => {
    var axios = require("axios");
    var data = "";

    var config = {
      method: "get",
      url: "http://127.0.0.1:5000/total-rank",
      headers: {},
      data: data,
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
          <th>Total Change</th>
        </tr>
        <tr>
          {Object.entries(ranking).map(
            ([key, value], i) =>
              i < 6 && (
                <>
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
                    {value["pct_change"] * 100} %
                  </td>
                </>
              )
          )}
        </tr>
      </tbody>
    </table>
  );
}

export default LeaderBoard;

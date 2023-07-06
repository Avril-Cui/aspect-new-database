import React from "react";
import styles from "../../styles/EndSeason/SeasonalReview.module.css";
import { useState, useEffect } from "react";

function PortfolioDetail(props) {

  const [portfolio, setPortfolio] = useState({
    rank: 0,
    cash: 0,
    pct_change: 0,
  });

  useEffect(() => {
    const axios = require("axios");
    let data = JSON.stringify(props.user_uid);

    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: `${process.env.serverConnection}/end-season-user-data`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "text/plain",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setPortfolio(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <p className={styles.title}>Final Ranking</p>
      <div className={styles.rank_num} style={{ marginBottom: "0.2em" }}>
        {portfolio["rank"]}
      </div>
      <p className={styles.title}> End Account Value</p>
      <p className={styles.account_value} style={{ marginBottom: "0.2em" }}>
        $ {portfolio["cash"]}
      </p>
      <div className={styles.inline} style={{ marginTop: "-1em" }}>
        <div>
          <p className={styles.title}>Initial Account Value</p>
          <p className={styles.price_change}>$ 100000</p>
        </div>
        <div style={{ marginLeft: "5em" }}>
          <p className={styles.title}>Total Change</p>
          <p className={styles.price_change}>{portfolio["pct_change"]} %</p>
        </div>
      </div>
    </div>
  );
}

export default PortfolioDetail;

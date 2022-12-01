import React from "react";
import axios from "axios";
import styles from "../../styles/portfolio.module.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function ShowPortfolio() {
  const [loading, setLoading] = useState(false);

  const loadingState = {
    accountValue: "...",
    cashValue: "...",
    category: "portfolio_value",
    holdingValue: "...",
  };

  const [portfolio, setPortfolio] = useState({
    accountValue: undefined,
    cashValue: undefined,
    category: "portfolio_value",
    holdingValue: undefined,
  });

  const cookies = new Cookies();

  const WAIT_TIME = 1000;
  const [price, setPrice] = useState(undefined);

  useEffect(() => {
    if (portfolio.accountValue != undefined){
      setLoading(true);
    }
    const data = setInterval(() => {
      axios({
        method: "POST",
        url: "http://127.0.0.1:5000/current-price",
        headers: {
          "Content-Type": "text/plain",
        },
        data: JSON.stringify("wrkn"),
      })
        .then((response) => {
          const res = response.data;
          const price = res.price;
          setPrice(price);
          console.log(price);
        })
        .catch((error) => {
          console.log(error);
        });
      var config = {
        method: "POST",
        url: "http://127.0.0.1:5000/update-value",
        headers: {
          "Content-Type": "text/plain",
        },
        data: JSON.stringify({
          name_price_dict: { wrkn: price },
        }),
      };

      axios(config)
        .then(function (response) {
          setPortfolio(response.data.portfolio_value);
          console.log(response.data.portfolio_value)
        })
        .catch(function (error) {
          console.log(error);
        });
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [price, portfolio]);

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  let total_change = 0;

  if (portfolio.accountValue != undefined) {
    total_change = round(((portfolio.accountValue - 100000) / 100000) * 100);
  } else {
    total_change = 0;
  }

  return (
    <div
      style={{
        marginLeft: "1em",
        paddingTop: "0.5em",
        paddingBottom: "0.75em",
      }}
    >
      {loading ? (
        <div>
          {" "}
          <p className={styles.title}>Account Value</p>
          <div
            className={styles.account_value}
            style={{ marginBottom: "0.2em" }}
          >
            $ {portfolio.accountValue}
          </div>
          <div className={styles.inline} style={{ marginTop: "0.25em" }}>
            <div>
              <p className={styles.title}>Net Holding</p>
              <div className={styles.price_change}>
                {round(portfolio.holdingValue)}
              </div>
            </div>
            <div style={{ marginLeft: "5em" }}>
              <p className={styles.title}>Total Change</p>
              <div className={styles.price_change}>{total_change}%</div>
            </div>
          </div>
          <div className={styles.inline} style={{ marginTop: "0.25em" }}>
            <div>
              <p className={styles.title}>Cash Value</p>
              <div className={styles.price_change}>
                {round(portfolio.cashValue)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <p className={styles.title}>Account Value</p>
          <div
            className={styles.account_value}
            style={{ marginBottom: "0.2em" }}
          >
            $ {loadingState.accountValue}
          </div>
          <div className={styles.inline} style={{ marginTop: "0.25em" }}>
            <div>
              <p className={styles.title}>Net Holding</p>
              <div className={styles.price_change}>
                {loadingState.holdingValue}
              </div>
            </div>
            <div style={{ marginLeft: "5em" }}>
              <p className={styles.title}>Total Change</p>
              <div className={styles.price_change}>{total_change}%</div>
            </div>
          </div>
          <div className={styles.inline} style={{ marginTop: "0.25em" }}>
            <div>
              <p className={styles.title}>Cash Value</p>
              <div className={styles.price_change}>
                {round(loadingState.cashValue)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ShowPortfolio;

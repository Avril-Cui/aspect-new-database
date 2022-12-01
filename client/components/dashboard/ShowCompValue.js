import { useRef } from "react";
import styles from "../../styles/portfolio.module.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function ShowCompValue(props) {
  const cookies = new Cookies();
  const userData = cookies.get("userData");

  const containerRef = useRef(null);
  const [portfolio, setPortfolio] = useState({
    portfolio_value: {
      accountValue: 0,
      cashValue: 0,
      category: "portfolio_value",
      holdingValue: 0,
    },
  });

  const WAIT_TIME = 2000;

  useEffect(() => {
    const data = setInterval(() => {
      var axios = require("axios");
      var data = JSON.stringify(userData.user_name);

      var config = {
        method: "post",
        url: "http://127.0.0.1:5000/portfolio-detail",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setPortfolio(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [portfolio]);

  console.log(portfolio["portfolio_value"]);

  return (
    <div className={styles.scroll}>
      <div ref={containerRef}>
        <table className={styles.screener_table}>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Last Buy-In</th>
              <th>Total Value</th>
              <th>Change</th>
              <th>Percentage</th>
            </tr>
          </tbody>
          {Object.keys(portfolio).map((key) => {
            return key != "portfolio_value" ? (
              <tbody    className={styles.table_line}>
                {" "}
                <Company
                  company={portfolio[key]}
                />
              </tbody>
            ) : (
              <tbody key="random"></tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}

import classes from "../../styles/portfolio.module.css";
import axios from "axios";

function Company(props) {
  const { total_holdings, category, shares, last_price } = props.company;

  let company_value = null;
  let share_number = null;
  let comp_name = category;
  let last_buy_in = null;
  let price_change = 0;
  let price_pct_change = 0;

  const [price, setPrice] = useState(undefined);

  console.log(comp_name);

  const WAIT_TIME = 2000;

  useEffect(() => {
    const data = setInterval(() => {
      axios({
        method: "POST",
        url: "http://127.0.0.1:5000/current-price",
        headers: {
          "Content-Type": "text/plain",
        },
        data: JSON.stringify(comp_name),
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
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [price]);

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  if (category != "portfolio_value") {
    company_value = total_holdings;
    share_number = shares;
    comp_name = category;
    last_buy_in = last_price;
    // current_price = price;
    price_change = round(price - last_price);
    price_pct_change = round(((price - last_price) / last_price) * 100);
  }

  return (
    <tr key={category} className={styles.holding_detail}>
      <td className={classes.comp_link}>{category}</td>
      <td>{share_number}</td>
      <td>{last_buy_in}</td>
      <td>{round(company_value)}</td>
      <td
        style={price_change > 0 ? { color: "#C9FFD1" } : { color: "#FD6565" }}
      >
        {price_change}
      </td>
      <td
        style={
          price_pct_change > 0 ? { color: "#C9FFD1" } : { color: "#FD6565" }
        }
      >
        {price_pct_change}%
      </td>
    </tr>
  );
}
export default ShowCompValue;

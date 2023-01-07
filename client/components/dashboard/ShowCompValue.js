import { useRef } from "react";
import styles from "../../styles/portfolio.module.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

function ShowCompValue(props) {
  const cookies = new Cookies();
  const user_uid = cookies.get("user_uid");

  const containerRef = useRef(null);
  const [portfolio, setPortfolio] = useState({
    portfolio_value: {
      accountValue: 0,
      cashValue: 0,
      category: "portfolio_value",
      holdingValue: 0,
    },
  });

  const WAIT_TIME = 3000;

  useEffect(() => {
    const data = setInterval(() => {
      var axios = require("axios");
      var data = JSON.stringify(user_uid);

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
  }, [portfolio, user_uid]);


  return (
    <div className={styles.scroll}>
      <div ref={containerRef}>
        <table className={styles.screener_table}>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Shares</th>
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
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  const {category, shares_holding, total_holding, cost} = props.company;  

  let company_value = null;
  let share_number = null;
  let comp_name = category;
  let price_pct_change = 0;
  let price_change = 0;

  if (category != "portfolio_value") {
    company_value = total_holding;
    share_number = shares_holding;
    comp_name = category;
    // current_price = price;
    price_change = round(total_holding - cost);
    price_pct_change = round(((total_holding - cost) / cost) * 100);
  }

  if (share_number != 0){
    return (
      <tr key={category} className={styles.holding_detail}>
        <td className={classes.comp_link}>{category}</td>
        <td>{share_number}</td>
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
  } else{
    return <tbody key="random"></tbody>
  }
}
export default ShowCompValue;

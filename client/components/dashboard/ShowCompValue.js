import { useRef } from "react";
import styles from "../../styles/portfolio.module.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Link from "next/link";

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

  const WAIT_TIME = 5000;

  useEffect(() => {
    const data = setInterval(() => {
      var axios = require("axios");
      var data = JSON.stringify(user_uid);

      var config = {
        method: "post",
        url: "https://aspect-server.onrender.com/portfolio-detail",
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
          <tbody className={styles.table_line}>
            {Object.keys(portfolio).map((key) => {
              return key != "portfolio_value" ? (
                <Company company={portfolio[key]} />
              ) : null;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Company(props) {
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  const { category, shares_holding, total_holding, cost } = props.company;

  let company_value = null;
  let share_number = null;
  let comp_name = category;
  let price_pct_change = 0;
  let price_change = 0;

  if (category != "portfolio_value") {
    company_value = total_holding;
    share_number = shares_holding;
    comp_name = category;
    price_change = round(total_holding - cost);
    price_pct_change = round(((total_holding - cost) / cost) * 100);
  }

  if (share_number != 0) {
    return (
      <tr key={category} className={styles.holding_detail}>
        <Link href={`/company/${category}`}>
          <a>
            <td className={styles.comp_link}>{category.toUpperCase()}</td>
          </a>
        </Link>
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
  } else {
    return <tbody key="random"></tbody>;
  }
}
export default ShowCompValue;

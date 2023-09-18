import { useRef } from "react";
import styles from "../../styles/portfolio.module.css";
import Link from "next/link";
import alien from "../../image/logo/alien.png";
import Image from "next/image";

function ShowCompValue(props) {
  return (
    <div className={styles.scroll}>
      <div>
        <table className={styles.screener_table}>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Buy Price</th>
              <th>Current Price</th>
              <th>Total Value</th>
              <th>Change</th>
              <th>Percentage</th>
            </tr>
          </tbody>
          <tbody className={styles.table_line}>
            {Object.keys(props.portfolio).map((key) => {
              return key != "portfolio_value" ? (
                <Company company={props.portfolio[key]} />
              ) : null;
            })}
          </tbody>
        </table>
        {Object.keys(props.portfolio).length > 1 ? null : (
          <div className={styles.alien_img}>
            {" "}
            <Image src={alien} width="210px" height="150px" alt="" />
            <p className={styles.no_text}>
              You don&apos;t hold any stocks yet! Make a trade below.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Company(props) {
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  const { category, shares_holding, total_holding, cost, current_price, buy_price } = props.company;

  let company_value = null;
  let share_number = null;
  let price_pct_change = 0;
  let price_change = 0;
  let buyPrice = 0;
  let currentPrice = 0;
  let comp_name = category;


  if (category != "portfolio_value") {
    company_value = total_holding;
    share_number = shares_holding;
    comp_name = category;
    price_change = round(total_holding - cost);
    price_pct_change = round(((total_holding - cost) / cost) * 100);
    buyPrice = buy_price;
    currentPrice = current_price;
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
        <td>{buyPrice}</td>
        <td>{currentPrice}</td>
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
    return <tr key="random"></tr>;
  }
}
export default ShowCompValue;

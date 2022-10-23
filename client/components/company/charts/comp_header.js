import { useState, useEffect } from "react";
import styles from "../../../styles/simulator/company.module.css";
import { useSelector, useDispatch } from "react-redux";
import { requestPrice } from "../../../features/newPrice.js";

const CompHeader = (props) => {
  const dispatch = useDispatch();
  const WAIT_TIME = 3000;

  let price = useSelector((state) => state.price.value);
  let last_price = useSelector((state) => state.price.price_change);

  const [isPrice, setIsPrice] = useState(false);
  const loadingPrice = "N/A";
  useEffect(() => {
    const data = setInterval(() => {
      dispatch(requestPrice());
      setIsPrice(true);
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
 });

  return (
    <div className={styles.top_container}>
      <div className={styles.header_container}>
        <div style={{ height: 25 }} />
        <div className={styles.top_container_inline}>
          <div className={styles.comp_logo}>
            <p>{props.CompanyShortName}</p>
          </div>
          <p className={styles.comp_name}>{props.CompanyFullName}</p>
          <div className={styles.buttons}>
            <div>
              <button className={styles.watch_list}>
                <p>
                  <span>&#9734;</span> Watchlist
                </p>
              </button>
            </div>
            <div>
              <button className={styles.trade_button}>
                <p>💰 Trade This Stock √</p>
              </button>
            </div>
          </div>
        </div>

        <p className={styles.index_name}>APINX</p>
        <div className={styles.inline}>
          <p className={styles.stock_price}>
            {isPrice ? price[props.CompanyName] : loadingPrice}
            <span>ASD</span>
          </p>
          <p className={styles.price_change} style={
                price[props.CompanyName] - last_price[props.CompanyName] > 0
                  ? { color: "#C9FFD1" }
                  : { color: "#FD6565" }
              }>
            {formatter.format(price[props.CompanyName] - last_price[props.CompanyName])} (
            {formatter.format((price[props.CompanyName] - last_price[props.CompanyName]) /
              last_price[props.CompanyName])} %)
          </p>
        </div>

        <p className={styles.market_state}>
          MARKET CLOSED <span>(MARKET OPEN JULY 10TH, 8:00 EST)</span>
        </p>

        <table className={styles.price_info_table}>
          <tbody>
            <tr>
              <th>LAST CLOSE</th>
              <th>MARKET CAP</th>
              <th>7D TREND</th>
              <th>1Y TREND</th>
            </tr>
            <tr>
              <td className={styles.normal_color}>US$607.99</td>
              <td className={styles.normal_color}>US$726.4b</td>
              <td className={styles.conditional_color}>+2.3%</td>
              <td className={styles.conditional_color}>+19.0%</td>
            </tr>
          </tbody>
        </table>

        {/* <p className={styles.stock_price}>{stock_price}</p>
        <p className={styles.price_change}>{stock_change}%</p> */}
      </div>
    </div>
  );
};

export default CompHeader;

import { useState, useEffect } from "react";
import styles from "../../../styles/simulator/company.module.css";
import { useSelector, useDispatch } from "react-redux";
import { requestPrice } from "../../../features/newPrice.js";

const CompHeader = (props) => {
  const change = 1;
  const dispatch = useDispatch();
  const WAIT_TIME = 10000;
  let price_data = useSelector((state) => state.price.value);
  console.log(price_data)

  const [isPrice, setIsPrice] = useState(false);
  const loadingPrice = "N/A";
  useEffect(() => {
    const data = setInterval(() => {
      dispatch(requestPrice());
      setIsPrice(true);
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [dispatch]);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className={styles.top_container}>
      <div className={styles.header_container}>
        <div className={styles.center}>
          <div className={styles.container_mid}>
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
                {isPrice
                  ? price_data[props.CompanyName]["price"]
                  : loadingPrice}
                <span>ASD</span>
              </p>
              <p
                className={styles.price_change}
                style={
                  isPrice
                    ? price_data[props.CompanyName]["change"] > 0
                      ? { color: "#C9FFD1" }
                      : { color: "#FD6565" }
                    : change > 0
                    ? { color: "#C9FFD1" }
                    : { color: "#FD6565" }
                }
              >
                {isPrice
                  ? formatter.format(price_data[props.CompanyName]["change"])
                  : "N/A"}{" "}
                (
                {isPrice
                  ? formatter.format(
                      price_data[props.CompanyName]["pct_change"]
                    )
                  : "N/A"}{" "}
                %)
              </p>
            </div>

            <p className={styles.market_state}>
              {(price_data[props.CompanyName]["pct_change"] != "Market Closed") ? "Market OPEN" : "MARKET CLOSED"}
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
                  <td className={styles.normal_color}>ASD N/A</td>
                  <td className={styles.normal_color}>ASD N/A</td>
                  <td className={styles.conditional_color}>ASD N/A</td>
                  <td className={styles.conditional_color}>ASD N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompHeader;

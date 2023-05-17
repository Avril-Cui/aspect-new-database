import React from "react";
import styles from "../../styles/portfolio.module.css";

function ShowPortfolio(props) {
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  let total_change = 0;

  if (props.portfolio.accountValue != undefined) {
    total_change = round(((props.portfolio.accountValue - 100000) / 100000) * 100);
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
      {props.loading ? (
        <div>
          {" "}
          <p className={styles.title}>Account Value</p>
          <div
            className={styles.account_value}
            style={{ marginBottom: "0.2em" }}
          >
            $ {props.portfolio.accountValue}
          </div>
          <div className={styles.inline} style={{ marginTop: "0.25em" }}>
            <div>
              <p className={styles.title}>Net Holding</p>
              <div className={styles.price_change}>
                {round(props.portfolio.holdingValue)}
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
                {round(props.portfolio.cashValue)}
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
            $ {props.loadingState.accountValue}
          </div>
          <div className={styles.inline} style={{ marginTop: "0.25em" }}>
            <div>
              <p className={styles.title}>Net Holding</p>
              <div className={styles.price_change}>
                {props.loadingState.holdingValue}
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
                {round(props.loadingState.cashValue)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ShowPortfolio;

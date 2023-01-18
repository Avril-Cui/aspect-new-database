import React from "react";
// import graph from "../../../../image/stats/cashflow.png";
// import Image from "next/image";
import styles from "../stats.module.css";
import { useState } from "react";
import Balance from "./bs";
import Dividend from "./dividend";

function CashFlow(props: any) {
  const [chart, setChart] = useState("cashflow");
  return (
    <div>
      {chart === "balance" && (
        <div>
          <Balance />
        </div>
      )}
      {chart === "cashflow" && (
        <div>
          {" "}
          <table className={styles.info_table}>
            <tr>
              <th>Last Updated Data</th>
              <th>Next Update</th>
            </tr>
            <tr>
              <td className={styles.normal_color}>Jul 15, 2022</td>
              <td className={styles.normal_color}>TBD</td>
            </tr>
          </table>
          <div className={styles.graph}>
            <img
              src={`/stats/${props.company_name}/cashflow.png`}
              alt=""
              width="410px"
              height="280px"
            />
            {/* <Image src={graph} width="410px" height="280px" alt=""/> */}
          </div>
          <div className={styles.valuation_text}>
            <p style={{ marginBottom: "0.5em" }}>
              <span className={styles.symbol_g}>✓</span>{" "}
              <span className={styles.ratio_type_g}>Operating:</span> positive
              operating cash flow in the past 3 years.
            </p>
            <p style={{ marginBottom: "0.5em" }}>
              <span className={styles.symbol_g}>✓</span>{" "}
              <span className={styles.ratio_type_g}>Investing:</span> strategic
              M&A activities in the past 3 years.
            </p>
            <p>
              <span className={styles.symbol_r}>✕</span>{" "}
              <span className={styles.ratio_type_r}>Financing:</span> high level
              of debt-related financing activities.
            </p>
          </div>
          <div style={{ marginTop: "-19.5em" }}>
            <table className={styles.stats_data_table}>
              <tr>
                <td className={styles.data_type}>Operating Cash Flow</td>
                <td className={styles.data}>45.1 B</td>
              </tr>
              <tr>
                <td className={styles.data_type}>Investing</td>
                <td className={styles.data}>-16.5 B</td>
              </tr>
              <tr>
                <td className={styles.data_type}>Financing</td>
                <td className={styles.data}>-12.9 B</td>
              </tr>
            </table>
          </div>
          <div className={styles.switch} style={{ marginTop: "7em" }}>
            <button
              onClick={() => setChart("balance")}
              className={styles.switch_prev_page}
            >
              &#8612; Previous
            </button>
            <button
              onClick={() => setChart("dividend")}
              className={styles.switch_page}
            >
              Next &#8614;
            </button>
          </div>
        </div>
      )}
      {chart === "dividend" && (
        <div>
          <Dividend />
        </div>
      )}
    </div>
  );
}

export default CashFlow;

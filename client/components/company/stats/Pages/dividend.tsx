import React from "react";
// import graph from "../../../../image/stats/dividend.png";
// import Image from "next/image";
import styles from "../stats.module.css";
import { useState } from "react";
import CashFlow from "./cs";

function Dividend(props: any) {
  const [chart, setChart] = useState("dividend");
  return (
    <div>
      {chart === "cashflow" && (
        <div>
          <CashFlow />
        </div>
      )}
      {chart === "dividend" && (
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
              src={`/stats/${props.company_name}/dividend.png`}
              alt=""
              width="410px"
              height="280px"
            />
            {/* <Image src={graph} width="410px" height="280px" alt="" /> */}
          </div>
          <div className={styles.valuation_text}>
            <p style={{ marginBottom: "0.5em" }}>
              <span className={styles.symbol_g}>✓</span>{" "}
              <span className={styles.ratio_type_g}>Market:</span>{" "}
              Above-market-average dividend rate.
            </p>
            <p style={{ marginBottom: "0.5em" }}>
              <span className={styles.symbol_g}>✓</span>{" "}
              <span className={styles.ratio_type_g}>Industry:</span>{" "}
              Above-industry-average dividend rate.
            </p>
          </div>
          <div style={{ marginTop: "-18.5em" }}>
            <table className={styles.stats_data_table}>
              <tr>
                <td className={styles.data_type}>Company Dividend</td>
                <td className={styles.data}>3.0%</td>
              </tr>
              <tr>
                <td className={styles.data_type}>Industry Average</td>
                <td className={styles.data}>1.7%</td>
              </tr>
              <tr>
                <td className={styles.data_type}>Market Average</td>
                <td className={styles.data}>2.5%</td>
              </tr>
            </table>
          </div>
          <div className={styles.switch} style={{ marginTop: "7em" }}>
            <button
              onClick={() => setChart("cashflow")}
              className={styles.switch_prev_page}
            >
              &#8612; Previous
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dividend;

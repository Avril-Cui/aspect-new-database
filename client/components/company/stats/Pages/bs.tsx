import React from "react";
// import graph from "../../../../image/stats/balance.png";
// import Image from "next/image";
import styles from "../stats.module.css";
import { useState } from "react";
import Income from "./is";
import CashFlow from "./cs";

function Balance(props:any) {
  const [chart, setChart] = useState("balance");
  return (
    <div>
      {chart === "income" && (
        <div>
          <Income />
        </div>
      )}
      {chart === "balance" && (
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
          <div className={styles.graph} style={{ marginTop: "-3em" }}>
            <img
              src={`/stats/${props.company_name}/balance.png`}
              alt=""
              width="400px"
              height="320px"
            />
            {/* <Image src={graph} width="400px" height="320px" alt="" /> */}
          </div>
          <div className={styles.valuation_text}>
            <p style={{ marginBottom: "0.5em" }}>
              <span className={styles.symbol_r}>✕</span>{" "}
              <span className={styles.ratio_type_r}>Liquidity: </span> low
              liquity, high proportion of debt.
            </p>
            <p style={{ marginBottom: "0.5em" }}>
              <span className={styles.symbol_r}>✕</span>{" "}
              <span className={styles.ratio_type_r}>
                Short Term Liabilities{" "}
              </span>{" "}
              high short term liabilities.
            </p>
            <p style={{ marginBottom: "0.5em" }}>
              <span className={styles.symbol_r}>✕</span>{" "}
              <span className={styles.ratio_type_r}>Debt Coverage:</span> high
              debt coverage.
            </p>
          </div>
          <div style={{ marginTop: "-22em" }}>
            <table className={styles.stats_data_table}>
              <tr>
                <td className={styles.data_type}>Total Assets</td>
                <td className={styles.data}>28.9 B</td>
              </tr>
              <tr>
                <td className={styles.data_type_bs}>Current Assets</td>
                <td className={styles.data_bs}>20.7 B</td>
              </tr>
              <tr>
                <td
                  className={styles.data_type_bs}
                  style={{ paddingBottom: "1em" }}
                >
                  Non-Current Assets
                </td>
                <td className={styles.data_bs} style={{ paddingBottom: "1em" }}>
                  8.2 B
                </td>
              </tr>
              <tr>
                <td className={styles.data_type_m}>Total Liabilities</td>
                <td className={styles.data_m}>15.1 B</td>
              </tr>
              <tr>
                <td className={styles.data_type_bs}>Current Liabilities</td>
                <td className={styles.data_bs}>13.6 B</td>
              </tr>
              <tr>
                <td
                  className={styles.data_type_bs}
                  style={{ paddingBottom: "1em" }}
                >
                  Non-Current Liabilities
                </td>
                <td className={styles.data_bs} style={{ paddingBottom: "1em" }}>
                  1.5 B
                </td>
              </tr>
              <tr>
                <td className={styles.data_type_e}>Total Equity</td>
                <td className={styles.data_e}>1.5 B</td>
              </tr>
            </table>
          </div>
          <div className={styles.switch} style={{ marginTop: "0em" }}>
            <button
              onClick={() => setChart("income")}
              className={styles.switch_prev_page}
            >
              &#8612; Previous
            </button>
            <button
              onClick={() => setChart("cashflow")}
              className={styles.switch_page}
            >
              Next &#8614;
            </button>
          </div>
        </div>
      )}
      {chart === "cashflow" && (
        <div>
          <CashFlow />
        </div>
      )}
    </div>
  );
}

export default Balance;

import React from "react";
import graph from "../../../../image/stats/income.png";
import Image from "next/image";
import styles from "../stats.module.css";
import { useState } from "react";
import Valuation from "./valuation";
import Balance from "./bs";

function Income() {
  const [chart, setChart] = useState("income");
  return (
    <div>
      {chart === "valuation" && (
        <div>
          <Valuation />
        </div>
      )}
      {chart === "income" && (
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
            <Image src={graph} width="410px" height="280px" alt=""/>
          </div>
          <div className={styles.valuation_text}>
            <p style={{ marginBottom: "0.5em" }}>
              <span className={styles.symbol_g}>✓</span>{" "}
              <span className={styles.ratio_type_g}>Revenue:</span> positive
              growth trend over the past 3 years.
            </p>
            <p style={{ marginBottom: "0.5em" }}>
              <span className={styles.symbol_g}>✓</span>{" "}
              <span className={styles.ratio_type_g}>Gross Profit:</span>{" "}
              positive growth trend over the past 3 years.
            </p>
            <p>
              <span className={styles.symbol_r}>✕</span>{" "}
              <span className={styles.ratio_type_r}>Net Profit:</span> unstable
              trend; negative over the past 2 years.
            </p>
          </div>
          <div style={{ marginTop: "-20em" }}>
            <table className={styles.stats_data_table}>
              <tr>
                <td className={styles.data_type}>Revenue</td>
                <td className={styles.data}>25.2 B</td>
              </tr>
              <tr>
                <td className={styles.data_type}>COGS</td>
                <td className={styles.data}>5.7 B</td>
              </tr>
              <tr>
                <td className={styles.data_type}>Gross Profit</td>
                <td className={styles.data}>19.5 B</td>
              </tr>
              <tr>
                <td className={styles.data_type}>SG&A</td>
                <td className={styles.data}>19.2 B</td>
              </tr>
              <tr>
                <td className={styles.data_type_l}>Tax</td>
                <td className={styles.data_l}>327.8 M</td>
              </tr>
            </table>
          </div>
          <div className={styles.switch} style={{ marginTop: "2.2em" }}>
            <button
              onClick={() => setChart("valuation")}
              className={styles.switch_prev_page}
            >
              &#8612; Previous
            </button>
            <button
              onClick={() => setChart("balance")}
              className={styles.switch_page}
            >
              Next &#8614;
            </button>
          </div>
        </div>
      )}
      {chart === "balance" && (
        <div>
          <Balance />
        </div>
      )}
    </div>
  );
}

export default Income;

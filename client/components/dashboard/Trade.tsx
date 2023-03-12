import React from "react";
import styles from "./Trade.module.css";
import { useState } from "react";

function Trade() {
  const [type, setType] = useState("Buy");
  return (
    <form>
      <div>
        <div className={styles.types}>
          <div
            className={type == "Buy" ? styles.active_type : styles.type}
            onClick={() => setType("Buy")}
          >
            Buy
          </div>
          <div
            className={type == "Sell" ? styles.active_type : styles.type}
            onClick={() => setType("Sell")}
          >
            Sell
          </div>
        </div>
      </div>

      <div>
        <div className={styles.layer}>
          <div className={styles.company_name}>
            <p className={styles.header}>Company</p>

            <select style={{ width: 300 }}>
              <option value="" disabled selected>
                Select stock ticker.
              </option>
              <option value="AST">Astral Company Limited (AST)</option>
              <option value="DSC">Doshacom (DSC)</option>
              <option value="FSIN">FlashIn, Inc. (FSIN)</option>
              <option value="HHW">Hahawa & Co. (HHW)</option>
              <option value="JKY">Jileky Investment, Inc. (JKY)</option>
              <option value="SGO">Surgo Corporation (SGO)</option>
              <option value="WRKN">Wakron, Inc. (WRKN)</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <div className={styles.layer}>
          <div>
            <div className={styles.price_place}>
              <div>
                <p className={styles.header}>Target Price</p>
                <input
                  type="number"
                  step="any"
                  name="price"
                  placeholder="Price"
                  style={{ marginLeft: "0.2em" }}
                />
              </div>
              <p className={styles.asd}>ASD</p>
            </div>
          </div>
          <button className={styles.trade_current}>
            <p>Current</p>
          </button>
        </div>
      </div>

      <div>
        <div className={styles.layer}>
          <div className={styles.trade_place}>
            <div>
              <p className={styles.header}>Shares</p>
              <input
                type="number"
                step="any"
                name="price"
                placeholder="0.00"
                style={{ marginLeft: "0.2em" }}
              />
            </div>
            <p className={styles.asd1}>ASD</p>
          </div>

          <div className={styles.total}>
            <div>
              <p className={styles.header}>Total</p>
              <div className={styles.inline}>
                <p>=</p>
                <input
                  type="number"
                  step="any"
                  name="price"
                  placeholder="0.00"
                  style={{ marginLeft: "0.5em" }}
                />
              </div>
            </div>
            <p className={styles.asd1} style={{ marginLeft: "-3.75em" }}>
              ASD
            </p>
          </div>
        </div>
      </div>

      <div className={styles.pct_invest_container}>
        <div className={styles.inline}>
          <p className={styles.pct}>50%</p>
          <input className={styles.pct_slider} type="range" min="1" max="100" />
        </div>
      </div>

      <div>
        <button className={styles.enter_trade}>Enter {type} Trade</button>
      </div>
    </form>
  );
}

export default Trade;

// <div>
// <div>
//   <div className={styles.container}>
//     <div>
//       <p className={styles.header}>Order Type</p>
//       <div className={styles.type}>BUY</div>
//     </div>
//     <div className={styles.option}>
//       <p className={styles.header}>Company</p>
//   <select className={styles.trade_place}>
//     <option value="" disabled selected>
//       Enter stock ticker.
//     </option>
//     <option value="AST">AST</option>
//     <option value="DSC">DSC</option>
//     <option value="FSIN">FSIN</option>
//     <option value="HHW">HHW</option>
//     <option value="JKY">JKY</option>
//     <option value="SGO">SGO</option>
//     <option value="WRKN">WRKN</option>
//   </select>
//     </div>
//   </div>
// </div>

// <div className={styles.second_layer}>
//   <div className={styles.container}>
// <div className={styles.option}>
//   <p className={styles.header}>Target Price</p>
//   <input
//     type="number"
//     step="any"
//     name="price"
//     placeholder="Price"
//     className={styles.price_place}
//   />
//   <button className={styles.trade_current}>
//     <p>Current</p>
//   </button>
// </div>
// <div style={{ marginLeft: "2em" }}>
//   <p className={styles.header}>Shares</p>
//   <input
//     type="number"
//     step="any"
//     name="price"
//     placeholder="Enter trading shares."
//     className={styles.trade_place}
//   />
// </div>
//   </div>
// </div>

// <div className={styles.third_layer}>
//   <div className={styles.option}>
//     <p className={styles.header}>Order Value</p>
//     <div className={styles.inline}>
//       <div
//         className={styles.total_price}
//         style={{ paddingTop: "0.25em" }}
//       >
//         <div className={styles.inline}>
//           <p>110,000</p>
//         </div>
//       </div>
//   <button className={styles.enter_trade}>
//       Enter BUY Trade
//   </button>
//     </div>
//   </div>
// </div>
// </div>

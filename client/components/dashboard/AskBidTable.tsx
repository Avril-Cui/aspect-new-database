import React from "react";
import styles from "./AskBidTable.module.css";

function AskBidTable() {
  return (
    <div className={styles.table} id="ask_bid">
      <div>
        <table className={styles.order_table}>
          <tbody>
            <tr>
              <th className={styles.buy_price_header}>Price</th>
              <th className={styles.quantity}>Quantity</th>
            </tr>
            <tr>
              <div className={styles.buy_quantity_bg} style={{ width: "200%" }}>
                <td className={styles.buy_price}>105.00</td>
              </div>
              <td className={styles.quantity}>30.00</td>
            </tr>
            <tr>
              <div className={styles.buy_quantity_bg} style={{ width: "160%" }}>
                <td className={styles.buy_price}>104.00</td>
              </div>
              <td className={styles.quantity}>50.00</td>
            </tr>
            <tr>
              <div className={styles.buy_quantity_bg} style={{ width: "60%" }}>
                <td className={styles.buy_price}>103.00</td>
              </div>
              <td className={styles.quantity}>100.00</td>
            </tr>
            <tr>
              <div className={styles.buy_quantity_bg} style={{ width: "100%" }}>
                <td className={styles.buy_price}>102.00</td>
              </div>
              <td className={styles.quantity}>200.00</td>
            </tr>
            <tr>
              <div className={styles.buy_quantity_bg} style={{ width: "20%" }}>
                <td className={styles.buy_price}>101.00</td>
              </div>
              <td className={styles.quantity}>300.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <table className={styles.order_table} style={{ marginTop: "1em" }}>
          <tbody>
            <tr>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <div className={styles.sell_quantity_bg} style={{ width: "100%" }}>
                <td className={styles.sell_price}>99.00</td>
              </div>
              <td className={styles.quantity}>30.00</td>
            </tr>
            <tr>
              <div className={styles.sell_quantity_bg} style={{ width: "60%" }}>
                <td className={styles.sell_price}>98.00</td>
              </div>
              <td className={styles.quantity}>50.00</td>
            </tr>
            <tr>
              <div className={styles.sell_quantity_bg} style={{ width: "150%" }}>
                <td className={styles.sell_price}>97.00</td>
              </div>
              <td className={styles.quantity}>100.00</td>
            </tr>
            <tr>
              <div className={styles.sell_quantity_bg} style={{ width: "20%" }}>
                <td className={styles.sell_price}>96.00</td>
              </div>
              <td className={styles.quantity}>200.00</td>
            </tr>
            <tr>
              <div className={styles.sell_quantity_bg} style={{ width: "7w0%" }}>
                <td className={styles.sell_price}>95.00</td>
              </div>
              <td className={styles.quantity}>300.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AskBidTable;

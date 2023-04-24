import { useState, useEffect } from "react";
import styles from "./AskBidTable.module.css";

function AskBidTable(props) {
  const [orderBook, setOrderBook] = useState([
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
  ]);
  console.log(orderBook)

  const WAIT_TIME = 1000;

  useEffect(() => {
    const data = setInterval(() => {
      var axios = require("axios");
      var data = `"${props.comp_name}"`;

      var config = {
        method: "post",
        url: "http://127.0.0.1:5000/get-order-book",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setOrderBook(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [props.comp_name]);

  return (
    <div className={styles.table} id="ask_bid">
      <div>
        <table className={styles.order_table}>
          <tbody>
            <tr>
              <th className={styles.buy_price_header}>Price</th>
              <th className={styles.quantity}>Quantity</th>
            </tr>

            {orderBook[0].map((order) => {
              return (
                <tr>
                  <div
                    className={styles.sell_quantity_bg}
                    style={{ width: `${order[2] * 4}%`, maxWidth: `200%` }}
                  >
                    <td className={styles.sell_price}>{order[0]}</td>
                  </div>
                  <td className={styles.quantity}>{order[1]}</td>
                </tr>
              );
            })}
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

            {orderBook[1].map((order) => {
              return (
                <tr>
                  <div
                    className={styles.buy_quantity_bg}
                    style={{ width: `${order[2] * 4}%`, maxWidth: `200%` }}
                  >
                    <td className={styles.buy_price}>{order[0]}</td>
                  </div>
                  <td className={styles.quantity}>{order[1]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AskBidTable;

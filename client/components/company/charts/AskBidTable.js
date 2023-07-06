import { useState, useEffect } from "react";
import styles from "./AskBidTable.module.css";
import Cookies from "universal-cookie";

function AskBidTable(props) {
  const cookies = new Cookies();
  const user_uid = cookies.get("user_uid");
  const [shares, setShares] = useState({});
  const [orderBook, setOrderBook] = useState([
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  ]);

  const WAIT_TIME = 3000;

  const [isShares, setIsShares] = useState(true);
  const [isNotEmpty, setIsNotEmpty] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const data = setInterval(() => {
      var axios = require("axios");
      var data = `"${props.comp_name}"`;

      var config = {
        method: "post",
        url: `${process.env.serverConnection}/get-order-book`,
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

  const handleAcceptOrder = (input, e, index) => {
    e.preventDefault();
    console.log(input);
    if (
      shares[index] == "" ||
      Object.keys(shares).length == 0 ||
      shares[index] == undefined ||
      shares[index] == 0
    ) {
      setIsNotEmpty(false);
    } else if (
      parseFloat(input["available_shares"]) < parseFloat(shares[index])
    ) {
      setIsShares(false);
    } else {
      var axios = require("axios");
      var data = JSON.stringify(input);
      var config = {
        method: "POST",
        url: `${process.env.serverConnection}/user-accept-order`,
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log("Order accepted!");
          setIsSuccess(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleShareChanges = (event, index) => {
    let new_share = {};
    new_share[index] = event.target.value;
    setShares((shares) => ({
      ...shares,
      ...new_share,
    }));
  };

  return (
    <div className={styles.table} id="ask_bid">
      <div>
        <table className={styles.order_table}>
          <tbody>
            <tr>
              <th className={styles.buy_price_header}>Price</th>
              <th className={styles.quantity}>Quantity</th>
              <th>Trade Order</th>
            </tr>

            {orderBook[0].map((order, index) => {
              return (
                <tr key={index}>
                  <div
                    className={styles.sell_quantity_bg}
                    style={{ width: `${order[2] * 4}%`, maxWidth: `330%` }}
                  >
                    <td className={styles.sell_price}>{order[0]}</td>
                  </div>
                  <td className={styles.quantity}>{order[1]}</td>
                  <div className={styles.inline}>
                    <input
                      type="number"
                      step="any"
                      name="shares"
                      id={order}
                      placeholder="Shares"
                      className={styles.input_field}
                      value={shares[index]}
                      onChange={(e) => handleShareChanges(e, index)}
                    />
                    <button
                      type="submit"
                      className={styles.accept}
                      onClick={(e) =>
                        handleAcceptOrder(
                          {
                            price: order[0],
                            shares_number: shares[index],
                            available_shares: order[1],
                            action: "sell",
                            company: props.comp_name,
                            user_uid: user_uid,
                          },
                          e,
                          index
                        )
                      }
                    >
                      <p>✅</p>
                    </button>
                  </div>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div>
        <table className={styles.order_table}>
          <tbody>
            <tr>
              <th></th>
              <th></th>
            </tr>

            {orderBook[1].map((order, index) => {
              return (
                <tr key={index}>
                  <div
                    className={styles.buy_quantity_bg}
                    style={{ width: `${order[2] * 4}%`, maxWidth: `200%` }}
                  >
                    <td className={styles.buy_price}>{order[0]}</td>
                  </div>
                  <td className={styles.quantity}>{order[1]}</td>
                  <div className={styles.inline}>
                    <input
                      type="number"
                      step="any"
                      name="shares"
                      placeholder="Shares"
                      className={styles.input_field}
                    />
                    <button className={styles.accept}>
                      <p>✅</p>
                    </button>
                  </div>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isNotEmpty ? null : (
        <div className={styles.empty_warning}>
          You need to enter a share value to trade.
          <button
            className={styles.close_btn}
            onClick={() => setIsNotEmpty(true)}
          >
            OK
          </button>
        </div>
      )}
      {isShares ? null : (
        <div className={styles.empty_warning}>
          No enough shares, adjust share number.
          <button
            className={styles.close_btn}
            onClick={() => setIsShares(true)}
          >
            OK
          </button>
        </div>
      )}
      {isSuccess ? (
        <div className={styles.empty_warning}>
          Accepting order successfully!
          <button
            className={styles.close_btn}
            onClick={() => setIsSuccess(false)}
          >
            OK
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default AskBidTable;

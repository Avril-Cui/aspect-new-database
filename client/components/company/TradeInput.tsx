import React from "react";
import styles from "../../styles/simulator/company.module.css";
import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function TradeInput(props: any) {
  const cookies = new Cookies();
  const user_uid = cookies.get("user_uid");
  const [buyShares, setBuyShares] = useState(undefined);
  const [buyPrice, setBuyPrice] = useState(undefined);

  const [sellShares, setSellShares] = useState(undefined);
  const [sellPrice, setSellPrice] = useState(undefined);

  const [isCurrentBuy, setIsCurrentBuy] = useState(false);
  const [isCurrentSell, setIsCurrentSell] = useState(false);
  const handleBuySharesChange = (event: any) => {
    setBuyShares(event.target.value);
  };
  const handleBuyPriceChange = (event: any) => {
    setBuyPrice(event.target.value);
  };

  const handleSellSharesChange = (event: any) => {
    setSellShares(event.target.value);
  };
  const handleSellPriceChange = (event: any) => {
    setSellPrice(event.target.value);
  };

  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const setDefaultBuyPriceHandler = (e: { preventDefault: () => void }) => {
    setIsCurrentBuy(true);
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.serverConnection}/current-price`,
      headers: {
        "Content-Type": "text/plain",
      },
      data: JSON.stringify(props.comp_name),
    })
      .then((response) => {
        const res = response.data;
        const price = res.price;
        setBuyPrice(price);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setDefaultSellPriceHandler = (e: { preventDefault: () => void }) => {
    setIsCurrentSell(true);
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.serverConnection}/current-price`,
      headers: {
        "Content-Type": "text/plain",
      },
      data: JSON.stringify(props.comp_name),
    })
      .then((response) => {
        const res = response.data;
        const price = res.price;
        setSellPrice(price);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(
      user_uid,
      buyShares,
      buyPrice,
      props.comp_name,
      sellShares,
      sellPrice,
      props.comp_name
    );
    setIsSubmit(true);
    if (buyShares !== undefined && buyPrice !== undefined) {
      let buy_shares = parseFloat(buyShares);
      let buy_price;
      if (isCurrentBuy == true) {
        buy_price = 0;
      } else {
        buy_price = parseFloat(buyPrice);
      }
      var buy_data = JSON.stringify({
        user_uid: user_uid,
        comp_name: props.comp_name,
        share_number: buy_shares,
        target_price: buy_price,
      });
      var buy_config = {
        method: "post",
        url: `${process.env.serverConnection}/trade-stock`,
        headers: {
          "Content-Type": "text/plain",
        },
        data: buy_data,
      };

      axios(buy_config)
        .then(function (response) {
          setMessage("Trade entered successfully!");
        })
        .catch(function (error) {
          console.log(error.message);
          if (error.message == "Request failed with status code 403") {
            setMessage(
              "Currently no shares available for trade. \n Your transaction will enter the pending state."
            );
          } else if (error.message == "Request failed with status code 402") {
            setMessage("You do not have enough money for this trade.");
          } else if (error.essage == "Request failed with status code 401") {
            setMessage("You do not owe enough shares of this stock.");
          }
        });
    }

    if (sellShares !== undefined && sellPrice !== undefined) {
      let sell_shares = -parseFloat(sellShares);
      let sell_price;
      if (isCurrentSell == true) {
        sell_price = 0;
      } else {
        sell_price = parseFloat(sellPrice);
      }

      var sell_data = JSON.stringify({
        user_uid: user_uid,
        comp_name: props.comp_name,
        share_number: sell_shares,
        target_price: sell_price,
      });
      var sell_config = {
        method: "post",
        url: `${process.env.serverConnection}/trade-stock`,
        headers: {
          "Content-Type": "text/plain",
        },
        data: sell_data,
      };

      axios(sell_config)
        .then(function (response) {
          setMessage("Trade entered successfully!");
        })
        .catch(function (error) {
          console.log(error.message);
          if (error.message == "Request failed with status code 403") {
            setMessage(
              "Currently no shares available for trade. \n Your transaction will enter the pending state."
            );
          } else if (error.message == "Request failed with status code 402") {
            setMessage("You do not have enough money for this trade.");
          } else if (error.essage == "Request failed with status code 401") {
            setMessage("You do not owe enough shares of this stock.");
          }
        });
    }

    setBuyShares(undefined);
    setBuyPrice(undefined);
    setSellShares(undefined);
    setSellPrice(undefined);
  };
  return (
    <div>
      {" "}
      <div className={styles.trade_container}>
        <p className={styles.title_text}>Trade Stock</p>
        <form className={styles.trade_stock_content} onSubmit={handleSubmit}>
          <div>
            <div className={styles.trade_type}>Buy</div>
            <div className={styles.trade_input}>
              <p className={styles.trade_text}>Share</p>
              <input
                className={styles.trade_place}
                type="number"
                step="any"
                name="price"
                placeholder="Enter your trading shares."
                onChange={handleBuySharesChange}
                value={buyShares}
                style={{ marginLeft: 70 }}
              />
            </div>
            <div className={styles.trade_input}>
              <p className={styles.trade_text}>Price</p>
              <input
                className={styles.trade_place1}
                type="number"
                step="any"
                name="price"
                placeholder="Price"
                onChange={handleBuyPriceChange}
                value={buyPrice}
                style={{ marginLeft: 75 }}
              />
              <button
                className={styles.trade_current}
                onClick={setDefaultBuyPriceHandler}
              >
                <p>Current</p>
              </button>
            </div>
          </div>

          <div>
            <div className={styles.trade_type}>SELL</div>
            <div className={styles.trade_input}>
              <p className={styles.trade_text}>Share</p>
              <input
                className={styles.trade_place}
                style={{ marginLeft: 70 }}
                type="number"
                step="any"
                name="price"
                placeholder="Enter your trading shares."
                onChange={handleSellSharesChange}
                value={sellShares}
              />
            </div>
            <div className={styles.trade_input}>
              <p className={styles.trade_text}>Price</p>
              <input
                type="number"
                step="any"
                name="price"
                placeholder="Price"
                onChange={handleSellPriceChange}
                value={sellPrice}
                className={styles.trade_place1}
                style={{ marginLeft: 75 }}
              />
              <button
                className={styles.trade_current}
                onClick={setDefaultSellPriceHandler}
              >
                <p>Current</p>
              </button>
            </div>
          </div>
          {isSubmit && <p className={styles.success}>{message}</p>}

          <button
            className={styles.trade_stock_button}
            type="submit"
          >
            <p>Enter Trade</p>
          </button>

        </form>
      </div>
    </div>
  );
}

export default TradeInput;

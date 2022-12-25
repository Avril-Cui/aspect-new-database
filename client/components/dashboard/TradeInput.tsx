import { useState } from "react";
import styles from "../../styles/portfolio.module.css";
import axios from "axios";
import Cookies from "universal-cookie";

function TradeInput(props: any) {
  const cookies = new Cookies();
  const user_uid = cookies.get("user_uid");
  const [buyShares, setBuyShares] = useState(undefined);
  const [buyPrice, setBuyPrice] = useState(undefined);
  const [buyTicker, setBuyTicker] = useState(undefined);

  const [sellShares, setSellShares] = useState(undefined);
  const [sellPrice, setSellPrice] = useState(undefined);
  const [sellTicker, setSellTicker] = useState(undefined);
  
  const [isCurrentBuy, setIsCurrentBuy] = useState(false);
  const [isCurrentSell, setIsCurrentSell] = useState(false);

  const handleBuySharesChange = (event: any) => {
    setBuyShares(event.target.value);
  };
  const handleBuyPriceChange = (event: any) => {
    setBuyPrice(event.target.value);
  };
  const handleBuyTickerChange = (event: any) => {
    setBuyTicker(event.target.value);
  };
  const handleSellSharesChange = (event: any) => {
    setSellShares(event.target.value);
  };
  const handleSellPriceChange = (event: any) => {
    setSellPrice(event.target.value);
  };
  const handleSellTickerChange = (event: any) => {
    setSellTicker(event.target.value);
  };

  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const setDefaultBuyPriceHandler = (e: { preventDefault: () => void; }) => {
    setIsCurrentBuy(true)
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/current-price",
      headers: {
        "Content-Type": "text/plain",
      },
      data: JSON.stringify(buyTicker),
    })
      .then((response) => {
        const res = response.data;
        const price = res.price;
        setBuyPrice(price);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const setDefaultSellPriceHandler = (e: { preventDefault: () => void; }) => {
    setIsCurrentSell(true)
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/current-price",
      headers: {
        "Content-Type": "text/plain",
      },
      data: JSON.stringify(sellTicker),
    })
      .then((response) => {
        const res = response.data;
        const price = res.price;
        setSellPrice(price);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleSubmit = (event: any) => {
    event.preventDefault(
      user_uid,
      buyShares,
      buyPrice,
      buyTicker,
      sellShares,
      sellPrice,
      sellTicker
    );
    setIsSubmit(true);
    if (buyShares !== undefined && buyPrice !== undefined && buyTicker !== undefined) {
      let buy_shares = parseFloat(buyShares);
      let buy_price
      if (isCurrentBuy == true) {
        buy_price = 0;
      } else {
        buy_price = parseFloat(buyPrice);
      }
      var buy_data = JSON.stringify({
        user_uid: user_uid,
        comp_name: buyTicker,
        share_number: buy_shares,
        target_price: buy_price,
      });
      var buy_config = {
        method: "post",
        url: "http://127.0.0.1:5000/trade-stock",
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

    if (sellShares !== undefined && sellPrice !== undefined && sellTicker !== undefined) {
      let sell_shares = -parseFloat(sellShares);
      let sell_price
      if (isCurrentSell == true) {
        sell_price = 0;
      } else {
        sell_price = parseFloat(sellPrice);
      }

      var sell_data = JSON.stringify({    
        user_uid: user_uid,
        comp_name: sellTicker,
        share_number: sell_shares,
        target_price: sell_price,
      });
      var sell_config = {
        method: "post",
        url: "http://127.0.0.1:5000/trade-stock",
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
    setBuyTicker(undefined);
    setSellShares(undefined);
    setSellPrice(undefined);
    setSellTicker(undefined);
  };

  return (
    <div className={styles.pop_up_container}>
      <div className={styles.box}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inline}>
            <div style={{ marginRight: "7em" }}>
              <div className={styles.trade_type}>Buy</div>
              <div className={styles.trade_input}>
                <div className={styles.trade_input_container}>
                  <input
                    type="text"
                    placeholder="Enter stock ticker."
                    onChange={handleBuyTickerChange}
                    value={buyTicker}
                    className={styles.trade_place}
                  />
                </div>
                <div className={styles.trade_input_container}>
                  {" "}
                  <input
                    type="number"
                    step="any"
                    name="price"
                    placeholder="Enter your trading shares."
                    onChange={handleBuySharesChange}
                    value={buyShares}
                    className={styles.trade_place}
                  />
                </div>
                <div className={styles.trade_input_container}>
                  {" "}
                  <input
                    type="number"
                    step="any"
                    name="price"
                    placeholder="Enter your trading price."
                    onChange={handleBuyPriceChange}
                    value={buyPrice}
                    className={styles.price_place}
                  />
                  <button className={styles.trade_current} onClick={setDefaultBuyPriceHandler}>
                    <p>Current</p>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className={styles.trade_type}>Sell</div>
              <div className={styles.trade_input}>
                <div className={styles.trade_input_container}>
                  {" "}
                  <input
                    type="text"
                    placeholder="Enter stock ticker."
                    onChange={handleSellTickerChange}
                    value={sellTicker}
                    className={styles.trade_place}
                  />
                </div>
                <div className={styles.trade_input_container}>
                  <input
                    type="number"
                    step="any"
                    name="price"
                    placeholder="Enter your trading shares."
                    onChange={handleSellSharesChange}
                    value={sellShares}
                    className={styles.trade_place}
                  />
                </div>
                <div className={styles.trade_input_container}>
                  {" "}
                  <input
                    type="number"
                    step="any"
                    name="price"
                    placeholder="Enter your trading price."
                    onChange={handleSellPriceChange}
                    value={sellPrice}
                    className={styles.price_place}
                  />
                  <button className={styles.trade_current} onClick={setDefaultSellPriceHandler}>
                    <p>Current</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {isSubmit && <p className={styles.success}>{message}</p>}

          <div style={{ marginTop: "0.5em" }}>
            <button type="submit" className={styles.trade_stock_button}>
              <p>Enter Trade</p>
            </button>
            <button
              className={styles.back}
              onClick={props.toggleClose}
              type="button"
            >
              <p>Back</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TradeInput;

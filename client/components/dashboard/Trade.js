import React from "react";
import styles from "./Trade.module.css";
import { useState } from "react";
import axios from "axios";

function Trade(props) {
  const [type, setType] = useState("Buy");
  const [percentage, setPercentage] = useState(0);

  if (percentage > 100) {
    setPercentage("100+");
  }

  const [buyShares, setBuyShares] = useState(undefined);
  const [Price, setPrice] = useState(undefined);
  const [sellShares, setSellShares] = useState(undefined);
  const [isCurrentPrice, setIsCurrentPrice] = useState(false);
  const [totalOrderValue, setTotalOrderValue] = useState(0);

  const handleBuySharesChange = (event) => {
    setBuyShares(event.target.value);
    event.preventDefault(props.user_uid);
    if (Price != undefined) {
      setTotalOrderValue(Math.round(Price * event.target.value * 100) / 100);
      var config = {
        method: "post",
        url: `${process.env.serverConnection}/portfolio-detail`,
        headers: {
          "Content-Type": "text/plain",
        },
        data: JSON.stringify(props.user_uid),
      };

      axios(config)
        .then(function (response) {
          setPercentage(
            Math.round(
              ((Price * event.target.value) /
                response.data.portfolio_value.accountValue) *
                100
            )
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
    setIsCurrentPrice(false);
  };
  const handleSellSharesChange = (event) => {
    event.preventDefault(props.user_uid);
    setSellShares(event.target.value);
    if (Price != undefined) {
      setTotalOrderValue(
        Math.round(Price * Math.abs(event.target.value) * 100) / 100
      );
      let send_data = JSON.stringify(props.user_uid);
      var config = {
        method: "post",
        url: `${process.env.serverConnection}/portfolio-detail`,
        headers: {
          "Content-Type": "text/plain",
        },
        data: send_data,
      };

      axios(config)
        .then(function (response) {
          setPercentage(
            Math.round(
              ((Price * Math.abs(event.target.value)) /
                response.data.portfolio_value.accountValue) *
                100
            )
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const setDefaultPriceHandler = (e) => {
    setIsCurrentPrice(true);
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.serverConnection}/current-price`,
      headers: {
        "Content-Type": "text/plain",
      },
      data: JSON.stringify(props.ticker),
    })
      .then((response) => {
        const res = response.data;
        const price = res.price;
        setPrice(price);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault(props.user_uid, buyShares, sellShares);
    setIsSubmit(true);
    if (
      buyShares !== undefined &&
      buyShares !== "" &&
      Price !== undefined &&
      Price != "" &&
      props.ticker !== undefined &&
      props.user_uid != undefined
    ) {
      let buy_shares = parseFloat(buyShares);
      let buy_price;
      if (isCurrentPrice == true) {
        buy_price = 0;
      } else {
        buy_price = parseFloat(Price);
      }
      var buy_data = JSON.stringify({
        user_uid: props.user_uid,
        comp_name: props.ticker,
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
          if (response.data == "0") {
            setMessage("Order put, pending...");
          } else {
            setMessage("Trade entered successfully!");
          }
        })
        .catch(function (error) {
          console.log(error.message);
          if (error.message == "Request failed with status code 403") {
            setMessage(
              "Currently no shares available for trade in market. \n Try buying a sell order on the right."
            );
          } else if (error.message == "Request failed with status code 402") {
            setMessage("You do not have enough money for this trade.");
          } else if (error.message == "Request failed with status code 401") {
            setMessage("You do not owe enough shares of this stock.");
          } else if (error.message == "Request failed with status code 404") {
            setMessage(
              "Currently no shares available for trade. \n Your transaction will enter the pending state."
            );
          }
        });
    }

    if (
      sellShares !== undefined &&
      Price !== undefined &&
      Price != "" &&
      sellShares != "" &&
      props.ticker !== undefined &&
      props.user_uid != undefined
    ) {
      let sell_shares = -parseFloat(sellShares);
      let sell_price;
      if (isCurrentPrice == true) {
        sell_price = 0;
      } else {
        sell_price = parseFloat(Price);
      }

      var sell_data = JSON.stringify({
        user_uid: props.user_uid,
        comp_name: props.ticker,
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
          if (response.data == "0") {
            setMessage("Order put, pending...");
          } else {
            setMessage("Trade entered successfully!");
          }
        })
        .catch(function (error) {
          console.log(error.message);
          if (error.message == "Request failed with status code 403") {
            setMessage(
              "Currently no shares available for trade in market.\n Try selling a buy order on the right."
            );
          } else if (error.message == "Request failed with status code 402") {
            setMessage("You do not have enough money for this trade.");
          } else if (error.message == "Request failed with status code 401") {
            setMessage("You do not owe enough shares of this stock.");
          } else if (error.message == "Request failed with status code 404") {
            setMessage(
              "Currently no shares available for trade. \n Your transaction will enter the pending state."
            );
          }
        });
    }

    setBuyShares("");
    setPrice("");
    setTotalOrderValue("");
    setSellShares("");
  };

  return (
    <form onSubmit={handleSubmit}>
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
            <select
              style={{ width: 300 }}
              onChange={props.handleTickerChange}
              id="company-trade-selector"
            >
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
                  value={Price}
                  onChange={handlePriceChange}
                  className={styles.input_field}
                  style={{ marginLeft: "0.2em" }}
                  id="company-trade-price-input"
                />
              </div>
              <p className={styles.asd}>ASD</p>
            </div>
          </div>
          <button
            className={styles.trade_current}
            onClick={setDefaultPriceHandler}
            id="company-trade-equilibrium-price-btn"
          >
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
                onChange={
                  type == "Buy" ? handleBuySharesChange : handleSellSharesChange
                }
                value={type == "Buy" ? buyShares : sellShares}
                name="shares"
                placeholder="0.00"
                className={styles.input_field}
                style={{ marginLeft: "0.2em" }}
                id="company-trade-qty-input"
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
                  name="value"
                  placeholder="0.00"
                  style={{ marginLeft: "0.5em" }}
                  className={styles.input_field}
                  value={totalOrderValue}
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
          <p className={styles.pct}>{percentage}%</p>
          <input
            className={styles.pct_slider}
            type="range"
            value={percentage == "100+" ? 100 : percentage}
            style={percentage == "100+" ? { marginLeft: "0.3em" } : null}
          />
        </div>
      </div>
      {isSubmit && <p className={styles.success}>{message}</p>}

      <div>
        <button className={styles.enter_trade} id="submit-company-trade-order">
          Enter {type} Trade
        </button>
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

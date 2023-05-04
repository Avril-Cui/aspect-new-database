import { useRef } from "react";
import styles from "../../styles/portfolio.module.css";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import Link from "next/link";
import alien from "../../image/logo/alien.png";
import Image from "next/image";

function PendingOrders(props) {
  const cookies = new Cookies();
  const user_uid = cookies.get("user_uid");

  const containerRef = useRef(null);
  const [orders, setOrders] = useState([[undefined, "", undefined, undefined]]);

  const WAIT_TIME = 3000;
  const [isPortfolio, setIsPortfolio] = useState(false);

  useEffect(() => {
    const data = setInterval(() => {
      var axios = require("axios");
      var data = JSON.stringify(user_uid);

      var config = {
        method: "post",
        url: "http://127.0.0.1:5000/get-user-pending-orders",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setOrders(response.data);
          console.log(orders)
          if (orders.length > 1) {
            setIsPortfolio(true);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [orders, user_uid]);
  return (
    <div className={styles.scroll}>
      <div ref={containerRef}>
        <table className={styles.screener_table1}>
          <tbody>
            <tr>
              <th>Ticker</th>
              <th>Price</th>
              <th>Shares</th>
              <th>Total Value</th>
              <th>Action</th>
              <th></th>
            </tr>
          </tbody>
          <tbody className={styles.table_line}>
            {orders.map((order) => {
              return <Company order={order} />;
            })}
          </tbody>
        </table>
        {isPortfolio ? null : (
          <div className={styles.alien_img}>
            {" "}
            <Image src={alien} width="210px" height="150px" alt="" />
            <p className={styles.no_text}>
              You don't have any pending orders! Make a trade below.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Company(props) {
  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return (Math.round(m) / 100) * Math.sign(num);
  }

  const id = props.order[0];
  const category = props.order[1];
  const price = props.order[2];
  const shares_holding = props.order[3];
  const action = props.order[4];
  // const action = props.order[4].toUpperCase();;

  let total_value = shares_holding * price;
  let share_number = shares_holding;

  const handleCancelOrder = () => {
    var axios = require("axios");
    var data = JSON.stringify(id);
    var config = {
      method: "POST",
      url: "http://127.0.0.1:5000/cancel-order",
      headers: {
        "Content-Type": "text/plain",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log("order canceled");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  if (share_number != undefined) {
    return (
      <tr key={id} className={styles.holding_detail1}>
        <Link href={`/company/${category}`}>
          <a>
            <td className={styles.comp_link}>{category.toUpperCase()}</td>
          </a>
        </Link>
        <td>{price}</td>
        <td>{share_number}</td>
        <td>{total_value}</td>
        <td>{action.toUpperCase()}</td>
        <td>
          <button className={styles.cancel} onClick={handleCancelOrder}>
            <p>CANCEL ORDER </p>
          </button>
        </td>
      </tr>
    );
  } else {
    return <tbody key="random"></tbody>;
  }
}
export default PendingOrders;

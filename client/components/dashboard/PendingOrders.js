import { useRef } from "react";
import styles from "../../styles/portfolio.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import alien from "../../image/logo/alien.png";
import Image from "next/image";
import axios from "axios";

function PendingOrders(props) {
  return (
    <div className={styles.scroll}>
      <div>
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
            {props.orders.map((order, index) => {
              return (
                  <Company
                    order={
                      order == null ? [null, null, null, null, null] : order
                    }
                  />

              );
            })}
          </tbody>
        </table>
        {Object.keys(props.orders).length > 0 ? null : (
          <div className={styles.alien_img}>
            {" "}
            <Image src={alien} width="210px" height="150px" alt="" />
            <p className={styles.no_text}>
              You don&apos;t have any pending orders! Make a trade below.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Company(props) {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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
      url: `${process.env.serverConnection}/cancel-order`,
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
        <td>{formatter.format(price)}</td>
        <td>{formatter.format(share_number)}</td>
        <td>{formatter.format(total_value)}</td>
        <td>{action.toUpperCase()}</td>
        <td>
          <button className={styles.cancel} onClick={handleCancelOrder}>
            <p>CANCEL ORDER </p>
          </button>
        </td>
      </tr>
    );
  } else {
    return <tr key="random"></tr>;
  }
}
export default PendingOrders;

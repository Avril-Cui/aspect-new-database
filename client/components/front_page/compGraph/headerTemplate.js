import styles from "../overview_charts.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { requestPrice } from "../../../features/newPrice.js";
import { useState, useEffect } from "react";

function HeaderTemplate(props) {
  const price_data=props.price_data
  const isPrice = props.isPrice
  let comp_name = props.comp_name.toLowerCase();
  let route = "/";
  if (comp_name != "apinx") {
    route = `/company/${comp_name}`;
  } else {
    comp_name = "index";
  }

  const change = 1;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <Link href={route}>
      <button
        className={
          props.category == 1
            ? styles.comp_type_container_shadow
            : styles.comp_type_container
        }
        onClick={() => props.setCompGraph(1)}
      >
        <div className={styles.inline}>
          <div className={styles.comp_type_profile}>
            <p>{props.comp_name.charAt(0)}</p>
          </div>
          <p className={styles.comp_type_name}>{props.comp_name}</p>
        </div>
        <div className={styles.comp_type_prices}>
          <div className={styles.inline}>
            <p className={styles.comp_type_price}>
              {(props.price_data[comp_name]!=undefined) ? props.price_data[comp_name]["price"] : "N/A"}{" "}
              <span>ASD</span>
            </p>
            <p
              className={styles.comp_type_pct_change}
              style={
                (price_data[comp_name]!=undefined)
                  ? price_data[comp_name]["change"] < 0
                    ? { color: "#FD6565" }
                    : { color: "#C9FFD1" }
                  : change < 0
                  ? { color: "#FD6565" }
                  : { color: "#C9FFD1" }
              }
            >
              {(price_data[comp_name]!=undefined)
                ? formatter.format(price_data[comp_name]["pct_change"])
                : "N/A"}
              %
            </p>
          </div>
        </div>
      </button>
    </Link>
  );
}

export default HeaderTemplate;
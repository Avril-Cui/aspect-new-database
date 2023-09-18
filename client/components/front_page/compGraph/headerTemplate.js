import styles from "../overview_charts.module.css";
import Link from "next/link";
import { useState } from "react";

function HeaderTemplate(props) {
  const price_data = props.price_data;
  const isPrice = props.isPrice;
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

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(true);
  };

  const togglePopclose = () => {
    setIsOpen(false);
  };

  try {
    const html = document.querySelector("html");
    if (isOpen == true) {
      html.style.overflow = "hidden";
    } else {
      html.style.overflow = "auto";
    }
  } catch (error) {}

  return (
    // <Link href={route}>
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
        <p className={styles.comp_type_name}>
          {props.comp_name}&#8192;
          <span onClick={togglePopup}>?</span>
        </p>
        {isOpen && (
          <div className={styles.pop_up_container}>
            <div className={styles.box}>
              <div className={styles.inline}>
                <p className={styles.game_intro}>Candlestick Graph</p>
                <button
                  className={styles.close_candlestick}
                  onClick={togglePopclose}
                >
                  X
                </button>
              </div>
              <p
                className={styles.game_intro_text}
                style={{ marginBottom: "-0.1em" }}
              >
                See detail:
                <Link href="/post/candlestick-graph">
                  <a>Candlestick Graph</a>
                </Link>
              </p>
              <p className={styles.game_intro_text}>
                A candlestick graph is a financial chart used to represent the
                price movement of an asset over time, where each
                &ldquo;candlestick&rdquo; represents a period of time (such as a
                day) and displays the opening, closing, highest, and lowest
                prices within that period. Moving average (MA) indicates the
                average value of price over a period of time.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={styles.comp_type_prices}>
        <div className={styles.inline}>
          <p className={styles.comp_type_price}>
            {props.price_data[comp_name] != undefined
              ? props.price_data[comp_name]["price"]
              : "N/A"}{" "}
            <span>ASD</span>
          </p>
          <p
            className={styles.comp_type_pct_change}
            style={
              price_data[comp_name] != undefined
                ? price_data[comp_name]["change"] < 0
                  ? { color: "#FD6565" }
                  : { color: "#C9FFD1" }
                : change < 0
                ? { color: "#FD6565" }
                : { color: "#C9FFD1" }
            }
          >
            {price_data[comp_name] != undefined
              ? formatter.format(price_data[comp_name]["pct_change"])
              : "N/A"}
            %
          </p>
        </div>
      </div>
    </button>
    // </Link>
  );
}

export default HeaderTemplate;

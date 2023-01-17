import React from "react";
import styles from "../../styles/front.module.css";
import { useState, useEffect } from "react";
import ExploreComp1 from "../simulator/ExploreComp1";

function CompInfo(props) {
  const change = 1;
  const WAIT_TIME = 3000;
  const [price_data, setPriceData] = useState({
    "ast": null,
    "dsc": null,
    "fsin": null,
    "hhw": null,
    "jky": null,
    "sgo": null,
    "wrkn": null,
  });

  const [isPrice, setIsPrice] = useState(false);
  const loadingPrice = "N/A";
  useEffect(() => {
    const data = setInterval(() => {
      var axios = require("axios");
      var data = '"wrkn"';

      var config = {
        method: "post",
        url: "http://127.0.0.1:5000/end-all-prices",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setPriceData(response.data);
          setIsPrice(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [isPrice]);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const companies = props.companies;
  return (
    <div>
      <div style={{ marginTop: "3em" }}>
        <p className={styles.header}>Explore Companies</p>
        <ExploreComp1
          company={companies.ast}
          price={isPrice ? price_data["ast"]["price"] : loadingPrice}
          change={
            isPrice ? formatter.format(price_data["ast"]["change"]) : "N/A"
          }
          pct_change={
            isPrice ? formatter.format(price_data["ast"]["pct_change"]) : "N/A"
          }
          background="#c9ffd1"
          color={
            isPrice
              ? price_data["ast"]["change"] > 0
                ? "#C9FFD1"
                : "#FD6565"
              : change > 0
              ? "#C9FFD1"
              : "#FD6565"
          }
          news={props.news}
        />
        <ExploreComp1
          company={companies.dsc}
          price={isPrice ? price_data["dsc"]["price"] : loadingPrice}
          change={
            isPrice ? formatter.format(price_data["dsc"]["change"]) : "N/A"
          }
          pct_change={
            isPrice ? formatter.format(price_data["dsc"]["pct_change"]) : "N/A"
          }
          background="#9bf3ff"
          color={
            isPrice
              ? price_data["dsc"]["change"] > 0
                ? "#C9FFD1"
                : "#FD6565"
              : change > 0
              ? "#C9FFD1"
              : "#FD6565"
          }
          news={props.news}
        />
        <ExploreComp1
          company={companies.fsin}
          price={isPrice ? price_data["fsin"]["price"] : loadingPrice}
          change={
            isPrice ? formatter.format(price_data["fsin"]["change"]) : "N/A"
          }
          pct_change={
            isPrice ? formatter.format(price_data["fsin"]["pct_change"]) : "N/A"
          }
          background="#91a1fb"
          color={
            isPrice
              ? price_data["fsin"]["change"] > 0
                ? "#C9FFD1"
                : "#FD6565"
              : change > 0
              ? "#C9FFD1"
              : "#FD6565"
          }
          news={props.news}
        />
        <ExploreComp1
          company={companies.hhw}
          price={isPrice ? price_data["hhw"]["price"] : loadingPrice}
          change={
            isPrice ? formatter.format(price_data["hhw"]["change"]) : "N/A"
          }
          pct_change={
            isPrice ? formatter.format(price_data["hhw"]["pct_change"]) : "N/A"
          }
          background="#b691fb"
          color={
            isPrice
              ? price_data["hhw"]["change"] > 0
                ? "#C9FFD1"
                : "#FD6565"
              : change > 0
              ? "#C9FFD1"
              : "#FD6565"
          }
          news={props.news}
        />
        <ExploreComp1
          company={companies.jky}
          price={isPrice ? price_data["jky"]["price"] : loadingPrice}
          change={
            isPrice ? formatter.format(price_data["jky"]["change"]) : "N/A"
          }
          pct_change={
            isPrice ? formatter.format(price_data["jky"]["pct_change"]) : "N/A"
          }
          background="#cc78e6"
          color={
            isPrice
              ? price_data["jky"]["change"] > 0
                ? "#C9FFD1"
                : "#FD6565"
              : change > 0
              ? "#C9FFD1"
              : "#FD6565"
          }
          news={props.news}
        />
        <ExploreComp1
          company={companies.sgo}
          price={isPrice ? price_data["sgo"]["price"] : loadingPrice}
          change={
            isPrice ? formatter.format(price_data["sgo"]["change"]) : "N/A"
          }
          pct_change={
            isPrice ? formatter.format(price_data["sgo"]["pct_change"]) : "N/A"
          }
          background="#e67878"
          color={
            isPrice
              ? price_data["sgo"]["change"] > 0
                ? "#C9FFD1"
                : "#FD6565"
              : change > 0
              ? "#C9FFD1"
              : "#FD6565"
          }
          news={props.news}
        />
        <ExploreComp1
          company={companies.wrkn}
          price={isPrice ? price_data["wrkn"]["price"] : loadingPrice}
          change={
            isPrice ? formatter.format(price_data["wrkn"]["change"]) : "N/A"
          }
          pct_change={
            isPrice ? formatter.format(price_data["wrkn"]["pct_change"]) : "N/A"
          }
          background="#e6d278"
          color={
            isPrice
              ? price_data["wrkn"]["change"] > 0
                ? "#C9FFD1"
                : "#FD6565"
              : change > 0
              ? "#C9FFD1"
              : "#FD6565"
          }
          news={props.news}
        />
      </div>
    </div>
  );
}

export default CompInfo;

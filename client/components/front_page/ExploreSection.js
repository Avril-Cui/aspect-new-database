import React from "react";
import styles from "../../styles/front.module.css";
import { useSelector, useDispatch } from "react-redux";
import { requestPrice } from "../../features/newPrice.js";
import { useState, useEffect } from "react";
import ExploreComp from "../simulator/ExploreComp";

function ExploreSection(props) {
  const change = 1;
  const dispatch = useDispatch();
  const WAIT_TIME = 4000;
  let price_data = useSelector((state) => state.price.value);

  const [graphData, setGraphData] = useState({
    ast: [{ time: 0, value: 0 }],
    dsc: [{ time: 0, value: 0 }],
    fsin: [{ time: 0, value: 0 }],
    hhw: [{ time: 0, value: 0 }],
    jky: [{ time: 0, value: 0 }],
    sgo: [{ time: 0, value: 0 }],
    wrkn: [{ time: 0, value: 0 }],
  });

  const [isPrice, setIsPrice] = useState(false);
  const loadingPrice = "N/A";
  useEffect(() => {
    const data = setInterval(() => {
      dispatch(requestPrice());
      setIsPrice(true);

      var axios = require("axios");
      var data = "";

      var config = {
        method: "post",
        url: "http://127.0.0.1:5000/tick-graphs",
        headers: {},
        data: data,
      };

      axios(config)
        .then(function (response) {
          setGraphData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [isPrice, dispatch, graphData]);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const companies = props.companies;
  return (
    <div>
      <div className={styles.layer_one} style={{ marginTop: "3em" }}>
        <p className={styles.header}>Explore Companies</p>
        <ExploreComp
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
          data={graphData["ast"]}
        />
        <ExploreComp
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
          data={graphData["dsc"]}
        />
        <ExploreComp
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
          data={graphData["fsin"]}
        />
        <ExploreComp
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
          data={graphData["hhw"]}
        />
        <ExploreComp
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
          data={graphData["jky"]}
        />
        <ExploreComp
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
          data={graphData["sgo"]}
        />
        <ExploreComp
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
          data={graphData["wrkn"]}
        />
      </div>
    </div>
  );
}

export default ExploreSection;

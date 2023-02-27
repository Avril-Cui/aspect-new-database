import React from "react";
import styles from "../../styles/front.module.css";
import { useState, useEffect } from "react";
import ExploreComp from "../simulator/ExploreComp";

function ExploreSection(props) {
  const change = 1;
  const WAIT_TIME = 4000;

  const [graphData, setGraphData] = useState({
    ast: [{ time: 0, value: 0 }],
    dsc: [{ time: 0, value: 0 }],
    fsin: [{ time: 0, value: 0 }],
    hhw: [{ time: 0, value: 0 }],
    jky: [{ time: 0, value: 0 }],
    sgo: [{ time: 0, value: 0 }],
    wrkn: [{ time: 0, value: 0 }],
  });

  const loadingPrice = "N/A";
  useEffect(() => {
    const data = setInterval(() => {
      var axios = require("axios");
      var data = "";

      var config = {
        method: "post",
        url: "https://aspect-server.onrender.com/tick-graphs",
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
  }, [graphData]);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const companies = props.companies;

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
    <div>
      <div className={styles.layer_one} style={{ marginTop: "3em" }}>
        <div className={styles.inline}>
          <p className={styles.header}>Explore Companies</p>
          <span onClick={togglePopup} className={styles.question_mark}>
            ?
          </span>
        </div>
        {isOpen && (
          <div className={styles.pop_up_container}>
            <div className={styles.box4}>
              <div className={styles.inline}>
                <p className={styles.game_intro1}>Exploration</p>
                <button
                  style={{ marginLeft: "17.75em" }}
                  className={styles.close_candlestick}
                  onClick={togglePopclose}
                >
                  X
                </button>
              </div>
              <p className={styles.game_intro_text1}>
                In this section, you can explore the basic information of
                various companies with unique traits. Learn their introduction,
                valuation statistics, and daily price trend. Click on the
                companies to enter their profile page and learn more details on
                the company info!
              </p>
            </div>
          </div>
        )}
        <ExploreComp
          company={companies.ast}
          price={
            props.isPrice ? props.price_data["ast"]["price"] : loadingPrice
          }
          change={
            props.isPrice
              ? formatter.format(props.price_data["ast"]["change"])
              : "N/A"
          }
          pct_change={
            props.isPrice
              ? formatter.format(props.price_data["ast"]["pct_change"])
              : "N/A"
          }
          background="#c9ffd1"
          color={
            props.isPrice
              ? props.price_data["ast"]["change"] > 0
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
          price={
            props.isPrice ? props.price_data["dsc"]["price"] : loadingPrice
          }
          change={
            props.isPrice
              ? formatter.format(props.price_data["dsc"]["change"])
              : "N/A"
          }
          pct_change={
            props.isPrice
              ? formatter.format(props.price_data["dsc"]["pct_change"])
              : "N/A"
          }
          background="#F2C14E"
          color={
            props.isPrice
              ? props.price_data["dsc"]["change"] > 0
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
          price={
            props.isPrice ? props.price_data["fsin"]["price"] : loadingPrice
          }
          change={
            props.isPrice
              ? formatter.format(props.price_data["fsin"]["change"])
              : "N/A"
          }
          pct_change={
            props.isPrice
              ? formatter.format(props.price_data["fsin"]["pct_change"])
              : "N/A"
          }
          background="#F1FFC4"
          color={
            props.isPrice
              ? props.price_data["fsin"]["change"] > 0
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
          price={
            props.isPrice ? props.price_data["hhw"]["price"] : loadingPrice
          }
          change={
            props.isPrice
              ? formatter.format(props.price_data["hhw"]["change"])
              : "N/A"
          }
          pct_change={
            props.isPrice
              ? formatter.format(props.price_data["hhw"]["pct_change"])
              : "N/A"
          }
          background="#C6E2E9"
          color={
            props.isPrice
              ? props.price_data["hhw"]["change"] > 0
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
          price={
            props.isPrice ? props.price_data["jky"]["price"] : loadingPrice
          }
          change={
            props.isPrice
              ? formatter.format(props.price_data["jky"]["change"])
              : "N/A"
          }
          pct_change={
            props.isPrice
              ? formatter.format(props.price_data["jky"]["pct_change"])
              : "N/A"
          }
          background="#8EF9F3"
          color={
            props.isPrice
              ? props.price_data["jky"]["change"] > 0
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
          price={
            props.isPrice ? props.price_data["sgo"]["price"] : loadingPrice
          }
          change={
            props.isPrice
              ? formatter.format(props.price_data["sgo"]["change"])
              : "N/A"
          }
          pct_change={
            props.isPrice
              ? formatter.format(props.price_data["sgo"]["pct_change"])
              : "N/A"
          }
          background="#FFFC99"
          color={
            props.isPrice
              ? props.price_data["sgo"]["change"] > 0
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
          price={
            props.isPrice ? props.price_data["wrkn"]["price"] : loadingPrice
          }
          change={
            props.isPrice
              ? formatter.format(props.price_data["wrkn"]["change"])
              : "N/A"
          }
          pct_change={
            props.isPrice
              ? formatter.format(props.price_data["wrkn"]["pct_change"])
              : "N/A"
          }
          background="#B1F8F2"
          color={
            props.isPrice
              ? props.price_data["wrkn"]["change"] > 0
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

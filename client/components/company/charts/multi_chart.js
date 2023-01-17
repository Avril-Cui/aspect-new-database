import styles from "./multi_chart.module.css";
import { useState, useEffect } from "react";
import DayDimension from "./DayDimension";
import AdjustedDimension from "./AdjustedDimension";
import dynamic from "next/dynamic";

const MultiChart = (props) => {
  const [chart, setChart] = useState(1);

  const WAIT_TIME = 3000;

  const [priceData, setPriceData] = useState([{ time: 0, value: 0 }]);
  let LightweightChart = dynamic(() => import("./compMinChart"), {
    ssr: false,
  });

  useEffect(() => {
    const data = setInterval(() => {
      LightweightChart = dynamic(() => import("./compMinChart"), {
        ssr: false,
      });
      var axios = require("axios");
      var data = '"wrkn"';

      var config = {
        method: "post",
        url: "http://localhost:5000/tick-graph",
        headers: {
          "Content-Type": "text/plain",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setPriceData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [priceData]);

  return (
    <div>
      <div className={styles.header}>
        <p className={styles.title_text}>Stock Price Chart</p>
        <div className={styles.graph_type}>
          <table className={styles.price_info_table}>
            <thead>
              <tr>
                <td onClick={() => setChart(1)} className={styles.types}>
                  <button>3 MIN</button>
                </td>
                <td onClick={() => setChart(2)} className={styles.types}>
                  <button>HOUR</button>
                </td>
                <td className={styles.types} onClick={() => setChart(3)}>
                  <button>DAY</button>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {chart === 1 && priceData[0]["time"] !== 0 && (
        <div>
          <LightweightChart priceData={priceData} />
        </div>
      )}
      {chart === 2 && (
        <div>
          <AdjustedDimension CompanyName={props.id} />
        </div>
      )}
      {chart === 3 && (
        <div>
          <DayDimension CompanyName={props.id} />
        </div>
      )}
    </div>
  );
};

export default MultiChart;

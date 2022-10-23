import styles from "./multi_chart.module.css";
import { useState } from "react";
import DayDimension from "./DayDimension";
import AdjustedDimension from "./AdjustedDimension";
import dynamic from "next/dynamic";
const LightweightChart = dynamic(() => import("./wrknChart"), {
  ssr: false,
});

const MultiChart = (props) => {
  const [chart, setChart] = useState(1);

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
                  <button>ADJUSTED</button>
                </td>
                <td
                  className={styles.types}
                  onClick={() => setChart(3)}
                >
                  <button>DAY</button>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {chart === 1 && (
        <div>
          <LightweightChart />
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

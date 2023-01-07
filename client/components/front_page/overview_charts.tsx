import styles from "./overview_charts.module.css";
import { useState } from "react";
import Index from "./compGraph/index";
import Wrkn from "./compGraph/wrkn";
import Sgo from "./compGraph/sgo";
import IndexChart from "./compGraph/graphs";

const OverviewChart = () => {
  const [category, setCategory] = useState(1);
  const [compGraph, setCompGraph] = useState(1);

  return (
    <div>
      <div>
        <div
          className={styles.inline}
          style={{ marginLeft: "-0.75em", marginTop: "0.5em" }}
        >
          <button
            className={
              compGraph == 1 ? styles.tyle_btn_shadow : styles.tyle_btn
            }
          >
            <p>Indices</p>
          </button>
          <button className={styles.tyle_btn}>
            <p>I.T.</p>
          </button>
          <button className={styles.tyle_btn}>
            <p>Healthcare</p>
          </button>
          <button className={styles.tyle_btn}>
            <p>Financials</p>
          </button>
          <button className={styles.tyle_btn}>
            <p>Retail</p>
          </button>
          <button className={styles.tyle_btn}>
            <p>Cons. Disc.</p>
          </button>
          <button className={styles.tyle_btn}>
            <p>Communications</p>
          </button>
        </div>
      </div>
      <div style={{ marginTop: "0.5em" }}>
        <div className={styles.inline} style={{ marginTop: "1em" }}>
          <Index category={category} setCategory={setCategory} />
          {/* <Wrkn category={category} setCategory={setCategory}/>
          <Sgo category={category} setCategory={setCategory}/> */}
        </div>
      </div>
      {compGraph === 1 && (
          category === 1 && (
            <div>
              <IndexChart />
            </div>
          )

      )}
    </div>
  );
};

export default OverviewChart;

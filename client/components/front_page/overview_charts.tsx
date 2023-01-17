import styles from "./overview_charts.module.css";
import { useState } from "react";
import SectorTemplate from "./compGraph/sectorTemplate";

const OverviewChart = () => {
  const [category, setCategory] = useState(1);
  const [compGraph, setCompGraph] = useState(1);

  function handleCategory(num: any) {
    setCategory(num);
  }

  return (
    <div>
      <div>
        <div
          className={styles.inline}
          style={{ marginLeft: "-0.75em", marginTop: "0.5em" }}
        >
          <button
            className={category == 1 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(1)}
          >
            <p>Indices</p>
          </button>
          <button
            className={category == 2 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(2)}
          >
            <p>I.T.</p>
          </button>
          <button
            className={category == 3 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(3)}
          >
            <p>Healthcare</p>
          </button>
          <button
            className={category == 4 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(4)}
          >
            <p>Financials</p>
          </button>
          <button
            className={category == 5 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(5)}
          >
            <p>Retail</p>
          </button>

          <button
            className={category == 6 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(6)}
          >
            <p>Cons. Disc.</p>
          </button>

          <button
            className={category == 7 ? styles.tyle_btn_shadow : styles.tyle_btn}
            onClick={() => handleCategory(7)}
          >
            <p>Communications</p>
          </button>
        </div>
      </div>
      {category === 1 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["APINX"]}
          />
        </div>
      )}

      {category === 2 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["WRKN"]}
          />
        </div>
      )}

      {category === 3 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["SGO"]}
          />
        </div>
      )}

      {category === 4 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["JKY"]}
          />
        </div>
      )}

      {category === 5 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["HHW"]}
          />
        </div>
      )}

      {category === 6 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["FSIN"]}
          />
        </div>
      )}

      {category === 7 && (
        <div
          style={{
            height: 580,
            width: 1240,
            marginTop: "2.25em",
            marginLeft: "0em",
          }}
        >
          <SectorTemplate
            compGraph={compGraph}
            setCompGraph={setCompGraph}
            category={category}
            comp_names={["DSC"]}
          />
        </div>
      )}
    </div>
  );
};

export default OverviewChart;

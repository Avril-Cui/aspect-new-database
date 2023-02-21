import React from "react";
import styles from "../overview_charts.module.css";
// import ChartTemplate from "./chartTemplate";
import dynamic from "next/dynamic";
import HeaderTemplate from "./headerTemplate";

// const ChartTemplate = dynamic(() => import("./chartTemplate.js"), {
//   ssr: false,
// });

function SectorTemplate(props) {
  const comp_names = props.comp_names;
  let name = comp_names[0].toLowerCase();
  if (name == "apinx") {
    name = "index";
  }
  return (
    <div>
      <div style={{ marginTop: "0.5em" }}>
        <div className={styles.inline} style={{ marginTop: "0em" }}>
          {comp_names.map((comp_name) => (
            <div key="1">
              <HeaderTemplate
                category={props.compGraph}
                setCompGraph={props.setCompGraph}
                comp_name={comp_name}
                price_data={props.price_data}
                isPrice={props.isPrice}
              />
            </div>
          ))}
        </div>
      </div>

      {/* {props.compGraph == 1 && (
        <div>
          <ChartTemplate comp_name={name} />
        </div>
      )} */}
    </div>
  );
}

export default SectorTemplate;

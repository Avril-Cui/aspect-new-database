import React from "react";
import CompanyMini from "./MiniComp";
import styles from "./CompanyMini.module.css";
import dynamic from "next/dynamic";

const MiniChart = dynamic(() => import("./MiniChart"), {
  ssr: false,
});
// const Jky = dynamic(() => import("./jky"), {
//   ssr: false,
// });
// const Ast = dynamic(() => import("./ast"), {
//   ssr: false,
// });

function ShowMini() {
  return (
    <div className={styles.show_mini}>
      <div style={{ marginLeft: 0 }}>
        <CompanyMini />
        <div className={styles.chart}>
          <MiniChart />
        </div>
      </div>

      <div style={{ marginLeft: 3 }}>
        <CompanyMini />
        <div className={styles.chart}>
          <MiniChart />
        </div>
      </div>

      <div style={{ marginLeft: 3 }}>
        <CompanyMini />
        <div className={styles.chart}>
          <MiniChart />
        </div>
      </div>
    </div>
  );
}

export default ShowMini;

import React from "react";
import styles from "./CompanyMini.module.css";
import dynamic from "next/dynamic";

function CompanyMini() {
  return (
    <div className={styles.container}>
      <div style={{ marginLeft: "1.5em", marginTop: "0.5em" }}>
        <div className={styles.inline}>
          <div className={styles.logo_container}>
            <p className={styles.logo}>W</p>
          </div>
          <div>
            <p className={styles.comp_name}>WRKN</p>
            <p className={styles.comp_full_name}>Wakron, Inc.</p>
          </div>
        </div>
        <div className={styles.inline}>
          <p className={styles.price}>
            685.23 <span>ASD</span>
          </p>
          <p className={styles.price_change}>+12.83 (+1.86%)</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyMini;

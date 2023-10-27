import React from "react";
import Head from "next/head";
import styles from "../../styles/EndSeason/SeasonalReview.module.css";
import OverviewChart from "./overview_charts";
import TopLayer from "./TopLayer";
import News from "./news";

export default function SeasonReview(props: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Season Review</title>
      </Head>
      {/* <h1 className={styles.header}>Season One Market and User Review</h1> */}

      <div className={styles.layer1}>
        <p className={styles.layer_header}>
          📟 Market and Company Performance 📟
        </p>
        <OverviewChart />
      </div>

      <div className={styles.layer2} style={{ marginBottom: "5em" }}>
        <p className={styles.layer_header}>
          📟 Market and Company Seasonal Analyses -
          <span> Click To Read Official Analysis!</span>
        </p>
        <News index={props.index} />
      </div>
      <TopLayer />
    </div>
  );
}

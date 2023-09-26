import React from "react";
import Head from "next/head";
import styles from "../styles/EndSeason/SeasonalReview.module.css";
import OverviewChart from "../components/end_season/overview_charts";
import TopLayer from "../components/end_season/TopLayer";
import News from "../components/end_season/news";

export default function SeasonReview(props: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Season Review</title>
      </Head>
      <h1 className={styles.header}>Season One Market and User Review</h1>
      <TopLayer />

      <div className={styles.layer1}>
        <p className={styles.layer_header}>
          📟 Market and Company Performance 📟
        </p>
        <OverviewChart />
      </div>

      <div className={styles.layer1} style={{ marginBottom: "15em" }}>
        <p className={styles.layer_header}>
          📟 Market and Companies Seasonal Analysis -
          <span> Click To Read Official Analysis!</span>
        </p>
        <News index={props.index} />
      </div>
    </div>
  );
}

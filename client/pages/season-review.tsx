import React from "react";
import Head from "next/head";
import styles from "../styles/EndSeason/SeasonalReview.module.css";
import OverviewChart from "../components/end_season/overview_charts";
import { useState, useEffect, Dispatch } from "react";
import TopLayer from "../components/end_season/TopLayer"

function SeasonReview() {

  return (
    <div className={styles.container}>
      <Head>
        <title>Season Review</title>
      </Head>
      <h1 className={styles.header}>Season One Market and User Review</h1>
      <TopLayer />
      

      <div className={styles.layer1}>
        <p className={styles.layer_header}>
          📟 Market and Company Performance 📟 -{" "}
          <span>Click on Tickers To Read Official Analysis!</span>
        </p>
        <OverviewChart />
      </div>
    </div>
  );
}

export default SeasonReview;

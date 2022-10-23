import ReactEcharts from "echarts-for-react";
import { useState, useEffect } from "react";

// import { createChart } from "lightweight-charts";
const CoinPriceChart = dynamic(() => import("lightweight-chart"), {
    ssr: false
  });

const PerSecondChart = (props) => {
  useEffect(() => {
    var chartElement = document.createElement("div");
    document.body.appendChild(chartElement);
  }, []);
  return <div>Hi</div>;
};

export default PerSecondChart;

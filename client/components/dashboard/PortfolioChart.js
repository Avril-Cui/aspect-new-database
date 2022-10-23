import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import styles from "../../styles/portfolio.module.css";

export const OverviewChart = (props) => {
  const { data } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: 460 });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        backgroundColor: "#2d2d2d",
        lineColor: "#272727",
        textColor: "#D9D9D9",
      },
      height: 410,
      width: 750,
      rightPriceScale: {
        visible: true,
        borderVisible: false,
      },
      timeScale: {
        visible: true,
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
      grid: {
        vertLines: {
          visible: true,
          color: "#666666",
        },
        horzLines: {
          visible: true,
          color: "#666666",
        },
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: "#C9FFD1",
      lineWidth: 1.5,
      topColor: "#c9ffd1c2",
      bottomColor: "#c9ffd11c",
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
};

const initialData = [
  { time: 1558350000, value: 226.21 },
  { time: 1558353600, value: 225.52 },
  { time: 1558357200, value: 225.71 },
  { time: 1558360800, value: 226.18 },
  { time: 1558364400, value: 226 },
  { time: 1558422000, value: 226.81 },
  { time: 1558425600, value: 226.52 },
  { time: 1558429200, value: 226.98 },
  { time: 1558432800, value: 229.19 },
  { time: 1558436400, value: 229.65 },
  { time: 1558440000, value: 229.8 },
  { time: 1558443600, value: 229.37 },
  { time: 1558447200, value: 231.13 },
  { time: 1558450800, value: 232.71 },
  { time: 1558508400, value: 231.06 },
  { time: 1558512000, value: 231.93 },
  { time: 1558515600, value: 236.04 },
  { time: 1558519200, value: 235.81 },
  { time: 1558522800, value: 237.09 },
  { time: 1558526400, value: 236.79 },
  { time: 1558530000, value: 236.6 },
  { time: 1558533600, value: 235.73 },
  { time: 1558537200, value: 235.86 },
  { time: 1558594800, value: 233.31 },
  { time: 1558598400, value: 232.46 },
  { time: 1558602000, value: 233.03 },
  { time: 1558605600, value: 233.2 },
  { time: 1558609200, value: 232.8 },
  { time: 1558612800, value: 231.67 },
  { time: 1558616400, value: 230.71 },
  { time: 1558620000, value: 229.05 },
];

export default function PortfolioChart(props) {
  return (
    <div>
      <OverviewChart
        {...props}
        data={initialData}
        className={styles.chart}
      ></OverviewChart>
    </div>
  );
}

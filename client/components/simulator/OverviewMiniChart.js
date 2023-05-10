import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

export const OverviewChart = (props) => {
  const { data } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: 460 });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        backgroundColor: "#141414",
        lineColor: "#272727",
        textColor: "#D9D9D9",
      },
      height: 245,
      width: 460,
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
          visible: false,
        },
        horzLines: {
          visible: false,
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

export default OverviewChart;

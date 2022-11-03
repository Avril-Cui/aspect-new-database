import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";

export const ChartComponent = (props) => {
  const { data } = props;
  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: 381 });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
		backgroundColor: "#272727",
		lineColor: "#272727",
        textColor: "#D9D9D9",
      },
      height: 125,
      width: 381,
      rightPriceScale: {
        visible: false,
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

const initialData = [
	{ time: 1558087200, value: 227.15 },
	{ time: 1558090800, value: 226.75 },
	{ time: 1558094400, value: 226.5 },
	{ time: 1558098000, value: 227.4 },
	{ time: 1558101600, value: 227.96 },
	{ time: 1558105200, value: 226.94 },
	{ time: 1558335600, value: 227.64 },
	{ time: 1558339200, value: 226.39 },
	{ time: 1558342800, value: 226.03 },
	{ time: 1558346400, value: 225.91 },
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
	{ time: 1558623600, value: 229.3 },
	{ time: 1558681200, value: 234.3 },
	{ time: 1558684800, value: 233.85 },
	{ time: 1558688400, value: 233.68 },
	{ time: 1558692000, value: 234.95 },
	{ time: 1558695600, value: 235.34 },
	{ time: 1558699200, value: 235.34 },
	{ time: 1558702800, value: 234.76 },
	{ time: 1558706400, value: 233.3 },
	{ time: 1558710000, value: 234.45 },
	{ time: 1558940400, value: 235.6 },
	{ time: 1558944000, value: 235.7 },
	{ time: 1558947600, value: 234.95 },
	{ time: 1558951200, value: 235.03 },
	{ time: 1558954800, value: 234.93 },
	{ time: 1558958400, value: 234.33 },
	{ time: 1558962000, value: 234.25 },
	{ time: 1558965600, value: 234.98 },
	{ time: 1558969200, value: 236 },
	{ time: 1559026800, value: 236.11 },
	{ time: 1559030400, value: 235.83 },
	{ time: 1559034000, value: 235.98 },
	{ time: 1559037600, value: 235.94 },
	{ time: 1559041200, value: 236.36 },
	{ time: 1559044800, value: 236.07 },
	{ time: 1559048400, value: 235.69 },
	{ time: 1559052000, value: 232.94 },
];

export default function MiniChart(props) {
  return <ChartComponent {...props} data={initialData}></ChartComponent>;
}

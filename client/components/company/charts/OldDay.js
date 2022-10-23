import ReactEcharts from "echarts-for-react";
import { useState, useEffect } from "react";
import styles from "../../../styles/simulator/company.module.css"
const WrknDayChart = (props) => {
  const WAIT_TIME = 1000 * 60 * 60 * 24;
  const [price, setPrice] = useState([
    ["07/01/2071 ", 3078.0, 3093.65, 3049.39, 3138.96],
    ["07/02/2071 ", 3079.24, 2939.09, 2938.39, 3096.96],
    ["07/03/2071 ", 2961.51, 3132.41, 2961.51, 3132.54],
    ["07/04/2071 ", 3152.04, 3210.83, 3152.04, 3269.28],
    ["07/05/2071 ", 3219.94, 3068.26, 3044.44, 3219.94],
    ["07/06/2071 ", 3078.59, 3104.11, 3069.62, 3108.65],
    ["07/07/2071 ", 3104.41, 3117.58, 3029.13, 3124.04],
    ["07/08/2071 ", 3117.86, 3012.79, 3012.79, 3144.26],
    ["07/09/2071 ", 3012.68, 2713.19, 2713.19, 3012.68],
    ["07/10/2071 ", 2713.22, 2322.73, 2322.73, 2818.53],
    ["07/11/2071 ", 2322.4, 2500.45, 2018.98, 2500.45],
    ["07/12/2071 ", 2500.88, 2585.29, 2378.33, 2668.01],
    ["07/13/2071 ", 2585.23, 2647.72, 2576.7, 2774.21],
    ["07/14/2071 ", 2647.54, 2656.03, 2620.4, 2723.79],
    ["07/15/2071 ", 2655.58, 2949.44, 2655.58, 2949.7],
    ["07/16/2071 ", 2949.37, 2892.17, 2844.44, 3079.88],
    ["07/17/2071 ", 2891.87, 2909.62, 2854.46, 2968.87],
    ["07/18/2071 ", 2909.83, 2929.93, 2835.63, 2962.98],
    ["07/19/2071 ", 2930.11, 3084.27, 2930.11, 3084.27],
    ["07/20/2071 ", 3084.27, 3118.65, 3044.77, 3136.83],
    ["07/21/2071 ", 3118.62, 3258.53, 3118.62, 3258.53],
    ["07/22/2071 ", 3258.71, 3250.68, 3246.52, 3380.07],
    ["07/23/2071 ", 3250.66, 3129.33, 3085.56, 3250.66],
    ["07/24/2071 ", 3129.69, 3231.68, 3093.36, 3231.68],
    ["07/25/2071 ", 3231.88, 3193.14, 3191.35, 3257.35],
    ["07/26/2071 ", 3193.18, 3251.87, 3161.12, 3257.36],
    ["07/27/2071 ", 3252.0, 3344.94, 3186.02, 3345.18],
    ["07/28/2071 ", 3345.21, 3471.06, 3331.41, 3471.27],
    ["07/29/2071 ", 3470.85, 3422.95, 3419.0, 3470.85],
    ["07/30/2071 ", 3422.81, 3357.38, 3356.71, 3497.16],
    ["07/31/2071 ", 3357.54, 3194.48, 3194.44, 3375.64],
    ["08/01/2071 ", 3194.02, 2957.4, 2957.01, 3194.02],
    ["08/02/2071 ", 2957.35, 2746.08, 2708.75, 2958.23],
    ["08/03/2071 ", 2745.91, 2620.71, 2620.69, 2975.14],
    ["08/04/2071 ", 2620.66, 2571.93, 2503.26, 2715.85],
    ["08/05/2071 ", 2572.33, 2572.06, 2442.52, 2614.12],
    ["08/06/2071 ", 2571.87, 2954.34, 2571.7, 2954.34],
    ["08/07/2071 ", 2954.4, 2829.82, 2829.34, 2969.1],
    ["08/08/2071 ", 2829.57, 2691.1, 2652.71, 2882.47],
    ["08/09/2071 ", 2690.66, 2643.09, 2625.81, 2720.99],
    ["08/10/2071 ", 2643.24, 2709.37, 2622.36, 2747.8],
    ["08/11/2071 ", 2709.58, 2664.33, 2662.91, 2750.64],
    ["08/12/2071 ", 2664.14, 2296.23, 2218.39, 2664.14],
    ["08/13/2071 ", 2296.63, 2034.72, 1891.41, 2296.63],
    ["08/14/2071 ", 2034.53, 1973.29, 1931.43, 2131.51],
    ["08/15/2071 ", 1973.26, 2114.77, 1924.54, 2114.89],
    ["08/16/2071 ", 2114.88, 2167.76, 2114.88, 2236.78],
    ["08/17/2071 ", 2167.92, 1812.25, 1812.25, 2168.0],
    ["08/18/2071 ", 1812.3, 1555.54, 1468.18, 1812.3],
    ["08/19/2071 ", 1555.17, 1616.87, 1511.53, 1637.99],
    ["08/20/2071 ", 1616.85, 1646.12, 1596.75, 1687.09],
    ["08/21/2071 ", 1645.85, 1604.8, 1585.37, 1691.51],
    ["08/22/2071 ", 1604.88, 1660.87, 1536.58, 1768.94],
    ["08/23/2071 ", 1660.9, 1819.21, 1612.61, 1862.33],
    ["08/24/2071 ", 1819.57, 1705.03, 1626.56, 1819.79],
    ["08/25/2071 ", 1705.09, 1695.72, 1643.13, 1735.24],
    ["08/26/2071 ", 1695.7, 1761.91, 1666.2, 1771.94],
    ["08/27/2071 ", 1761.71, 1608.08, 1608.08, 1805.6],
    ["08/28/2071 ", 1607.67, 1650.4, 1567.78, 1669.16],
    ["08/29/2071 ", 1650.51, 1497.67, 1482.89, 1650.64],
    ["08/30/2071 ", 1497.76, 1308.82, 1258.57, 1497.89],
    ["08/31/2071 ", 1308.93, 1463.73, 1298.32, 1463.73],
    ["09/01/2071 ", 1463.56, 1567.23, 1463.47, 1605.45],
    ["09/02/2071 ", 1567.27, 1683.73, 1567.21, 1692.78],
    ["09/03/2071 ", 1683.85, 1691.45, 1628.65, 1691.45],
    ["09/04/2071 ", 1691.44, 1746.77, 1688.63, 1784.8],
    ["09/05/2071 ", 1746.85, 1752.77, 1699.81, 1780.89],
    ["09/06/2071 ", 1753.02, 1809.04, 1737.17, 1830.37],
    ["09/07/2071 ", 1809.09, 1721.0, 1717.46, 1838.48],
    ["09/08/2071 ", 1721.1, 1650.96, 1646.75, 1767.9],
    ["09/09/2071 ", 1651.24, 1862.27, 1648.29, 1862.27],
    ["09/10/2071 ", 1862.44, 1915.06, 1862.38, 1923.79],
    ["09/11/2071 ", 1915.13, 1965.37, 1887.82, 1968.52],
    ["09/12/2071 ", 1965.41, 1989.9, 1965.18, 2022.83],]);

  console.log(price)
  // useEffect(() => {
  //   const data = setInterval(() => {
  //     fetch(`/api/${props.CompanyName}/dayChart`)
  //     .then((res) => res.json())
  //     .then((result_value) => {
  //       setPrice(result_value)
  //     })

  //   }, WAIT_TIME);
  //   return () => clearInterval(data);
  // }, [price]); 
  

  let option;

  if (price == null || undefined || price.length == 0){
    setPrice([[0, "01/01/2000", 50.0, 47.72, 47.63, 53.85]])
  }

  // console.log(price.length)
  // console.log(price)

  if(price.length < 10){
    for (let i = price.length; i < 10; i++) {
      price[i] = [i, null, null, null, null, null]
      price[0] = ["07/01/2071", 50.0, 47.72, 47.63, 53.85]
    }
  }
  let start_label1 = 0
  let start_label2 = 0
  let end_label = 100

  if (price.length > 15){
    start_label1 = 30
    start_label2 = 50
    end_label = 100
  }

  const upColor = "#C3FCC2";
  const upBorderColor = "#86BF8C";
  const downColor = "#EF534F";
  const downBorderColor = "#E5403B";
  const data0 = splitData(price);
  function splitData(rawData) {
    const categoryData = [];
    const values = [];
    for (var i = 0; i < rawData.length; i++) {
      categoryData.push(rawData[i].splice(0, 1)[0]);
      values.push(rawData[i]);
    }
    return {
      categoryData: categoryData,
      values: values,
    };
  }

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  function calculateMA(dayCount) {
    var result = [];
    for (var i = 0, len = data0.values.length; i < len; i++) {
      if (i < dayCount) {
        result.push("-");
        continue;
      }
      var sum = 0;
      for (var j = 0; j < dayCount; j++) {
        sum += +data0.values[i - j][1];
      }
      result.push(round(sum / dayCount));
    }
    return result;
  }

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      show: true,
      backgroundColor: "#161616",
      left: "0%",
      right: "0%",
      bottom: "0%",
      top: "0%",
    },
    xAxis: {
      type: "category",
      data: data0.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: "dataMin",
      max: "dataMax",
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true,
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: start_label1,
        end: end_label,
      },
      {
        show: false,
        type: "slider",
        top: "90%",
        start: start_label2,
        end: end_label,
      },
    ],
    series: [
      {
        name: "Daily Price",
        type: "candlestick",
        data: data0.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor,
        },
        markPoint: {
          label: {
            formatter: function (param) {
              return param != null ? Math.round(param.value) + "" : "";
            },
          },
          tooltip: {
            formatter: function (param) {
              return param.name + "<br>" + (param.data.coord || "");
            },
          },
        },
        markLine: {
          symbol: ["none", "none"],
          data: [
            [
              {
                name: "from lowest to highest",
                type: "min",
                valueDim: "lowest",
                symbol: "circle",
                symbolSize: 5,
                label: {
                  show: false,
                },
                emphasis: {
                  label: {
                    show: false,
                  },
                },
              },
              {
                type: "max",
                valueDim: "highest",
                symbol: "circle",
                symbolSize: 5,
                label: {
                  show: false,
                },
                emphasis: {
                  label: {
                    show: false,
                  },
                },
              },
            ],
          ],
        },
      },
      {
        name: "MA5",
        type: "line",
        data: calculateMA(5),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.8,
        },
      },
      {
        name: "MA10",
        type: "line",
        data: calculateMA(10),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.8,
          symbolSize: 0.01,
        },
      },
      {
        name: "MA20",
        type: "line",
        data: calculateMA(20),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.8,
        },
      },
      {
        name: "MA30",
        type: "line",
        data: calculateMA(30),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.8,
        },
      },
    ],
  }

  

  return (
      <ReactEcharts  className={styles.time_line_chart} style={{height: 450}} option={option} />
  );
};

export default WrknDayChart;
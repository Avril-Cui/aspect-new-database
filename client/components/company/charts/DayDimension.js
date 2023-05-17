import ReactEcharts from "echarts-for-react";
import { useState, useEffect } from "react";
import styles from "../../../styles/simulator/company.module.css"
const DayDimension = (props) => {
  const WAIT_TIME = 1000*60*60;
  useEffect(() => {
    var axios = require("axios");
    var request = `"${props.CompanyName}"`;

    var config = {
      method: "post",
      url: `${process.env.serverConnection}/day-graph`,
      headers: {
        "Content-Type": "text/plain",
      },
      data: request,
    };

    axios(config)
      .then(function (response) {
        window.localStorage.setItem("priceData", JSON.stringify(response.data));
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    const data = setInterval(() => {

      axios(config)
        .then(function (response) {
          window.localStorage.setItem(
            "priceData",
            JSON.stringify(response.data)
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [WAIT_TIME, props.CompanyName]);
  let price = JSON.parse(window.localStorage.getItem("priceData"));

  let option;

  if (price == null || undefined || price.length == 0) {
    price = [["01/01/2071 ", 0, 0, 0, 0]];
  }

  if (price.length < 30) {
    for (let i = price.length; i < 30; i++) {
      price[i] = ["", undefined, undefined, undefined, undefined, undefined];
      price[0] = ["", null, null, null, null];
    }
  }

  const upColor = "#72B176";
  const upBorderColor = "#72B176";
  const downColor = "#B85723";
  const downBorderColor = "#B85723";
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
      left: "6%",
      right: "0%",
      top: "3%",
      bottom: "10%",
      backgroundColor: "#141414",
      show: true,
      borderWidth: 0,
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
      // splitArea: {
      //   show: true,
      // },
      splitArea: {
        show: false,
      },
      splitLine: {
        lineStyle: {
            color: '#3b3b3b'
        }
      },
    },
    // dataZoom: [
    //   {
    //     type: "inside",
    //     start: start_label1,
    //     end: end_label,
    //   },
    //   {
    //     show: false,
    //     type: "slider",
    //     top: "90%",
    //     start: start_label2,
    //     end: end_label,
    //   },
    // ],
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
          opacity: 0.6,
          width: 1.5,
        },
      },
      {
        name: "MA10",
        type: "line",
        data: calculateMA(10),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.6,
          width: 1.5,
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
          opacity: 0.6,
          width: 1.5,
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
      <ReactEcharts  className={styles.time_line_chart} style={{height: 420, width: 750}}option={option} />
  );
};

export default DayDimension;
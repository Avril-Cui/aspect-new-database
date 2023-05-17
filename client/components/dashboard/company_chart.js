import ReactEcharts from "echarts-for-react";
import { useEffect } from "react";
import styles from "../../styles/simulator/company.module.css";
const CompanyChart = (props) => {

  useEffect(() => {
    var axios = require("axios");

    var config = {
      method: "post",
      url: `${process.env.serverConnection}/hour-graph`,
      headers: {
        "Content-Type": "text/plain",
      },
      data: `"${props.comp_name}"`,
    };

    axios(config)
      .then(function (response) {
        window.localStorage.setItem("dayData", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.comp_name]);

  let price = JSON.parse(window.localStorage.getItem("dayData"));

  let option;

  if (price == null || undefined || price.length == 0) {
    price = [["01/01/2071 ", 0, 0, 0, 0]];
  }

  if (price.length < 10) {
    for (let i = price.length; i < 10; i++) {
      price[i] = ["", null, null, null, null, null];
      price[0] = ["", null, null, null, null];
    }
  }
  let start_label1 = price.length*4-30;
  let start_label2 = price.length*4-30;
  let end_label = price.length*4;

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
    return (Math.round(m) / 100) * Math.sign(num);
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
      left: "3%",
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
          color: "#3b3b3b",
        },
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
  };

  return (
    <ReactEcharts
      className={styles.time_line_chart}
      style={{ height: 390, width: 510, marginLeft: "45.25em", marginTop: "0em" }}
      option={option}
    />
  );
};

export default CompanyChart;

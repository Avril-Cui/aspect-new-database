import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
const AdjustedDimension = (props) => {
  const WAIT_TIME = 1000*60*60;

  useEffect(() => {
    var axios = require("axios");
    var request = `"${props.comp_name}"`;

    var config = {
      method: "post",
      url: "https://aspect-server.onrender.com/day-graph",
      headers: {
        "Content-Type": "text/plain",
      },
      data: request,
    };

    axios(config)
      .then(function (response) {
        window.localStorage.setItem(`"${props.comp_name}"`, JSON.stringify(response.data));
        setPrice(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error);
      });
    const data = setInterval(() => {

      axios(config)
        .then(function (response) {
          window.localStorage.setItem(
            `"${props.comp_name}"`,
            JSON.stringify(response.data)
          );
          setPrice(JSON.stringify(response.data))
        })
        .catch(function (error) {
          console.log(error);
        });
    }, WAIT_TIME);
    return () => clearInterval(data);
  }, [WAIT_TIME, props.comp_name]);

  let price = JSON.parse(window.localStorage.getItem(`"${props.comp_name}"`));

  let option;

  if (price == null || undefined || price.length == 0) {
    price = [["01/01/2071 ", 0, 0, 0, 0]];
  }

  if (price.length < 20) {
    for (let i = price.length; i < 20; i++) {
      price[i] = [undefined, undefined, undefined, undefined, undefined, undefined];
      price[0] = ["01/01/2071 ", null, null, null, null];
    }
  }
  
  let start_label1 = price.length*4-30*4;
  let start_label2 = price.length*4-30*4;
  let end_label = price.length*4;
  console.log(price.length)

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
      splitArea: {
        show: false,
      },
      splitLine: { show: false },
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0, 1],
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
        name: "MA1",
        type: "line",
        data: calculateMA(3),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.6,
          width: 1.5,
        },
      },
      {
        name: "MA2",
        type: "line",
        data: calculateMA(5),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.6,
          width: 1.5,
          symbolSize: 0.01,
        },
      },
      {
        name: "MA3",
        type: "line",
        data: calculateMA(10),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          opacity: 0.6,
          width: 1.5,
        },
      },
      {
        name: "MA4",
        type: "line",
        data: calculateMA(15),
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
      style={{
        height: 430,
        width: 1240,
        marginTop: "2.25em",
        marginLeft: "0em",
      }}
      option={option}
    />
  );
};

export default AdjustedDimension;

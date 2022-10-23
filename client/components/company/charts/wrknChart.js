import { createChart } from "lightweight-charts";
import * as React from 'react';


export default class LightweightChart extends React.PureComponent {
  static defaultProps = {
    containerId: "lightweight_chart_container",
  };

  chart = null;

  componentDidMount() {
    var chart = createChart(this.props.containerId, {
      width: 750,
      height: 365,
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
      },
    });
    
    this.chart = chart;

    var lineSeries = chart.addAreaSeries({
      topColor: "rgba(33, 150, 243, 0.56)",
      bottomColor: "rgba(33, 150, 243, 0.04)",
      lineColor: "rgba(33, 150, 243, 1)",
      lineWidth: 2,
    });

    var darkTheme = {
      chart: {
        layout: {
          backgroundColor: "#2D2D2D",
          lineColor: "#2D2D2D",
          textColor: "#D9D9D9",
        },
        watermark: {
          color: "rgba(0, 0, 0, 0)",
        },
        crosshair: {
          color: "#758696",
        },
        grid: {
          vertLines: {
            color: "#3b3b3b",
          },
          horzLines: {
            color: "#3b3b3b",
          },
        },
      },
      series: {
        topColor: "#c9ffd1c2",
        bottomColor: "#c9ffd11c",
        lineColor: "#C9FFD1",
      },
    };

    function syncToTheme(theme) {
      chart.applyOptions(darkTheme.chart);
      lineSeries.applyOptions(darkTheme.series);
    }

    lineSeries.setData([
      { time: 1556877600, value: 230.12 },
      { time: 1556881200, value: 230.24 },
      { time: 1556884800, value: 230.63 },
      { time: 1556888400, value: 231.35 },
      { time: 1556892000, value: 232.24 },
      { time: 1556895600, value: 232.52 },
      { time: 1557126000, value: 228.71 },
      { time: 1557129600, value: 228.88 },
      { time: 1557133200, value: 228.18 },
      { time: 1557136800, value: 228.89 },
      { time: 1557140400, value: 229.05 },
      { time: 1557144000, value: 229.46 },
      { time: 1557147600, value: 230.98 },
      { time: 1557151200, value: 231.71 },
      { time: 1557154800, value: 232.8 },
      { time: 1557212400, value: 233.1 },
      { time: 1557216000, value: 232.9 },
      { time: 1557219600, value: 232.9 },
      { time: 1557223200, value: 232.76 },
      { time: 1557226800, value: 232.41 },
      { time: 1557230400, value: 231.2 },
      { time: 1557234000, value: 230.83 },
      { time: 1557237600, value: 230.57 },
      { time: 1557241200, value: 231.49 },
      { time: 1557298800, value: 231.5 },
      { time: 1557302400, value: 230.87 },
      { time: 1557306000, value: 229.79 },
      { time: 1557309600, value: 230.06 },
      { time: 1557313200, value: 230.53 },
      { time: 1557316800, value: 231.04 },
      { time: 1557320400, value: 230.63 },
      { time: 1557324000, value: 230.83 },
      { time: 1557327600, value: 230 },
      { time: 1557471600, value: 228.8 },
      { time: 1557475200, value: 227.73 },
      { time: 1557478800, value: 227.73 },
      { time: 1557482400, value: 227.84 },
      { time: 1557486000, value: 228.2 },
      { time: 1557489600, value: 228.33 },
      { time: 1557493200, value: 228.6 },
      { time: 1557496800, value: 227.11 },
      { time: 1557500400, value: 227 },
      { time: 1557730800, value: 226.29 },
      { time: 1557734400, value: 227.04 },
      { time: 1557738000, value: 227.97 },
      { time: 1557741600, value: 227.85 },
      { time: 1557745200, value: 227.13 },
      { time: 1557748800, value: 225.64 },
      { time: 1557752400, value: 224.46 },
      { time: 1557756000, value: 225.22 },
      { time: 1557759600, value: 224.22 },
      { time: 1557817200, value: 225.9 },
      { time: 1557820800, value: 226.15 },
      { time: 1557824400, value: 227.9 },
      { time: 1557828000, value: 228.86 },
      { time: 1557831600, value: 228.83 },
      { time: 1557835200, value: 228.17 },
      { time: 1557838800, value: 228.71 },
      { time: 1557842400, value: 227.68 },
      { time: 1557846000, value: 227.88 },
      { time: 1557903600, value: 227.67 },
      { time: 1557907200, value: 227.52 },
      { time: 1557910800, value: 226.05 },
      { time: 1557914400, value: 224.54 },
      { time: 1557918000, value: 225.96 },
      { time: 1557921600, value: 224.88 },
      { time: 1557925200, value: 226.78 },
      { time: 1557928800, value: 229.09 },
      { time: 1557932400, value: 228.69 },
      { time: 1557990000, value: 230.22 },
      { time: 1557993600, value: 231.12 },
      { time: 1557997200, value: 229.67 },
      { time: 1558000800, value: 229.44 },
      { time: 1558004400, value: 229.72 },
      { time: 1558008000, value: 229.57 },
      { time: 1558011600, value: 229.42 },
      { time: 1558015200, value: 229.23 },
      { time: 1558018800, value: 228.19 },
      { time: 1558076400, value: 227.72 },
      { time: 1558080000, value: 227.31 },
      { time: 1558083600, value: 226.93 },
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
      { time: 1559055600, value: 233.79 },
    ]);
    syncToTheme("Dark");
  }
  componentWillUnmount() {
    if (this.chart !== null) {
      this.chart.remove();
      this.chart = null;
    }
  }

  render() {
    return <div id={this.props.containerId} className={"LightweightChart"} />;
  }
}

// const WrknChart = () => {
//   return (
//     <html>
//       <div>
//         <div id="tvchart"></div>
//         Hi!
//         What?
//       </div>
//       <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
//       <script type="text/javascript" src="/Users/xiaokeai/Desktop/aspect_website/components/company/perTickChart.js"></script>
//     </html>
//   );
// };

// export default WrknChart;

// import { useState, useEffect } from "react";
// const WrknChart = (props) => {
//   let isDataPresent = false
//   var option;

//   const WAIT_TIME = 3000;
//   const [price, setPrice] = useState([[0, 256.0],
//     [1, 256.12],
//     [2, 255.34],
//     [3, 255.43],
//     [4, 255.09],
//     [5, 254.54],
//     [6, 254.31],
//     [7, 254.2],
//     [8, 254.24],
//     [9, 254.2],
//     [10, 254.4],
//     [11, 254.35],
//     [12, 253.68],
//     [13, 253.09],
//     [14, 252.7],
//     [15, 252.06],
//     [16, 251.44],
//     [17, 250.77],
//     [18, 250.8],
//     [19, 250.3],
//     [20, 250.15],
//     [21, 250.49],
//     [22, 250.57],
//     [23, 249.95],
//     [24, 250.06],
//     [25, 249.58],
//     [26, 249.04],
//     [27, 248.46],
//     [28, 248.17],
//     [29, 247.9],
//     [30, 247.83],
//     [31, 247.04],
//     [32, 246.92],
//     [33, 246.52],
//     [34, 245.6],
//     [35, 245.72],
//     [36, 245.32],
//     [37, 244.37],
//     [38, 243.7],
//     [39, 243.3],
//     [40, 242.23],
//     [41, 241.9],
//     [42, 242.04],
//     [43, 242.36],
//     [44, 242.14],
//     [45, 242.47],
//     [46, 242.96],
//     [47, 243.07],
//     [48, 243.39],
//     [49, 243.66],
//     [50, 244.2],
//     [51, 244.14],
//     [52, 244.04],
//     [53, 243.92],
//     [54, 244.65],
//     [55, 244.69],
//     [56, 244.8],
//     [57, 244.63],
//     [58, 244.63],
//     [59, 244.87],
//     [60, 245.71],
//     [61, 246.65],
//     [62, 246.31],
//     [63, 247.1],
//     [64, 247.58],
//     [65, 246.96],
//     [66, 247.01],
//     [67, 247.11],
//     [68, 247.26],
//     [69, 247.18],
//     [70, 247.51],
//     [71, 247.51],
//     [72, 247.84],
//     [73, 248.06],
//     [74, 248.95],
//     [75, 249.8],
//     [76, 250.08],
//     [77, 250.38],
//     [78, 250.7],
//     [79, 250.79],
//     [80, 250.9],
//     [81, 251.21],
//     [82, 251.55],
//     [83, 251.13],
//     [84, 250.99],
//     [85, 251.03],
//     [86, 251.08],
//     [87, 250.77],
//     [88, 251.52],
//     [89, 251.52],
//     [90, 252.06],
//     [91, 252.49],
//     [92, 252.31],
//     [93, 252.35],
//     [94, 252.52],
//     [95, 252.94],
//     [96, 253.0],
//     [97, 253.37],
//     [98, 253.61],
//     [99, 253.33],
//     [100, 253.1],
//     [101, 253.38],
//     [102, 253.45],
//     [103, 253.45],
//     [104, 254.08],
//     [105, 254.12],
//     [106, 254.41],
//     [107, 254.67],
//     [108, 255.44],
//     [109, 255.85],
//     [110, 255.88],
//     [111, 255.78],
//     [112, 255.95],
//     [113, 256.09],
//     [114, 255.96],
//     [115, 256.35],
//     [116, 256.88],
//     [117, 257.3],
//     [118, 257.47],
//     [119, 257.69],
//     [120, 258.22],
//     [121, 257.79],
//     [122, 257.41],
//     [123, 257.09],
//     [124, 256.83],
//     [125, 256.93],
//     [126, 256.22],
//     [127, 255.76],
//     [128, 255.76],
//     [129, 255.13],
//     [130, 255.09],
//     [131, 254.12],
//     [132, 253.27],
//     [133, 252.8],
//     [134, 252.18],
//     [135, 252.13],
//     [136, 251.97],
//     [137, 251.49],
//     [138, 250.64],
//     [139, 249.79],
//     [140, 249.5],
//     [141, 249.41],
//     [142, 248.79],
//     [143, 248.78],
//     [144, 248.41],
//     [145, 248.23],
//     [146, 248.25],
//     [147, 247.78],
//     [148, 247.56],
//     [149, 247.48],
//     [150, 247.01],
//     [151, 246.53],
//     [152, 246.63],
//     [153, 246.16],
//     [154, 245.68],
//     [155, 244.81],
//     [156, 244.78],
//     [157, 244.11],
//     [158, 243.75],
//     [159, 243.59],
//     [160, 242.82],
//     [161, 242.84],
//     [162, 242.95],
//     [163, 243.03],
//     [164, 243.5],
//     [165, 243.1],
//     [166, 243.1],
//     [167, 243.31],
//     [168, 242.81],
//     [169, 242.8],
//     [170, 242.66],
//     [171, 242.3],
//     [172, 242.67],
//     [173, 243.02],
//     [174, 243.23],
//     [175, 243.24],
//     [176, 243.44],
//     [177, 243.67],
//     [178, 243.91],
//     [179, 243.6],
//     [180, 243.08],]);

//   // useEffect(() => {
//   //   const data = setInterval(() => {
//   //     fetch(`/api/${props.CompanyName}/getChart`)
//   //     .then((res) => res.json())
//   //     .then((result_value) => {
//   //       setPrice(result_value)
//   //     })

//   //   }, WAIT_TIME);
//   //   return () => clearInterval(data);
//   // }, [price]);

//   if(price !== null){
//     isDataPresent = true

//     if(price.length !== 179){
//       for (let i = price.length; i < 179; i++) {
//         price[i] = [i, null]
//         if (price.length==1){
//           price[0] = [0, 0]
//         }
//       }
//     }

//     const dateList = price.map(function (item) {
//       return item[0];
//     });
//     const valueList = price.map(function (item) {
//       return item[1];
//     });
//     isDataPresent = true
//     option = {
//       // Make gradient line here
//       backgroundColor: {
//         colorStops: [
//           {
//             offset: 0,
//             color: '#2c2c2c'
//           },
//         ]
//       },
//       color: {

//       },

//       tooltip: {
//         trigger: 'axis',
//         textColor: "#C9FFD1"
//       },
//       xAxis: [
//         {
//           data: dateList,
//         },
//       ],
//       yAxis: {
//         scale: true,
//         splitArea: {
//           show: false,
//         },
//         splitLine: {
//           lineStyle: {
//               color: '#3b3b3b'
//           }
//         },
//         axisLabel: {
//           align: 'center'
//           // ...
//         }
//       },
//       grid: {
//         left: "3%",
//         right: "0%",
//         top: "3%",
//         bottom: "10%",
//         backgroundColor: "#2D2D2D",
//         show: true,
//         borderWidth: 0,
//       },
//       series: [
//         {
//           type: 'line',
//           showSymbol: false,
//           data: valueList,
//           lineStyle: {
//             normal: {
//               color: '#C9FFD1',
//             },
//         },
//         },
//       ]}
//   };

//   return (
//     // <div>Hi</div>
//     <div>
//       {
//       isDataPresent && <ReactEcharts  style={{height: 370, width: 760}} option={option} />
//       }
//     </div>
//   );
// };

// export default WrknChart;

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
      height: 400,
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
          backgroundColor: "#141414",
          lineColor: "#141414",
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
    
    lineSeries.setData(this.props.priceData);
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

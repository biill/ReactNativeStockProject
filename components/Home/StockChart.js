import React, { Component } from "react";
import { StyleSheet, View, Platform } from "react-native";
import Echarts from "native-echarts";

const StockChart = ({ data, name }) => {
  let stockData = data.slice(-30);

  let dates = [];
  let values = [];

  if (data) {
    stockData.map((data) => dates.push(data["date"]));
    stockData.map((item) =>
      values.push([item["open"], item["close"], item["low"], item["high"]])
    );
  }

  const option = {
    backgroundColor: "black",
    title: {
      show: true,
      text: name,
      textStyle: {
        fontSize: 15,
        align: "center",
        lineHeight: 40,
        left: "40%",
      },
    },
    tooltip: {
      trigger: "none",
      axisPointer: {
        animation: false,
        type: "cross",
        lineStyle: {
          color: "#376df4",
          width: 2,
          opacity: 1,
        },
      },
    },

    toolbox: {
      orient: "vertical",
      show: true,
      showTitle: true,
    },
    xAxis: [
      {
        type: "category",
        data: dates,
        axisLine: { lineStyle: { color: "white" } },
        scale: true,
      },
    ],
    yAxis: [
      {
        scale: true,
        axisLine: {
          lineStyle: { color: "white" },
        },
        splitLine: { show: false },
      },
    ],
    grid: [
      {
        top: 40,
        bottom: 40,
        left: 50,
      },
    ],
    color: ["rgb(249,159,94)", "rgb(67,205,126)"],
    animation: true,
    series: [
      {
        type: "candlestick",
        name: "Daily",
        data: values,
        itemStyle: {
          normal: {
            color: "#FD1050",
            color0: "#0CF49B",
            borderColor: "#FD1050",
            borderColor0: "#0CF49B",
          },
        },
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Echarts
        option={option}
        height={170}
        width={340}
        //  handleMessage={handleMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleView: {
    height: Platform.OS == "ios" ? 20 : 44,
    paddingTop: Platform.OS == "ios" ? 0 : 0,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default StockChart;

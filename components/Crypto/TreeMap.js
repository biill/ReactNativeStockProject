import React, { Component } from "react";
import { StyleSheet, View, Platform } from "react-native";
import Echarts from "native-echarts";
import { useEffect, useState } from "react";
import axios from "axios";
const CryptoTreeMap = () => {
  const [cryptoData, setCryptoData] = useState(null);
  const fetchSector = async () => {
    try {
      const sectorRes = await axios.get(
        `https://www.alphavantage.co/query?function=SECTOR&apikey=demo`
      );
      setSectorData(sectorRes.data[`Rank B: 1 Day Performance`]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSector();
  }, []);
  const name = "Market Change by (%)";
  const sectors = Object.keys(sectorData);
  const performance = Object.values(sectorData).map((e) =>
    parseFloat(e).toFixed(2)
  );

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: [name],
      textStyle: {
        color: "white",
      },
    },
    grid: {
      left: "1%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: { color: "white" },
        },
        axisTick: { show: false },
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: { show: false },
        axisLine: {
          lineStyle: { color: "white" },
        },
        splitLine: { show: false, color: "black" },
        data: sectors,
      },
    ],
    series: [
      {
        name: name,
        type: "bar",
        label: {
          normal: {
            show: true,
            position: "inside",
          },
        },
        data: performance,
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Echarts option={option} height={450} width={330} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "black",
  },
  nameBlock: {
    flex: 1,
    paddingTop: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
  },
  details: {
    flex: 5,
    flexDirection: "column",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
  },
  detailsRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  detailsRowColumn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingRight: 5,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "white",
    marginTop: 20,
  },
  separatorThin: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A6A6A6",
  },
  propertyText: {
    fontSize: 12,
    color: "#A6A6A6",
    textAlign: "left",
  },
  valueText: {
    fontSize: 15,
    color: "white",
    textAlign: "right",
  },
  title: {
    paddingTop: 5,
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SectorChart;

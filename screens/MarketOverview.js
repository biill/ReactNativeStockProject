import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import axios from "axios";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { Header, Card, Divider } from "react-native-elements";
import StockChart from "../components/Home/StockChart";
import { convertStockData } from "./utils";
import { useState, useEffect } from "react";

export default function MarketOverview() {
  const [dowData, setDowData] = useState([]);
  const [nasdqaData, setNasdqaData] = useState([]);
  const [sp500Data, setSp500Data] = useState([]);
  const initialLoading = async () => {
    try {
      const dowRes = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/DIA/chart?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
      );
      const nasdqaRes = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/qqq/chart?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
      );

      const sp500Res = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/spy/chart?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
      );

      setDowData(dowRes.data);
      setNasdqaData(nasdqaRes.data);
      setSp500Data(sp500Res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initialLoading();
  }, []);
  return (
    <ScrollView style={{ backgroundColor: "black" }}>
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{
            text: "Financial InfoX",
            style: { color: "#fff" },
          }}
          rightComponent={{ icon: "home", color: "#fff" }}
          backgroundColor="black"
        />

        <Card
          title="Market Overall"
          titleStyle={{ textAlign: "center", color: "gold" }}
          containerStyle={{ backgroundColor: "black" }}
        >
          <View style={styles.user}>
            {dowData.length > 0 && (
              <StockChart name="DOW JONES INDEX" data={dowData} />
            )}
            <Divider style={{ backgroundColor: "gray", height: 0.5 }} />
            {nasdqaData.length > 0 && (
              <StockChart name="NASDAQ INDEX" data={nasdqaData} />
            )}
            <Divider style={{ backgroundColor: "gray", height: 0.5 }} />
            {sp500Data.length > 0 && (
              <StockChart name="S&P 500 INDEX" data={sp500Data} />
            )}
          </View>
        </Card>
        <View style={styles.separator} />
      </View>
    </ScrollView>
  );
}

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

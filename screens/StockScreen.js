import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";
import {
  Linking,
  TextInput,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  IndicatorViewPager,
  PagerDotIndicator,
} from "react-native-best-viewpager";
import Input from "../components/Stock/Input";
import Chart from "../components/Stock/Chart";
import InfoSlideOne from "../components/Stock/InfoSlideOne";
import InfoSlideTwo from "../components/Stock/InfoSlideTwo";
import InfoSlideThree from "../components/Stock/InfoSlideThree";

export default function StockScreen() {
  const [selectedStock, setSelectedStock] = useState({ data: [], info: null });
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <View style={styles.statusBar} />}
      <View style={styles.stocksBlock}>
        <Input
          setSelectedStock={setSelectedStock}
          selectedStock={selectedStock}
        />
        <Chart selectedStock={selectedStock} />
      </View>
      <View style={styles.detailedBlock}>
        <IndicatorViewPager
          style={{ flex: 1 }}
          indicator={<PagerDotIndicator pageCount={3} />}
        >
          <View>
            {selectedStock.info && <InfoSlideOne info={selectedStock.info} />}
          </View>
          <View>
            {selectedStock.info && <InfoSlideTwo info={selectedStock.info} />}
          </View>
          <View>
            {selectedStock.info && <InfoSlideThree info={selectedStock.info} />}
          </View>
        </IndicatorViewPager>
      </View>
      <View style={styles.footerBlock}>
        <TouchableHighlight
          style={styles.finance}
          onPress={() => console.log("will add press function")}
        >
          {/* underlayColor="#202020" */}
          <Text style={styles.financeText}>
            {selectedStock.info && selectedStock.info["symbol"]}
          </Text>
        </TouchableHighlight>

        <View style={styles.footerMiddle}>
          <Text style={styles.marketTimeText}>
            {selectedStock.info &&
              `BETA: ${parseFloat(selectedStock.info["beta"]).toFixed(2)}`}
          </Text>
        </View>
        <TouchableHighlight
          style={styles.settings}
          onPress={() => console.log("Need also something")}
          underlayColor="#202020"
        >
          <Icon name="menu" color="white" size={22} />
        </TouchableHighlight>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "black",
  },
  statusBar: {
    height: 10,
  },
  stocksBlock: {
    flexDirection: "column",
    marginBottom: 10,
    flex: 9,
  },
  detailedBlock: {
    flex: 5,
    backgroundColor: "#202020",
    justifyContent: "space-between",
  },
  footerBlock: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#202020",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  loadingText: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 40,
    marginBottom: 10,
    marginRight: 10,
    color: "white",
  },
  finance: {
    flex: 1,
  },
  financeText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  },
  footerMiddle: {
    flex: 1,
  },
  marketTimeText: {
    fontSize: 12,
    color: "#A6A6A6",
    textAlign: "center",
  },
  settings: {
    flex: 1,
    alignItems: "flex-end",
  },
  icon: {
    width: 20,
    height: 20,
  },
});

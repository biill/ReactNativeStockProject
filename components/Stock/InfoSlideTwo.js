import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function InfoSlideTwo({ info }) {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.detailsRow}>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>YIELD</Text>
            <Text style={styles.valueText}>
              {info["dividendYield"]
                ? parseFloat(info["dividendYield"]).toFixed(2)
                : "--"}
            </Text>
          </View>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>MKT CAP</Text>
            <Text style={styles.valueText}>
              {info["marketcap"]
                ? parseFloat(info["marketcap"] / 1000000000).toFixed(2)
                : "--"}{" "}
              B
            </Text>
          </View>
        </View>
        <View style={styles.separatorThin} />

        <View style={styles.detailsRow}>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>EPS(est.)</Text>
            <Text style={styles.valueText}>
              {info["ttmEPS"] ? parseFloat(info["ttmEPS"]).toFixed(2) : "--"}
            </Text>
          </View>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>PRICE TO SALE</Text>
            <Text style={styles.valueText}>
              {info["priceToSales"]
                ? parseFloat(info["priceToSales"]).toFixed(2)
                : "--"}
            </Text>
          </View>
        </View>
        <View style={styles.separatorThin} />

        <View style={styles.detailsRow}>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>PRICE TO BOOK</Text>
            <Text style={styles.valueText}>
              {info["priceToBook"]
                ? parseFloat(info["priceToBook"]).toFixed(2)
                : "--"}
            </Text>
          </View>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>PE RATIO</Text>
            <Text style={styles.valueText}>
              {info["peRatio"] ? parseFloat(info["peRatio"]).toFixed(2) : "--"}
            </Text>
          </View>
        </View>
        <View style={styles.separatorThin} />
      </View>
    </View>
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
});

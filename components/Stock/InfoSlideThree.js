import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function InfoSlideThree({ info }) {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View style={styles.detailsRow}>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>50 DAYS MA</Text>
            <Text style={styles.valueText}>
              {parseFloat(info["day50MovingAvg"]).toFixed(2) || "--"}
            </Text>
          </View>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>200 DAYS MA</Text>
            <Text style={styles.valueText}>
              {parseFloat(info["day200MovingAvg"]).toFixed(2) || "--"}
            </Text>
          </View>
        </View>
        <View style={styles.separatorThin} />

        <View style={styles.detailsRow}>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>5 DAYS CHANGE(%)</Text>
            <Text style={styles.valueText}>
              {parseFloat(info["day5ChangePercent"]).toFixed(2) || "--"}
            </Text>
          </View>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>30 DAYS CHANGE(%)</Text>
            <Text style={styles.valueText}>
              {parseFloat(info["day30ChangePercent"]).toFixed(2) || "--"}
            </Text>
          </View>
        </View>
        <View style={styles.separatorThin} />

        <View style={styles.detailsRow}>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>6 MONTH CHANGE(%)</Text>
            <Text style={styles.valueText}>
              {parseFloat(info["month6ChangePercent"]).toFixed(2) || "--"}
            </Text>
          </View>
          <View style={styles.detailsRowColumn}>
            <Text style={styles.propertyText}>1 YEAR CHANGE(%)</Text>
            <Text style={styles.valueText}>
              {parseFloat(info["year1ChangePercent"]).toFixed(2) || "--"}
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

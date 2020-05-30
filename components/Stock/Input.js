import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Button, Input } from "react-native-elements";
import axios from "axios";

export default function InputForm({ setSelectedStock, selectedStock }) {
  const [searchText, setSearchText] = useState("");

  const fetchStock = async () => {
    try {
      const res = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/${searchText}/chart/1y?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
      );
      const infoRes = await axios.get(
        `https://sandbox.iexapis.com/stable/stock/${searchText}/advanced-stats?token=Tsk_9b260400520a4d23abfe1ef6cb0d3feb`
      );
      setSelectedStock({
        data: res.data,
        info: { ...infoRes.data, symbol: searchText.toUpperCase() },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    searchText && (await fetchStock(searchText));
    setSearchText("");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        width: window.width,
        marginBottom: 5,
        padding: 4,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        borderColor: "#888, borderRadius:10",
        backgroundColor: "#4d2222",
        fontSize: 10,
      }}
    >
      <View style={{ flex: 4 }}>
        <TextInput
          onChangeText={(textEntry) => {
            setSearchText(textEntry);
          }}
          style={{ backgroundColor: "transparent" }}
          onSubmitEditing={() => handleSubmit()}
          color="white"
          placeholder="Please enter a symbol"
          placeholderTextColor="white"
          selectionColor="white"
          value={searchText}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Button
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 80,
            //   height: 20,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
          }}
          onPress={() => handleSubmit()}
          disabled={searchText === ""}
          title="Search"
        />
      </View>
    </View>
  );
}

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = { stocks: [] };
  }

  async componentDidMount() {
    const response = await axios.get(
      'https://api.iextrading.com/1.0/stock/market/sector-performance'
    );
    console.log(response.data);
    this.setState = { stocks: response.data };
  }
  render() {
    console.log(this.state.stocks);
    return (
      <View>
        <ScrollView
          ref={scrollView => {
            _scrollView = scrollView;
          }}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
        />
      </View>
    );
  }
}

export default Stock;

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { fetchStockBySector } from '../../stores/stockReducer';

class Stock extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStockBySector();
    setInterval(() => this.props.fetchStockBySector(), 5000);
    this.setState = { stocks: this.props.sectors };
  }

  render() {
    //if (this.props.isFetching) return <Text>Nothing</Text>;
    return (
      <View>
        <ScrollView
          ref={scrollView => {
            _scrollView = scrollView;
          }}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
        />
        {this.props.sectors.map((item, index) => {
          const date = new Date(item.lastUpdated);
          console.log(date, 'this is the data');
          return (
            <Text key={index}>
              {item.name}
              {parseFloat(item.performance).toFixed(3)} %
            </Text>
          );
        })}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  sectors: state.stockReducer.sectors,
  isFetching: state.stockReducer.isFetching
});

const mapDispatchToProps = dispatch => ({
  fetchStockBySector: () => dispatch(fetchStockBySector())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stock);

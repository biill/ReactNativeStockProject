import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchStockBySector } from '../../stores/stockReducer';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = { sectors: this.props.sectors };
  }

  componentDidMount() {
    fetchStockBySector();
    this.setState = { stocks: this.props.sectors };
  }
  render() {
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

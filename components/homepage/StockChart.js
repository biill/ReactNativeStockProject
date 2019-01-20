import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
import { fetchStock, initialLoading } from '../../stores/stockReducer';
import Loading from '../crypto/loading';
const { width } = Dimensions.get('window');

class StockChart extends Component {
  render() {
    if (this.props.data) {
      const indexData = this.props.data.slice(-30);
      const dates = indexData.map(function(item) {
        return item['date'];
      });

      const data = indexData.map(function(item) {
        return [+item['1. open'], +item['4. close'], +item['3. low'], +item['2. high']];
      });
      const name = this.props.name;
      const option = {
        backgroundColor: 'black',
        title: {
          show: true,
          text: name,
          textStyle: {
            fontSize: 15,
            align: 'center',
            lineHeight: 40,
            left: '40%'
          }
        },
        tooltip: {
          trigger: 'none',
          axisPointer: {
            animation: false,
            type: 'cross',
            lineStyle: {
              color: '#376df4',
              width: 2,
              opacity: 1
            }
          }
        },

        toolbox: {
          orient: 'vertical',
          show: true,
          showTitle: true
        },
        xAxis: [
          {
            type: 'category',
            data: dates,
            axisLine: { lineStyle: { color: 'white' } }
          }
        ],
        yAxis: [
          {
            scale: true,
            axisLine: {
              lineStyle: { color: 'white' }
            },
            splitLine: { show: false }
          }
        ],
        grid: [
          {
            top: 40,
            bottom: 40,
            left: 50
          }
        ],
        color: ['rgb(249,159,94)', 'rgb(67,205,126)'],
        animation: true,
        series: [
          {
            type: 'candlestick',
            name: 'Daily',
            data: data,
            itemStyle: {
              normal: {
                color: '#FD1050',
                color0: '#0CF49B',
                borderColor: '#FD1050',
                borderColor0: '#0CF49B'
              }
            }
          }
        ]
      };
      return (
        <View style={styles.container}>
          <Echarts option={option} height={170} width={340} handleMessage={this.handleMessage} />
        </View>
      );
    } else {
      return <Loading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  titleView: {
    height: Platform.OS == 'ios' ? 20 : 44,
    paddingTop: Platform.OS == 'ios' ? 0 : 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  selectedStock: state.stockReducer.selectedStock,
  isFetching: state.stockReducer.isFetching,
  indexes: state.stockReducer.stocks,
  cryptos: state.stockReducer.crypto
});

const mapDispatchToProps = dispatch => ({
  fetchStock: name => dispatch(fetchStock(name)),
  initialLoading: () => dispatch(initialLoading())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockChart);

import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
import { fetchStock } from '../../stores/stockReducer';

const { width } = Dimensions.get('window');

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.calculateMA = this.calculateMA.bind(this);
  }

  componentDidMount() {
    this.setState({ data: this.props.selectedStock.data });
  }

  componentWillReceiveProps() {
    this.setState({ data: this.props.selectedStock.data });
  }

  calculateMA = (dayCount, data) => {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
      if (i < dayCount) {
        result.push('-');
        continue;
      }
      var sum = 0;

      for (var j = 0; j < dayCount; j++) {
        sum += data[i - j][1];
      }
      result.push(sum / dayCount);
    }
    return result;
  };

  render() {
    const dates = this.state.data.map(function(item) {
      return item['date'];
    });

    const data = this.state.data.map(function(item) {
      return [+item['open'], +item['close'], +item['low'], +item['high']];
    });
    const option = {
      backgroundColor: 'black',
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
      legend: {
        data: ['MA5', 'MA10', 'MA20', 'MA30'],
        inactiveColor: '#777',
        textStyle: {
          color: '#fff'
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
          axisLine: { lineStyle: { color: '#F3F3F3' } }
        }
      ],
      yAxis: [
        {
          scale: true,
          axisLine: {
            lineStyle: { color: '#F3F3F3' }
          },
          splitLine: { show: false }
        }
      ],
      grid: [
        {
          left: '10%',
          right: '8%',
          height: '50%'
        },
        {
          left: '10%',
          right: '8%',
          bottom: '10%',
          height: '15%'
        }
      ],

      dataZoom: [
        {
          textStyle: {
            color: '#F3F3F3'
          },
          handleIcon:
            'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        },
        {
          type: 'inside'
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
        },
        {
          name: 'MA5',
          type: 'line',
          data: this.calculateMA(5, data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          }
        },
        {
          name: 'MA10',
          type: 'line',
          data: this.calculateMA(10, data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          }
        },
        {
          name: 'MA20',
          type: 'line',
          data: this.calculateMA(20, data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          }
        },
        {
          name: 'MA30',
          type: 'line',
          data: this.calculateMA(30, data),
          smooth: true,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          }
        }
      ]
    };
    const { info } = this.props.selectedStock;
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{info['companyName']}</Text>
        </View>

        <Echarts option={option} height={300} width={width} handleMessage={this.handleMessage} />
      </View>
    );
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
  isFetching: state.stockReducer.isFetching
});

const mapDispatchToProps = dispatch => ({
  fetchStock: name => dispatch(fetchStock(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);

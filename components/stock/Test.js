import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
import rawData from './rawData';
const { width } = Dimensions.get('window');

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: rawData
    };
    this.calculateMA = this.calculateMA.bind(this);
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
    const dates = rawData.map(function(item) {
      return item[0];
    });

    const data = rawData.map(function(item) {
      return [+item[1], +item[2], +item[5], +item[6]];
    });
    const option = {
      //点击某一个点的数据的时候，显示出悬浮窗
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
      //可以手动选择现实几个图标
      legend: {
        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
        inactiveColor: '#777',
        textStyle: {
          color: '#fff'
        }
      },
      //各种表格
      toolbox: {
        //改变icon的布局朝向
        orient: 'vertical',
        show: true,
        showTitle: true
        // feature: {
        //   //show是否显示表格，readOnly是否只读
        //   dataView: { show: true, readOnly: false },
        //   magicType: {
        //     //折线图  柱形图    总数统计 分开平铺
        //     type: ['line', 'bar', 'stack', 'tiled']
        //   }
        // }
      },
      xAxis: [
        {
          //就是一月份这个显示为一个线段，而不是数轴那种一个点点
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
      grid:
        // {
        //     bottom: 80
        //   },
        [
          {
            left: '10%',
            right: '8%',
            height: '50%'
          },
          {
            left: '10%',
            right: '8%',
            bottom: '20%',
            height: '15%'
          }
        ],

      // bottom volume chart
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
      //图形的颜色组
      color: ['rgb(249,159,94)', 'rgb(67,205,126)'],
      animation: true,
      //需要显示的图形名称，类型，以及数据设置
      series: [
        {
          type: 'candlestick',
          name: '日K',
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
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>Single Stock Chart</Text>
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
    height: Platform.OS == 'ios' ? 64 : 44,
    paddingTop: Platform.OS == 'ios' ? 14 : 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

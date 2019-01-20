import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
import { Header, Card, Divider } from 'react-native-elements';
import data from './data.json';
const { width } = Dimensions.get('window');

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data
    };
    this.convertData = this.convertData.bind(this);
    this.isValidNumber = this.isValidNumber.bind(this);
    this.linearMap = this.linearMap.bind(this);
  }

  convertData = originList => {
    var min = Infinity;
    var max = -Infinity;

    for (var i = 0; i < originList.length; i++) {
      var node = originList[i];
      if (node) {
        var value = node.value;
        value != null && value < min && (min = value);
        value != null && value > max && (max = value);
      }
    }

    for (var i = 0; i < originList.length; i++) {
      var node = originList[i];
      if (node) {
        var value = node.value;

        // Scale value for visual effect
        if (value != null && value > 0) {
          value = this.linearMap(value, [0, max], [40, 100], true);
        } else if (value != null && value < 0) {
          value = this.linearMap(value, [min, 0], [-100, -40], true);
        } else {
          value = 0;
        }

        if (!isFinite(value)) {
          value = 0;
        }

        if (node.children) {
          this.convertData(node.children);
        }
      }
    }
  };

  linearMap = (val, domain, range, clamp) => {
    var subDomain = domain[1] - domain[0];
    var subRange = range[1] - range[0];

    if (subDomain === 0) {
      return subRange === 0 ? range[0] : (range[0] + range[1]) / 2;
    }

    if (clamp) {
      if (subDomain > 0) {
        if (val <= domain[0]) {
          return range[0];
        } else if (val >= domain[1]) {
          return range[1];
        }
      } else {
        if (val >= domain[0]) {
          return range[0];
        } else if (val <= domain[1]) {
          return range[1];
        }
      }
    } else {
      if (val === domain[0]) {
        return range[0];
      }
      if (val === domain[1]) {
        return range[1];
      }
    }

    return ((val - domain[0]) / subDomain) * subRange + range[0];
  };

  isValidNumber = num => {
    return num != null && isFinite(num);
  };

  render() {
    const visualMin = -100;
    const visualMax = 100;
    const visualMinBound = -40;
    const visualMaxBound = 40;
    const option = {
      title: {
        left: 'center',
        text: 'Gradient Mapping',
        subtext: 'Growth > 0: green; Growth < 0: red; Growth = 0: grey'
      },
      tooltip: {
        formatter: function(info) {
          var change = info.value;
          change = this.isValidNumber(change) ? change.toFixed(2) + '%' : '-';

          return [
            '<div class="tooltip-title">' +
              echarts.format.encodeHTML(info.name) +
              echarts.format.encodeHTML(info.value) +
              '</div>'
          ].join('');
        }
      },
      series: [
        {
          name: 'ALL',
          top: 80,
          type: 'treemap',
          label: {
            show: true,
            formatter: '{b}',
            normal: {
              textStyle: {
                ellipsis: true
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: 'black'
            }
          },
          visualMin: visualMin,
          visualMax: visualMax,
          visualDimension: 0,
          roam: false,
          nodeClick: false,
          height: '60%',
          levels: [
            {
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: '#333',
                  gapWidth: 1
                }
              }
            },
            {
              color: ['#942e38', '#aaa', '#269f3c'],
              colorMappingBy: 'value',
              itemStyle: {
                normal: {
                  gapWidth: 1
                }
              }
            }
          ],
          data: data
        }
      ]
    };

    return (
      <ScrollView>
        <View style={styles.container}>
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Financial InfoX', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
            backgroundColor="black"
          />
          <View style={styles.titleView}>
            <Text style={styles.title}>Stock Name</Text>
          </View>

          <Echarts option={option} height={1200} width={width} />
        </View>
      </ScrollView>
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

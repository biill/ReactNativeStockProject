import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
import { Header, Card, Divider } from 'react-native-elements';
import data from './data.json';
const { width } = Dimensions.get('window');
class Chart extends Component {
  render() {
    console.log(this.props.crypto);
    const option = {
      title: {
        left: 'center',
        text: 'Crypto Currency Value Tree Map',
        subtext: 'Total Value Based on volume multiply current price',
        color: 'white'
      },
      tooltip: {
        formatter: '{b}: $ {c} Millions'
      },
      color: ['#E57373', '#BA68C8'],
      series: [
        {
          name: 'ALL',
          top: 60,
          type: 'treemap',
          label: {
            show: true,
            formatter: '{b}: $ {c} Millions',
            normal: {
              textStyle: {
                ellipsis: true
              }
            }
          },
          itemStyle: {
            normal: {
              borderWidth: 0.5,
              borderColor: 'black',
              gapWidth: 0.5
            }
          },
          visualDimension: 3,
          roam: false,
          nodeClick: false,
          levels: [
            {
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  borderColor: 'black',
                  gapWidth: 1
                }
              },
              color: ['#E57373', '#BA68C8']
            }
          ],
          colorSaturation: [0.3, 1],
          data: this.props.crypto
        }
      ]
    };

    return (
      <View style={styles.container}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Financial InfoX', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor="black"
        />
        <Echarts option={option} height={580} width={width} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  crypto: state.stockReducer.crypto,
  isFetching: state.stockReducer.isFetching
});

export default connect(
  mapStateToProps,
  null
)(Chart);

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

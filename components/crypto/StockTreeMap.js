import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Platform } from 'react-native';
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
import { Header } from 'react-native-elements';
const { width } = Dimensions.get('window');
class Chart extends Component {
  render() {
    const option = {
      title: {
        left: 'center',
        text: 'Crypto Currency Value Tree Map',
        subtext: 'Total Value Based on volume multiply current price',
        textStyle: {
          color: 'white'
        },
        subtextStyle: {
          color: 'white'
        }
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
              borderColor: 'white',
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
                  borderColor: 'white',
                  gapWidth: 1
                }
              },
              color: ['#269f3c', '#aaa']
              //colorMappingBy: 'value'
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
        <Echarts option={option} height={585} width={width} />
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
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'black'
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

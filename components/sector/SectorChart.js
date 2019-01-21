import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import Echarts from 'native-echarts';
import Dimensions from 'Dimensions';
import { fetchStock } from '../../stores/stockReducer';

class SectorChart extends Component {
  render() {
    const name = 'Market Change';
    const sector = this.props.sectors.map(e => e['name']);
    const performance = this.props.sectors.map(e => parseFloat(e['performance'] * 100).toFixed(2));
    // const data = [1.52, 2.03, 4.77, -4.1, -3.22, 0.11, 1.3, 1.5, -2.1, 2.4, 1.8];
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: [name],
        textStyle: {
          color: 'white'
        }
      },
      grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: { color: 'white' }
          },
          axisTick: { show: false }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          axisLine: {
            lineStyle: { color: 'white' }
          },
          splitLine: { show: false, color: 'black' },
          data: sector
        }
      ],
      series: [
        {
          name: name,
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: performance
        }
      ]
    };
    return (
      <View style={styles.container}>
        <Echarts option={option} height={450} width={330} handleMessage={this.handleMessage} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  sectors: state.stockReducer.sectors,
  isFetching: state.stockReducer.isFetching
});

const mapDispatchToProps = dispatch => ({
  fetchStockBySector: () => dispatch(fetchStock())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectorChart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'black'
  },
  nameBlock: {
    flex: 1,
    paddingTop: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white'
  },
  details: {
    flex: 5,
    flexDirection: 'column',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'white'
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10
  },
  detailsRowColumn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 5
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'white',
    marginTop: 20
  },
  separatorThin: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A6A6A6'
  },
  propertyText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'left'
  },
  valueText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'right'
  },
  title: {
    paddingTop: 5,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

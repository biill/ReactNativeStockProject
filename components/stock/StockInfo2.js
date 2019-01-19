import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { fetchStock } from '../../stores/stockReducer';

class StockInfo2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: {}
    };
  }

  render() {
    const { info } = this.props.selectedStock;
    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>YIELD</Text>
              <Text style={styles.valueText}>
                {parseFloat(info['dividendYield']).toFixed(2) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>MKT CAP</Text>
              <Text style={styles.valueText}>{info['marketcap'] || '--'}</Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>EPS(est.)</Text>
              <Text style={styles.valueText}>
                {parseFloat(info['consensusEPS']).toFixed(2) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>PRICE TO SALE</Text>
              <Text style={styles.valueText}>
                {parseFloat(info['priceToSales']).toFixed(2) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>PRICE TO BOOK</Text>
              <Text style={styles.valueText}>
                {parseFloat(info['priceToBook']).toFixed(2) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>RETURN ON EQUITY</Text>
              <Text style={styles.valueText}>
                {parseFloat(info['returnOnEquity']).toFixed(2) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />
        </View>
      </View>
    );
  }
}

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
    justifyContent: 'space-between'
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
    backgroundColor: 'white'
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
)(StockInfo2);

import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import { fetchStock } from '../../stores/stockReducer';

class StockInfo1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stock: {}
    };
  }

  render() {
    const { data, info } = this.props.selectedStock;
    return (
      <View style={styles.container}>
        {/* <View style={styles.nameBlock}>
          <Text style={styles.nameText}>
            {(this.props.watchlistResult &&
              this.props.watchlistResult[this.props.stock.symbol] &&
              this.props.watchlistResult[this.props.stock.symbol].Name) ||
              '--'}
          </Text>
        </View> */}
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>OPEN</Text>
              <Text style={styles.valueText}>
                {parseFloat(data.slice(-1)[0]['open']).toFixed(2) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>CLOSE</Text>
              <Text style={styles.valueText}>
                {parseFloat(data.slice(-1)[0]['close']).toFixed(2) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>HIGH</Text>
              <Text style={styles.valueText}>
                {parseFloat(data.slice(-1)[0]['high']).toFixed(2) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>52W HIGH</Text>
              <Text style={styles.valueText}>
                {parseFloat(info['week52high']).toFixed(2) || '--'}
              </Text>
            </View>
          </View>
          <View style={styles.separatorThin} />

          <View style={styles.detailsRow}>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>LOW</Text>
              <Text style={styles.valueText}>
                {parseFloat(data.slice(-1)[0]['low']).toFixed(2) || '--'}
              </Text>
            </View>
            <View style={styles.detailsRowColumn}>
              <Text style={styles.propertyText}>52W LOW</Text>
              <Text style={styles.valueText}>
                {parseFloat(info['week52low']).toFixed(2) || '--'}
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
)(StockInfo1);

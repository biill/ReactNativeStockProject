import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header, Card, Divider } from 'react-native-elements';
import { fetchStock, initialLoading } from '../../stores/stockReducer';
import Loading from '../crypto/loading';
import StockChart from './StockChart';
class StockHome extends React.Component {
  componentDidMount() {
    this.props.initialLoading();
  }

  render() {
    if (this.props.indexes.sp500.length > 0) {
      return (
        <ScrollView style={{ backgroundColor: 'black' }}>
          <View style={styles.container}>
            <Header
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'Financial InfoX', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
              backgroundColor="black"
            />

            <Card
              title="Market Overall"
              titleStyle={{ textAlign: 'center', color: 'gold' }}
              containerStyle={{ backgroundColor: 'black' }}
            >
              <View style={styles.user}>
                <StockChart name="DOW JONES INDEX" data={this.props.indexes.dow} />
                <Divider style={{ backgroundColor: 'gray', height: 0.5 }} />
                <StockChart name="NASDAQ INDEX" data={this.props.indexes.nasdqa} />
                <Divider style={{ backgroundColor: 'gray', height: 0.5 }} />
                <StockChart name="S&P 500 INDEX" data={this.props.indexes.sp500} />
              </View>
            </Card>
            <View style={styles.separator} />
          </View>
        </ScrollView>
      );
    } else {
      return <Loading />;
    }
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
)(StockHome);

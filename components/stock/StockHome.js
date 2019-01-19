import React from 'react';
import {
  Linking,
  ListView,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import Chart from './Chart';
import StockInfo1 from './StockInfo1';
import StockInfo2 from './StockInfo2';
import StockInfo3 from './StockInfo3';
import { fetchStock } from '../../stores/stockReducer';
import Loading from '../crypto/loading';

class StockHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchStock('aapl');
  }

  renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  render() {
    if (this.props.selectedStock.data.length > 0) {
      const { info } = this.props.selectedStock;
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <View style={styles.statusBar} />}
          <View style={styles.stocksBlock}>
            <Chart />
          </View>
          <View style={styles.detailedBlock}>
            <IndicatorViewPager style={{ flex: 1 }} indicator={this.renderDotIndicator()}>
              <View>
                <StockInfo1 />
              </View>
              <View>
                <StockInfo2 />
              </View>
              <View>
                <StockInfo3 />
              </View>
            </IndicatorViewPager>
          </View>
          <View style={styles.footerBlock}>
            <TouchableHighlight
              style={styles.finance}
              onPress={() => console.log('will add press function')}
            >
              {/* underlayColor="#202020" */}

              <Text style={styles.financeText}>{info['symbol']}</Text>
            </TouchableHighlight>

            <View style={styles.footerMiddle}>
              <Text style={styles.marketTimeText}>Market closed</Text>
            </View>
            <TouchableHighlight
              style={styles.settings}
              onPress={() => console.log('Need also something')}
              underlayColor="#202020"
            >
              <Icon name="menu" color="white" size={22} />
            </TouchableHighlight>
          </View>
        </View>
      );
    } else {
      return <Loading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black'
  },
  statusBar: {
    height: 20
  },
  stocksBlock: {
    flexDirection: 'column',
    flex: 9
  },
  detailedBlock: {
    flex: 5,
    backgroundColor: '#202020',
    justifyContent: 'space-between'
  },
  footerBlock: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#202020',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  loadingText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
    marginRight: 10,
    color: 'white'
  },
  finance: {
    flex: 1
  },
  financeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left'
  },
  footerMiddle: {
    flex: 1
  },
  marketTimeText: {
    fontSize: 12,
    color: '#A6A6A6',
    textAlign: 'center'
  },
  settings: {
    flex: 1,
    alignItems: 'flex-end'
  },
  icon: {
    width: 20,
    height: 20
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
)(StockHome);

import React from 'react';
import {
  Linking,
  ScrollView,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  View
} from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { Header, Card, Icon, Overlay } from 'react-native-elements';
import { fetchStock } from '../../stores/stockReducer';
import Loading from '../crypto/loading';
import StockChart from './StockChart';
import StockTreeMap from './StockTreeMap';
const APIKEY = 'XUKO1LP3IY0YZRJ6';
class StockHome extends React.Component {
  componentDidMount() {
    // this.props.fetchStock('aapl');
  }

  render() {
    if (true) {
      return (
        <ScrollView style={{ backgroundColor: 'black' }}>
          <View style={styles.container}>
            <Header
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'Financial InfoX', style: { color: '#fff' } }}
              rightComponent={{ icon: 'home', color: '#fff' }}
              backgroundColor="black"
            />

            <Card title="Stock" titleStyle={{ textAlign: 'left' }}>
              <View style={styles.user}>
                <StockChart />
              </View>
            </Card>
            <View style={styles.separator} />
            <Card title="Bitcoin" titleStyle={{ textAlign: 'left' }}>
              <View style={styles.user}>
                <StockChart />
              </View>
            </Card>
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

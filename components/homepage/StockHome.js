import React from 'react';
import {
  Linking,
  ListView,
  Platform,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  RefreshControl
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

export default class StockHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [1, 2, 3, 4, 5, 5, 6] };
  }

  componentDidMount() {}

  renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }

  render() {
    console.log(this.state.dataSource);
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <View style={styles.statusBar} />}
        <View style={styles.stocksBlock}>
          {/* <ListView
            key={this.state.key}
            dataSource={this.state.dataSource}
            renderRow={stock => (
              //   <StockCell stock={stock} watchlistResult={this.state.watchlistResult} />
              <Text>Individual Stock {stock} </Text>
            )}
          /> */}
        </View>
        <View style={styles.detailedBlock}>
          <IndicatorViewPager style={{ flex: 1 }} indicator={this.renderDotIndicator()}>
            <View>
              <Text>Render Detail</Text>
            </View>
            <View>
              <Text>Stock</Text>
            </View>
            <View>
              <Text>Reserved</Text>
            </View>
          </IndicatorViewPager>
        </View>
        <View style={styles.footerBlock}>
          <TouchableHighlight
            style={styles.yahoo}
            onPress={() => console.log('will add press function')}
          >
            {/* underlayColor="#202020" */}

            <Text style={styles.yahooText}>Yahoo!</Text>
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
  yahoo: {
    flex: 1
  },
  yahooText: {
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

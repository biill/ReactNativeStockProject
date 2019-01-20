import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header, Card, Divider } from 'react-native-elements';
import { fetchStock } from '../../stores/stockReducer';
import Loading from '../crypto/loading';
import SectorChart from './SectorChart';

class StockHome extends React.Component {
  componentDidMount() {
    this.props.fetchStockBySector();
  }

  render() {
    // if (this.props.sectors > 0) {
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
            title="Market Change by Sector"
            titleStyle={{ textAlign: 'center', color: 'gold' }}
            containerStyle={{ backgroundColor: 'black' }}
          >
            <View style={styles.user}>
              <SectorChart />
            </View>
          </Card>
          <View style={styles.separator} />
        </View>
      </ScrollView>
    );
    // } else {
    //   return <Loading />;
    // }
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
  isFetching: state.stockReducer.isFetching,
  indexes: state.stockReducer.stocks,
  cryptos: state.stockReducer.crypto,
  sectors: state.stockReducer.sectors
});

const mapDispatchToProps = dispatch => ({
  fetchStockBySector: () => dispatch(fetchStock())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StockHome);

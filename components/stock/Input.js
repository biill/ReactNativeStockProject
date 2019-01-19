import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import { fetchStock } from '../../stores/stockReducer';
class Input extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStock();
    // setInterval(() => this.props.fetchStockBySector(), 5000);
    // this.setState = { stocks: this.props.sectors };
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: window.width,
          margin: 10,
          padding: 4,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 4,
          borderColor: '#888, borderRadius:10',
          backgroundColor: '#fff'
        }}
      >
        <View style={{ flex: 4 }}>
          <TextInput
            onChangeText={textEntry => {
              this.setState({ searchText: textEntry });
            }}
            style={{ backgroundColor: 'transparent' }}
            onSubmitEditing={() => {
              this.onSubmit(this.state.searchText);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            onPress={() => this.onSubmit(this.state.searchText)}
            title="Search"
            color="white"
            backgroundColor="#841584"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  sectors: state.stockReducer.sectors,
  isFetching: state.stockReducer.isFetching
});

const mapDispatchToProps = dispatch => ({
  fetchStock: () => dispatch(fetchStock())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input);

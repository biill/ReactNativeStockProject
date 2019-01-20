import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { fetchStock } from '../../stores/stockReducer';
class InputForm extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.handelSubmit = this.handelSubmit.bind(this);
  }

  handelSubmit = () => {
    this.props.fetchStock(this.state.text);
    this.setState({ text: '' });
  };
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: window.width,
          marginBottom: 5,
          padding: 4,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 4,
          borderColor: '#888, borderRadius:10',
          backgroundColor: '#4d2222',
          fontSize: 10
        }}
      >
        <View style={{ flex: 4 }}>
          <TextInput
            onChangeText={textEntry => {
              this.setState({ text: textEntry });
            }}
            style={{ backgroundColor: 'transparent' }}
            onSubmitEditing={() => {
              this.onSubmit(this.state.text);
            }}
            color="white"
            placeholder="Please enter a symbol"
            placeholderTextColor="white"
            selectionColor="white"
            value={this.state.text}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            buttonStyle={{
              backgroundColor: 'rgba(92, 99,216, 1)',
              width: 80,
              //   height: 20,
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 5
            }}
            onPress={() => this.handelSubmit()}
            disabled={this.state.text === ''}
            title="Search"
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
  fetchStock: symbol => dispatch(fetchStock(symbol))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);

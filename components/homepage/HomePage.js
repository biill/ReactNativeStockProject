import React from 'react';
import { ScrollView, View } from 'react-native';

export default class HomePage extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <ScrollView>
          <View>Hello world!</View>
        </ScrollView>
      </View>
    );
  }
}

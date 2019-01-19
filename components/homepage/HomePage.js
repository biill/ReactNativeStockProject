import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Carousel } from '@ant-design/react-native';
export default class BasicCarouselExample extends React.Component {
  onHorizontalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('horizontal change to', index);
  }
  onVerticalSelectedIndexChange(index) {
    /* tslint:disable: no-console */
    console.log('vertical change to', index);
  }
  render() {
    return (
      <View style={{ marginTop: 30 }}>
        <View style={{ paddingHorizontal: 15 }}>
          <Text>vertical</Text>
          <Carousel
            style={styles.wrapper}
            selectedIndex={2}
            infinite
            afterChange={this.onVerticalSelectedIndexChange}
            vertical
          >
            <View style={[styles.containerVertical, { backgroundColor: 'red' }]}>
              <Text style={[styles.containerVertical, { backgroundColor: 'red' }]} />
            </View>
            <View style={[styles.containerVertical, { backgroundColor: 'blue' }]}>
              <Text>Carousel 2</Text>
            </View>
            <View style={[styles.containerVertical, { backgroundColor: 'yellow' }]}>
              <Text>Carousel 3</Text>
            </View>
            <View style={[styles.containerVertical, { backgroundColor: 'aqua' }]}>
              <Text>Carousel 4</Text>
            </View>
            <View style={[styles.containerVertical, { backgroundColor: 'fuchsia' }]}>
              <Text>Carousel 5</Text>
            </View>
          </Carousel>
          <Text>Use the height of the first child as the height of the Carousel</Text>
          <Text>{React.Children.count(this.props.children)}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff'
  },
  containerVertical: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100
  },
  text: {
    color: '#fff',
    fontSize: 36
  }
});

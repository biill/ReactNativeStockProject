import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import HomePage from '../components/homepage/HomePage';
import StockHome from '../components/stock/StockHome';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Crypto from '../components/crypto/StockTreeMap';
import SectorHome from '../components/sector/SectorHome';

const HomeStack = createStackNavigator({
  Home: HomePage
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Overview',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />
};

const StocksStack = createStackNavigator({
  Links: StockHome
});

StocksStack.navigationOptions = {
  tabBarLabel: 'Stock',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-stats" />
};

const LinksStack = createStackNavigator({
  Links: SectorHome
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Sector',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-podium" />
};

const CryptoStack = createStackNavigator({
  Settings: Crypto
});

CryptoStack.navigationOptions = {
  tabBarLabel: 'Crypto',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  )
};

// const TestStack = createStackNavigator({
//   Settings: Test
// });

// TestStack.navigationOptions = {
//   tabBarLabel: 'Test',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//   )
// };

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  StocksStack,
  CryptoStack
  // TestStack
});

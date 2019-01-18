import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Stock from '../components/stock/Stock';
import HomePage from '../components/homepage/HomePage';
import StockHome from '../components/homepage/StockHome';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomePage
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />
};

const StocksStack = createStackNavigator({
  Links: StockHome
});

StocksStack.navigationOptions = {
  tabBarLabel: 'StockHome',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-stats" />
};

const LinksStack = createStackNavigator({
  Links: Stock
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Stock',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-podium" />
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Crypto',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  StocksStack,
  LinksStack,
  SettingsStack
});

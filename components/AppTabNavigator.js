import React, { Component } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ExchangeScreen from './screens/ExchangeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require('../assets/home.png')} />,
            tabBarLabel: "Home"
        }
    },
    ExchangeScreen: {
        screen: ExchangeScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require('../assets/exchange.png')} />,
            tabBarLabel: "Exchange"
        }
    }
})

const AppContainer = createAppContainer(AppTabNavigator);
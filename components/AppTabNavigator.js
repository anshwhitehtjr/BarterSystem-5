import React from 'react';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExchangeScreen from '../screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: <Image style={{ width: 20, height: 20 }} 
            source={require("../assets/HomeScreen.png")} 
            />,
            tabBarLabel: "Home"
        }
    },
    BookRequest: {
        screen: ExchangeScreen,
        navigationOptions: {
            tabBarIcon: <Image style={{ width: 20, height: 20 }} source={require("../assets/exchange.png")} />,
            tabBarLabel: "Exchange"
        }
    }
})

import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignUpLogin from './screens/SignUpLoginScreen';
import { AppTabNavigator } from './components/AppTabNavigator';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return (

      <AppContainer />

    )
  }
}

const switchNavigator = createSwitchNavigator({
  SignUpLogin: {
    screen: SignUpLogin
  },
  BottomTab: {
    screen: AppTabNavigator
  }
})

const AppContainer = createAppContainer(switchNavigator)
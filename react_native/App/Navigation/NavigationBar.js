import React from 'react'
import { StyleSheet, Navigator } from 'react-native'
import NavigationBarRouteMapper from './NavigationBarRouteMapper'
import { Colors } from '../Themes'

const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: Colors.background
  }
});

export default {
  render () {
    return (
      <Navigator.NavigationBar
        navigationStyles={Navigator.NavigationBar.StylesIOS}
        routeMapper={NavigationBarRouteMapper}
        style={styles.navigationBar}
      />
    )
  }
}

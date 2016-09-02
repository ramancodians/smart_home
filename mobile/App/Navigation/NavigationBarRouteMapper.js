import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NavButtons from './NavButtons'
import { Fonts, Metrics, Colors } from '../Themes'

const styles = StyleSheet.create({
  titleWrapper: {
    flex: 1,
    padding: Metrics.baseMargin,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navTitle: {
    color: Colors.snow,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.bold,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  navSubtitle: {
    flex: 1,
    color: Colors.snow,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.base,
    alignSelf: 'center'
  }
});

export default {
  CreateButton (buttonId, navigator) {
    switch (buttonId) {
      case 'BACK':
        return NavButtons.backButton(this.BackButton.bind(this, navigator))
      case 'HAMBURGER':
        return NavButtons.hamburgerButton(navigator.state.tapHamburger)
      default:
        return (<Text>Needs Button</Text>)
    }
  },

  BackButton (navigator) {
    if (navigator.state.activeGesture === null && navigator.state.pendingGestureProgress === null) {
      navigator.pop()
    }
  },

  LeftButton (route, navigator, index, navState) {
    if (navState.leftButton) {
      return navState.leftButton
    } else if (route.leftButton) {
      return this.CreateButton(route.leftButton, navigator)
    }
    return null
  },

  RightButton (route, navigator, index, navState) {
    if (navState.rightButton) {
      return navState.rightButton
    } else if (route.rightButton) {
      return this.CreateButton(route.rightButton, navigator)
    }
  },

  renderSubtitle (sub, routeSub) {
    if (sub) {
      return (
        <View>
          <Text allowFontScaling={false} style={styles.navSubtitle}>
            {sub || routeSub}
          </Text>
        </View>
      )
    }
  },

  Title (route, navigator, index, navState) {
    return (
      <View style={styles.titleWrapper}>
        <Text allowFontScaling={false} style={styles.navTitle}>
          {navState.title || route.title}
        </Text>
        {this.renderSubtitle(navState.subtitle, route.subtitle)}
      </View>
    )
  }
}

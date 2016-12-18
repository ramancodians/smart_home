import React from 'react'
import { Transitions } from '../Themes/'

export default {
  renderScene (route, navigator) {
    return React.createElement(route.component, {
      navigator: navigator
    })
  },
  configureScene (route) {
    return route.customConfiguration || Transitions.default
  }
}

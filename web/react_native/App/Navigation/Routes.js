import { Transitions } from '../Themes/'
import I18n from '../I18n/I18n.js'

export default new class Routes {
  get PresentationScreen () {
    return {
      title: I18n.t('welcome'),
      component: require('../Containers/PresentationScreen').default,
      leftButton: 'HAMBURGER'
    }
  }
  get ClientScreen () {
    return {
      title: I18n.t('client'),
      component: require('../Containers/ClientScreen').default,
      //customConfiguration: Transitions.modal,
      //rightButton: 'HAMBURGER',
      leftButton: 'BACK'
    }
  }
  get EspConfigScreen () {
    return {
      title: I18n.t('config'),
      component: require('../Containers/EspConfigScreen').default,
      leftButton: 'BACK'
    }
  }
  get EspInitScreen () {
    return {
      title: I18n.t('init'),
      component: require('../Containers/EspInitScreen').default,
      leftButton: 'BACK'
    }
  }
}

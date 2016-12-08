import React from 'react'
import { StyleSheet, View, Text, Navigator, StatusBar } from 'react-native'
import {Router, Routes, NavigationBar} from './Navigation/'
import configureStore from './Store/Store'
import { Provider } from 'react-redux'
import Drawer from 'react-native-drawer'
import DebugSettings from './Config/DebugSettings'
import { Colors } from './Themes/'
import { initMqtt } from 'react_native_mqtt';
import { storage } from './Config/MqttSettings';

const styles = StyleSheet.create({
  applicationView: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background
  }
});

const store = configureStore();

export default class RNBase extends React.Component {

  componentWillMount () {
    initMqtt(storage);
  }

  componentDidMount () {
    this.navigator.drawer = this.drawer
  }

  renderDrawerContent () {
    return (
      <View style={{marginTop: 30, padding: 10}}>
        <Text style={{color: 'white'}}>
          Nothing here yet...
        </Text>
      </View>
    )
  }

  renderApp () {
    console.disableYellowBox = !DebugSettings.yellowBox
    return (
      <Provider store={store}>
        <View style={styles.applicationView}>
          <StatusBar
            barStyle='light-content'
          />

          <Drawer
            ref={(ref) => { this.drawer = ref }}
            content={this.renderDrawerContent()}
            styles={{
              drawer: {
                shadowColor: '#000000',
                shadowOpacity: 0.8,
                shadowRadius: 3,
                backgroundColor: Colors.background
              }
            }}
            openDrawerOffset={100}
            type='static'
            tapToClose
          >
            <Navigator
              ref={(ref) => { this.navigator = ref }}
              initialRoute={Routes.PresentationScreen}
              configureScene={Router.configureScene}
              renderScene={Router.renderScene}
              navigationBar={NavigationBar.render()}
              style={styles.container}
            />
          </Drawer>
        </View>
      </Provider>
    )
  }

  render () {
    return this.renderApp()
  }
}

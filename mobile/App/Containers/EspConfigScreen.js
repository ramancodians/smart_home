import React, { PropTypes } from 'react'
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity, Image, AsyncStorage, ListView } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import Routes from '../Navigation/Routes'
import { Colors, Images, Metrics, Fonts, ApplicationStyles } from '../Themes'
import Button from '../Components/Button'
import LabeledTextView from '../Components/LabeledTextView'
import { stateChangeHandler } from '../Lib/Util';
import I18n from '../I18n/I18n.js'

const styles = StyleSheet.create({
  ...ApplicationStyles.screen
});

class EspConfigScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func,
    attempting: PropTypes.bool
  }

  constructor (props) {
    super(props);

    this.state = {
      ip: '192.168.10.101',
      ssid: 'Giggity',
      pass: '**********',
      title: 'reed',
      zone: 'living_room',
      spec: 'window'
    }

    this.handlePressSubmit = this.handlePressSubmit.bind(this);
    this.changeHandler = stateChangeHandler.bind(this);
  }

  componentDidMount() {
  }

  handlePressSubmit () {
    const {dispatch} = this.props
    const {ip, ssid, pass, title, zone, spec} = this.state;
    dispatch(Actions.submitConfig({ip, ssid, pass, title, zone, spec}));
  }

  renderTextView(name) {
    return (
      <LabeledTextView
        header={I18n.t(name)}
        onChange={this.changeHandler(name)}
        text={this.state[name]}
      />
    );
  }

  render () {
    //use this.state.attempting to modify view

    return (
      <View style={styles.trans}>
        <Image source={Images.background} style={styles.backgroundImage} />
        <ScrollView style={styles.container}>
          {this.renderTextView('ip')}
          {this.renderTextView('ssid')}
          {this.renderTextView('pass')}
          {this.renderTextView('title')}
          {this.renderTextView('zone')}
          {this.renderTextView('spec')}
          <Button
            onPress={this.handlePressSubmit}
            text={'Submit'}
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    attempting: state.config.attempting
  }
}

export default connect(mapStateToProps)(EspConfigScreen)

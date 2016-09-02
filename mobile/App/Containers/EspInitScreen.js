import React, { PropTypes } from 'react'
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import Actions from '../Actions/Creators'
import { Colors, Images, Metrics, ApplicationStyles } from '../Themes'
import Button from '../Components/Button'
import LabeledTextView from '../Components/LabeledTextView'
import I18n from '../I18n/I18n.js'
import { stateChangeHandler, generateArrayOfVal } from '../Lib/Util';
import Picker from 'react-native-picker';

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  componentLabelContainer: {
    ...ApplicationStyles.darkLabelContainer,
    marginVertical: Metrics.baseMargin
  },
  componentLabel: {
    ...ApplicationStyles.darkLabel
  }
});

const PIN_MODES = ['INPUT', 'OUTPUT', 'INPUT_PULLUP', 'DISABLED'];
const DISABLED_INDEX = PIN_MODES.indexOf('DISABLED');
const LEFT_PINS = ['RESET', 'ADC', 'CHPD', 'IO-16', 'IO-14', 'IO-12', 'IO-13', 'VCC'];
const RIGHT_PINS = ['TXD', 'RXD', 'IO-5', 'IO-4', 'IO-0', 'IO-2', 'IO-15', 'GND'];
const VALID_PINS = ['IO-16', 'IO-14', 'IO-12', 'IO-13', 'IO-5', 'IO-4', 'IO-0', 'IO-2', 'IO-15'];

class EspInitScreen extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  }

  constructor (props) {
    super(props);
    this.state = {
      id: 'reed/living_room/window',
      ip: '192.168.10.101',
      sleep: '-1',
      pins: generateArrayOfVal(VALID_PINS.length, DISABLED_INDEX),
      selected: 0
    }

    this.handlePressSubmit = this.handlePressSubmit.bind(this);
    this.handlePressReset = this.handlePressReset.bind(this);
    this.renderPin = this.renderPin.bind(this);
    this.changeHandler = stateChangeHandler.bind(this);
  }

  componentDidMount() {
  }

  handlePressSubmit () {
    const { dispatch } = this.props;
    const { id, ip, sleep, pins } = this.state;
    let payload = {sleep, pins: pins.join("")};
    dispatch(Actions.mqttConnectAndPublish(ip, id + '/registration', JSON.stringify(payload)));
  }

  handlePressReset () {
    const { dispatch } = this.props;
    const { id, ip } = this.state;
    dispatch(Actions.mqttConnectAndPublish(ip, id + '/reset', ""));
  }

  renderPin(pin, i) {
    var pindex = VALID_PINS.indexOf(pin);
    var valid = (pindex != -1);
    var text = pin;
    var colorStyle;
    if(valid) {
      let value = this.state.pins[pindex];
      colorStyle = styles.orange;
      if(value !== DISABLED_INDEX) {
        text += ' [' + value + ']';
        colorStyle = styles.blue;
      }
    }

    return (
      <Button
        buttonStyle={[styles.small, colorStyle]}
        key={pin + i}
        onPress={() => {
          if(valid) {
            this.setState({selected:pindex});
            this.pinPicker.toggle();
          }
        }}
        text={text}
      />
    );
  }

  renderHeader(title) {
    return (
      <View style={styles.componentLabelContainer}>
        <Text style={styles.componentLabel}>{title}</Text>
      </View>
    )
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
    const { pins, selected } = this.state;

    return (
      <View style={styles.trans}>
        <Image source={Images.background} style={styles.backgroundImage} />

        <ScrollView style={styles.container}>

          {this.renderTextView('id')}
          {this.renderTextView('ip')}
          {this.renderTextView('sleep')}

          {this.renderHeader(I18n.t('pins'))}
          <View style={styles.fullSection} >
            <View style={styles.row}>
              <View style={styles.col}>
                {LEFT_PINS.map(this.renderPin)}
              </View>
              <View style={styles.center}>
                <Image source={Images.esp_12} style={styles.stretchedImage} />
              </View>
              <View style={styles.col}>
                {RIGHT_PINS.map((pin, i) => {
                  return this.renderPin(pin, i + LEFT_PINS.length);
                })}
              </View>
            </View>
          </View>

          {this.renderHeader('Event Loop [TODO]')}
          {this.renderHeader('Subscriptions [TODO]')}
          {this.renderHeader('Finalize')}
          <Button
            onPress={this.handlePressSubmit}
            text={'SUBMIT'}
          />
          <Button
            onPress={this.handlePressReset}
            text={'RESET'}
          />
        </ScrollView>
        <Picker
          ref={(picker) => this.pinPicker = picker}
          style={{height: 320}}
          pickerData={PIN_MODES}
          selectedValue={PIN_MODES[0]}
          onPickerDone={(picked) => {
            pins[selected] = PIN_MODES.indexOf(picked[0]);
            this.setState({ pins })
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(EspInitScreen)

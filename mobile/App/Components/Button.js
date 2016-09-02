import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Colors, Metrics, Fonts } from '../Themes/'

const styles = StyleSheet.create({
  text: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  },
  button: {
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    justifyContent: 'center',
    backgroundColor: Colors.fire,
    height: 45
  }
});

var Button = function(props, context) {
  return (
    <TouchableOpacity
      style={[styles.button, props.buttonStyle]}
      onPress={props.onPress}
    >
      <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  text: React.PropTypes.string,
  onPress: React.PropTypes.func,
  buttonStyle: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.array]),
  textStyle: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.array])
}

Button.defaultProps = {
  text: 'Gimme Text!'
}

module.exports = Button;

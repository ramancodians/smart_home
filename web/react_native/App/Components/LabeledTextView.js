import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { Colors } from '../Themes/'

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    color: Colors.fire
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  rowLabel: {
    color: Colors.snow
  },
});


var LabeledTextView = function(props, conext) {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, props.labelStyle]}>{props.header}</Text>
      <TextInput
        style={[styles.textInput, props.textStyle]}
        value={props.text}
        keyboardType='default'
        returnKeyType='next'
        onChangeText={props.onChange}
        underlineColorAndroid='transparent'
      />
    </View>
  )
}

LabeledTextView.propTypes = {
  header: React.PropTypes.string,
  onChange: React.PropTypes.func,
  text: React.PropTypes.string,
  labelStyle: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.array]),
  textStyle: React.PropTypes.oneOf([React.PropTypes.number, React.PropTypes.array])
}

LabeledTextView.defaultProps = {
  header: "Gimme Header!",
  text: "Gimme Text!"
}

module.exports = LabeledTextView;

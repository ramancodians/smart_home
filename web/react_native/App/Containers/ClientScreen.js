import React, { PropTypes } from 'react'
import { StyleSheet, ScrollView, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'

import I18n from '../I18n/I18n.js'


const styles = StyleSheet.create({
});

class ClientScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired,
    dispatch: PropTypes.func

  }
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }


  render () {
    return (
      <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch'>
        <ScrollView style={styles.container}>
          <View>
          </View>
        </ScrollView>
      </Image>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(ClientScreen)

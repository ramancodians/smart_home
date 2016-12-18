import React, {PropTypes} from 'react'
import { StyleSheet, ScrollView, Text, Image, View } from 'react-native'
import { Images, Metrics, ApplicationStyles } from '../Themes'
import { connect } from 'react-redux'
import Routes from '../Navigation/Routes'
import Button from '../Components/Button'
import I18n from '../I18n/I18n.js'
import ImageSpinner from 'react_native_image_spinner'

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  }
});

class PresentationScreen extends React.Component {

  static propTypes = {
    navigator: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
    }
  }

  componentWillMount () {
    this.props.navigator.state.tapHamburger = () => {
      this.props.navigator.drawer.toggle()
    }
  }

  componentDidMount() {
  }

  navigate(destination) {
    return () => {
      this.props.navigator.push(destination);
    };
  }

  render() {
    return (
      <View style={styles.trans}>
        <Image ref='root' source={Images.background} style={styles.backgroundImage} />
        <ScrollView style={styles.container}>

          <ImageSpinner
            im_0={Images.webcam}
            im_1={Images.battery}
            im_2={Images.bonsai}
            im_3={Images.hospital}
            im_4={Images.light_bulb}
            im_5={Images.microphone}
            im_6={Images.smartphone}
            im_7={Images.temperature}
            back={Images.house}
          />

          <Button
            onPress={this.navigate(Routes.ClientScreen)}
            text={'MQTT CLIENT (TODO)'}
          />
          <Button
            onPress={this.navigate(Routes.EspConfigScreen)}
            text={'CONFIGURE ESP8266 (HTTP)'}
          />
          <Button
            onPress={this.navigate(Routes.EspInitScreen)}
            text={'INIT ESP8266 (MQTT)'}
          />
          <View style={styles.section} >
            <Text style={styles.baseText} >
              Icons designed by Madebyoliver from Flaticon
            </Text>
            <Text style={styles.baseText} >
              Icons designed by Freepik from Flaticon
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(PresentationScreen)

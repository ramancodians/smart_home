import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'

const ApplicationStyles = {
  screen: {
    backgroundImage: {
      width: Metrics.screenWidth,
      position: 'absolute', top:0, left:0,
      marginTop: Metrics.navBarHeight
    },
    stretchedImage: {
      resizeMode: 'stretch'
    },
    trans: {
      flex: 1,
      backgroundColor: 'transparent'
    },
    container: {
      flex: 1,
      marginTop: Metrics.navBarHeight
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent'
    },
    col: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'transparent'
    },
    center: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
      borderTopColor: Colors.frost,
      borderTopWidth: 0.5,
      borderBottomColor: Colors.frost,
      borderBottomWidth: 1
    },
    fullSection: {
      padding: Metrics.baseMargin,
      borderTopColor: 'transparent',
      borderTopWidth: 0.5,
      borderBottomColor: 'transparent',
      borderBottomWidth: 1
    },
    baseText:{
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center',
      fontFamily: Fonts.type.bold
    },
    subtitle: {
      color: Colors.snow,
      padding: 5,
      marginBottom: 5,
      marginHorizontal: Metrics.smallMargin
    },
    small: {
      height: 20,
      marginVertical: Metrics.smallMargin,
    },
    medium: {
      height: 40,
      marginVertical: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin,
      paddingVertical: 10,
      paddingHorizontal: 15
    },
    orange: {
      backgroundColor: Colors.bloodOrange
    },
    blue: {
      backgroundColor: Colors.blue
    }
  },
  darkLabelContainer: {
    backgroundColor: Colors.cloud,
    padding: 5
  },
  darkLabel: {
    fontFamily: Fonts.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}

export default ApplicationStyles

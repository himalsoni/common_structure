import { StyleSheet, Dimensions, Platform } from "react-native";
import { Styles, Device } from "@common";

const { width, height } = Dimensions.get('window');
export default styles = StyleSheet.create({
  container:{
    flex: 1,
    // backgroundColor: '#d62d2d',
  },
  flex1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageEditContainer:
  {
    position:'absolute',
    bottom:8,
    right:8,
    // backgroundColor:'red'
  },
  editProfileIcon: {
    borderRadius: 9,
  },
  topBar: {
    // marginTop:70,
    ...Platform.select({
      ios: {
        marginTop: Device.isIphoneX ? 70 : Styles.width > 320 ? 45 : 45,
      },
      android: {
        marginTop: Styles.width > 360 ? 50 : 50,
      },
    }),

  },
  logoContainer: {
    // backgroundColor:'orange',
    height:(height*259/812)/2,
        ...Platform.select({
          ios: {
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
                },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
          },
          android: {
            elevation: 7
          }
      })
  },
  logo: {
    borderRadius: 100,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerTextContainer:{
    // backgroundColor:'pink',
    // marginTop:110,
    alignItems:"center",
    ...Platform.select({
      ios: {
        marginTop: Device.isIphoneX ? 110 : Styles.width > 320 ? 100 : 100,
      },
      android: {
        marginTop: Styles.width > 360 ? 100 : 100,
      },
    }),
    marginBottom:15,
  },
  headerText:{
    fontSize:15,
    color:"#fff",
    fontFamily: "SFProText-Regular",
    textTransform:'uppercase',
  },
  headerSubText:{
    fontSize:22,
    color:"#fff",
    fontFamily: "GTPressuraMono-Bold",
    textTransform:'uppercase',
    marginTop:8,
    letterSpacing:2,
  },
  body: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: height >= 812 || width >= 812 ? 100 : 76,
    bottom: height >= 812 || width >= 812 ? 0 : 0,
    flexDirection: "column",
  },
});

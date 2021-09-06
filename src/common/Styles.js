/**
 * Created by InspireUI on 20/12/2016.
 *
 * @format
 */

import { Dimensions, Platform, I18nManager } from "react-native";

import Constants from "./Constants";
import Device from "./Device";
import Color from "./Color";
let t = require('tcomb-form-native');

const stylesheet = t.form.Form.stylesheet;
stylesheet.textbox.normal.color = Color.inputBoxText;
stylesheet.textbox.normal.borderWidth = 0.5;
stylesheet.textbox.normal.height = 45;
stylesheet.textbox.normal.fontSize = 14;
stylesheet.textbox.normal.borderColor = Color.inputBoxBorder;
stylesheet.textbox.normal.placeholderTextColor = Color.inputBoxPlaceholder;
stylesheet.textbox.error.borderWidth = 0.5;
stylesheet.textbox.error.height = 45;
stylesheet.textbox.error.fontSize = 14;


const { height, width } = Dimensions.get("window");

const Styles = {
  width: Dimensions.get("window").width,
  height: Platform.OS !== "ios" ? height : height - 20,
  navBarHeight: Platform !== "ios" ? height - width : 0,
  headerHeight: Platform.OS === "ios" ? 40 : 56,
  mainHeaderHeight : Platform.OS === "ios" ? 50 : 56,

  loginLogoWrapperStyle:{
    alignItems:'center',
  },
  logoImageStyle: {
    width: width * 0.7,
    height:100,
  },
  loginLogoTextStyle:{
    fontWeight: "500",
    color: Color.primary,
    fontSize:25,
    fontFamily: "SFProText-Regular",
  },
  inputBoxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: '#27536c',
    borderWidth: 0.5,
    borderRadius:3,
    marginTop:10,
    paddingHorizontal:8,
    width: width * 0.8,
  },
  inputBoxStyle : {
    flex: 1,
    color: '#27536c',
    height: 40,
    marginTop: 10,
    paddingBottom: 8,
    textAlign: I18nManager.isRTL ? "right" : "left",
    fontSize:14,
    fontFamily: "SFProText-Regular"
  },
  commonBtnStyle : {
    marginTop: 30,
    backgroundColor: Color.commonBtn,
    borderRadius: 5,
    elevation: 1,
    height:50,
    width:150,
    fontSize:20,
    alignItems:'center',
    justifyContent:'center',
  },
  commonBtnTextStyle: {
    fontWeight: "900",
    color: Color.white,
    fontSize:18,
    fontFamily: "GTPressuraMono-Bold",
    textTransform:'uppercase'
  },

};

export default Styles;

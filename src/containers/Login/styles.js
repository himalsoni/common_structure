import { StyleSheet } from "react-native";
import { Color, Styles } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor:'white'
  },
  mainView:{
    flex:1,
    alignItems:'center',
    paddingTop:100,
    // width:'85%'
  },
  logoWrap: Styles.loginLogoWrapperStyle,
  logo: Styles.logoImageStyle,
  logoText:Styles.loginLogoTextStyle,
  subContain: {
    flex:1,
    marginTop:50,
  },
  loginForm: {
    alignItems:'center',
  },

  inputWrap: Styles.inputBoxWrapper,
  input:Styles.inputBoxStyle,
  loginBtn: Styles.commonBtnStyle,
  loginBtnText:Styles.commonBtnTextStyle,

  orTextWrapper:{
    marginVertical:8,
  },
  orText:{
    color: '#27546d',
    fontSize:14,
    fontFamily: "SFProText-Regular"
  },
  forgotPwdBtn:{
    marginTop:16,
    padding:1,
    marginBottom:100,
    borderColor: Color.primary,
    borderBottomWidth: 0.5,
  },
  forgotPwdText:{
    color: '#27546d',
    fontSize:14,
    fontFamily: "SFProText-Regular"
  },
  signupBtn:{
    padding:1,
    borderColor: Color.primary,
    borderBottomWidth: 0.5,
    marginVertical:10,
  },
  signupText:{
    color: '#27546d',
    fontSize:14,
    fontFamily: "SFProText-Regular"
  }
});

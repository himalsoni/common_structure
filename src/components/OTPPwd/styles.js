import { StyleSheet } from "react-native";
import { Color, Styles } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  mainView:{
    flex:1,
    // width:'85%',
    marginTop:50,
  },
  logoWrap: Styles.loginLogoWrapperStyle,
  logoText:Styles.loginLogoTextStyle,
  formView: {
    marginTop:50,
  },
  otpWrapper:{
    borderRadius:10,
    borderColor:Color.inputBoxText,
    borderWidth:1,
    borderBottomWidth:1,
    color:'#27536c',
  },
  pwdView:{
    alignItems:'center',
  },
  inputWrap: Styles.inputBoxWrapper,
  input:Styles.inputBoxStyle,
  continueBtn: Styles.commonBtnStyle,
  continueBtnText:Styles.commonBtnTextStyle,
  resendOTPBtn:{
    marginTop:20,
    alignItems:'center',
  },
  resendOTPWrap:{
    borderColor: '#27536c',
    borderBottomWidth: 1,
  },
  resendOTPText:{
    fontSize:15,
    color:'#27536c'
  },
});

import { StyleSheet } from "react-native";
import { Color, Styles } from "@common";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  scrollView:{
    flex:1,
  },
  mainView:{
    flex:1,
    paddingHorizontal:'8%',
    justifyContent:'center',
    marginBottom:50
  },
  logoWrap: Styles.loginLogoWrapperStyle,
  logo: Styles.logoImageStyle,
  logoText:Styles.loginLogoTextStyle,
  formView: {
    marginTop:50,
  },
  continueBtnWrapper:{
    alignItems:'center',
  },
  continueBtn: Styles.commonBtnStyle,
  continueBtnText:Styles.commonBtnTextStyle,
  acceptTermsPolicyView:{
    marginTop:35,
    alignItems:'center',
  },
  termsWrapper:{
    flexDirection:'row',
    alignItems:'center',
    // backgroundColor:'red',
    paddingHorizontal:30,
    marginTop:8
  },
  checkboxIcon:{
    height:25,
    width:25,
  },
  acceptText:{
    color: Color.black,
    fontSize:14,
    fontFamily: "SFProText-Regular"
    // marginLeft:10,
  },
  termsBtn:{
    borderColor: Color.primary,
    borderBottomWidth: 1,
    // marginLeft:8,
  },
  termsText:{
    color: Color.primary,
    fontSize:14,
    fontFamily: "SFProText-Regular"
  },
  policyBtn:{
    borderColor: Color.primary,
    borderBottomWidth: 1,
  },
  policyText:{
    color: Color.primary,
    fontSize:14,
    fontFamily: "SFProText-Regular"
  },
});

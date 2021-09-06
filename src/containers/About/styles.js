import { StyleSheet } from "react-native";
import { Color } from "@common";

export default StyleSheet.create({
  mainContainer:{
    flexDirection:'row',
    height:70,
    borderBottomColor: '#e9e9e9',
    alignItems:'center',
  },
  icon: {
    width:25,
    height:30,
    tintColor:Color.primary,
    marginLeft:16,
  },
  textContainer: {
    flexDirection:'column',
    marginLeft:16,
  },
  mainText: {
    color: '#27546d',
    fontSize: 15,
    textAlign: 'left',
    fontFamily: "SFProText-Regular",
  },
  subText:{
    color: '#27546d',
    fontSize: 15,
    marginTop:4,
    fontFamily: "GTPressuraMono-Bold",

  },

});

import { StyleSheet } from "react-native";

export default StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:"#fff",
    borderColor:'#27546d',
    borderTopWidth:1,
  },
  profileContainer:{
    flexDirection:"row",
    paddingHorizontal:16,
    paddingVertical:8,
    marginBottom:10,
  },
  photoContainer:{
    width:80,
    height:80,
    borderRadius:50,
  },
  profilePic:{
    width:80,
    height:80,
    borderRadius:50,
  },
  profileDetailContainer:{
    paddingVertical:10,
    paddingHorizontal:10,
  },
  nameContainer:{

  },
  nameText:{
    fontSize:18,
    color:'#2e6da0',
    fontFamily: "GTPressuraMono-Bold",
  },
  docDetailConatiner:{

  },
  docIDContainer:{
    flexDirection:"row",
    marginTop:4,
  },
  docID:{
    fontSize:14,
    color:'#000',
    fontFamily: "SFProText-Regular",
  },
  docIDVal:{
    fontSize:14,
    color:'#27546d',
    fontFamily: "SFProText-Regular",
  },
  clinicIDContainer:{
    flexDirection:"row",
  },
  clinicID:{
    fontSize:14,
    color:'#000',
    fontFamily: "SFProText-Regular",
  },
  clinicIDVal:{
    fontSize:14,
    color:'#27546d',
    fontFamily: "SFProText-Regular",
  },

  btnMainContainer:{
    flexDirection:"row",
    height:70,
    borderColor:'#27546d',
    borderTopWidth:0.4,
    borderBottomWidth:0.4,
  },
  btnIconContainer:{
    flex:0.1,
    justifyContent:"center",
    paddingLeft:16,
  },
  btnIcon:{
    width:30,
    height:30,
    tintColor:"#27546d",
  },
  btnNameContainer:{
    flex:0.8,
    justifyContent:"center",
    paddingHorizontal:8,
  },
  btnNameText:{
    fontSize:16,
    color:'#27546d',
    fontFamily: "SFProText-Bold",
  },
  btnArrowContainer:{
    flex:0.1,
    paddingRight:4,
    justifyContent:"center",
  },
  arrowIcon:{
    width:25,
    height:25,
    tintColor:"#27546d",
  },
  btnTopBorder:{
    borderColor:'#27546d',
    borderTopWidth:0.4,
  },
  btnBottomBorder:{
    borderColor:'#27546d',
    borderBottomWidth:0.4,
  },
});

import { StyleSheet, Dimensions } from "react-native";
import { Device } from '@common';
const { height, width } = Dimensions.get("window");

const videoplayerHeight = '35%', titleContainer = '10%', descContainer='30%', timerContainer='25%';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF',
  },
  videoPlayerContainer:{
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height:videoplayerHeight,
    backgroundColor:'#000',
  },
  videoPlayer:{
    flex:1,
    // justifyContent:'center'
  },
  closeVideoBtnContainer:{
    position:'absolute',
    right:20,
    top:Device.isIphoneX ? 50 : 35,
  },
  closeIcon:{
    width:20,
    height:20,
    tintColor:'#fff'
  },

  topBlankContainer:{
    height:videoplayerHeight,
  },
  detailContainer:{
    flex:1,
    // backgroundColor:"pink"
  },
  titleContainer:{
    // height:titleContainer,
    flex: height > 650 ? 0.15 : 0.2,
    backgroundColor:'#c3e7fb',
    paddingHorizontal:16,
    paddingVertical:10,
    justifyContent:"center"
  },
  titleMainText:{
    fontSize:25,
    color:'#2e6da0',
    fontFamily: "GTPressuraMono-Bold",
  },
  titleSubText:{
    fontSize:15,
    color:'#27546d',
    fontFamily: "GTPressuraMono-Bold",
    marginTop:6,
  },

  descContainer:{
    // height:descContainer,
    flex:0.45,
    paddingHorizontal:16,
    paddingVertical:14,
  },
  descText:{
    fontSize:14,
    color:'#000',
    fontFamily: "SFProText-Regular",
  },
  seeMoreContainer:{

  },
  seeMoreText:{
    fontSize:14,
    color:'#1779c9',
    fontFamily: "SFProText-Bold",
    textTransform:'uppercase',
  },

  timerContainer:{
    // height:timerContainer,
    flex:0.4,
    alignItems:'center',
    // backgroundColor:"pink",
    marginBottom:8,
  },
  timerTextContainer:{

  },
  timerText:{
    fontSize:35,
    color:'#27546d',
    fontFamily: "GTPressuraMono-Bold",
    textTransform:'uppercase',
  },
  timerBtnContainer:{
    flexDirection:'row',
    alignItems:"center",
    marginTop:8,
  },
  sideBtnContainer:{
    padding:10,
  },
  sideIcon:{
    width:45,
    height:45,
    tintColor:'#ffc500'
  },
  playPauseBtnContainer:{
    paddingHorizontal:10,
  },
  playPlauseIcon:{
    width:65,
    height:65,
    tintColor:'#ffc500'
  },

});

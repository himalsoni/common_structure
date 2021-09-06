import React, { Component } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { Images, Color } from '@common';
import { WebView } from 'react-native-webview';

export default class CommanWebview extends Component {

  constructor(props){
    super(props);
  }

  onCancel(){
    this.props.navigation.goBack();
  }

  render() {
    const { navigation, route } = this.props;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerWrapper}>
            <View style={styles.leftHeaderContainer} />
            <View style={styles.centerHeaderContainer}>
                <Text style={styles.headerTitleStyle}>{route.params.title}</Text>
            </View>
            <View style={styles.rightHeaderContainer}>
              <TouchableOpacity onPress={() => this.onCancel()} style={{}}>
                  <Image source={Images.close} style={styles.closeIcon} resizeMode={'contain'}/>
              </TouchableOpacity>
            </View>
        </View>
        <WebView
          startInLoadingState
          source={{ uri: route.params.url }}
          style={styles.container}
        />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    backgroundColor:'white',
  },
  headerWrapper:{
    flexDirection:'row',
    paddingHorizontal:20,
    paddingTop:10,
    paddingBottom:20,
    borderBottomWidth:1,
    borderBottomColor:'#e3e3e3'
  },
  leftHeaderContainer:{
    flex:0.1,
  },
  centerHeaderContainer:{
    flex:0.8,
    justifyContent:'center',
    alignItems:'center',
  },
  headerTitleStyle:{
    color: Color.primary,
    fontSize: 20,
    fontWeight:'500',
    textAlign: "center",
    alignSelf:'center',
  },
  rightHeaderContainer:{
    flex:0.1,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  closeIcon:{
    width:20,
    height:20,
    tintColor:Color.primary,
  },
  container: {
    flex:1,
    // width:'100%',
    // height:'100%',
  },
});

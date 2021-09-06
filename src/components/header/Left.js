import React, { PureComponent } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Images, Color } from "@common";

export default class Left extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  onPress(){
    if(this.props.isDrwaer){
      this.props.navigation.openDrawer();
    }else{
      this.props.navigation.goBack();
    }
  }
  render() {
    const { isDrwaer, drwaerIconColor } = this.props;
    return (
      <TouchableOpacity onPress={() => this.onPress()} style={{}}>
          <Image source={isDrwaer ? Images.menu : Images.back} style={[styles.backIcon,{tintColor:drwaerIconColor ? drwaerIconColor : Color.primary}]} resizeMode={'contain'}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  backIcon: {
    height: 20,
    width: 20,
    tintColor:'#454545',
    // backgroundColor:'pink',
    marginLeft:16,
  },
});

import React, { PureComponent } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Images } from "@common";
import { Shimmer } from "@components";

export default class PatientExerciseCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPress, item, isFetching } = this.props;
    return (
      <Shimmer style={styles.listContainerShimmer} visible={!isFetching}>
        <TouchableOpacity style={styles.listContainer} onPress={onPress} activeOpacity={0.8}>
          <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{item.duration.split(" ")[0]}</Text>
              <Text style={styles.unitText}>{item.duration.split(" ")[1]}</Text>
          </View>
          <View style={styles.divider}/>
          <View style={styles.detailContainer}>
              <Text style={styles.descText}>{item.name}</Text>
              <Text style={styles.daysText}>{item.excercise_on_day}</Text>
          </View>
          <View style={styles.iconContainer}>
              <Image source={Images.next} style={styles.icon} resizeMode={"contain"}/>
          </View>
        </TouchableOpacity>
      </Shimmer>
    );
  }
}

const styles = StyleSheet.create({
  listContainerShimmer:{
    width:'90%',
    height:70,
    marginHorizontal:20,
    marginTop:16,
  },
  listContainer:{
    flexDirection:'row',
    marginHorizontal:20,
    marginTop:16,
    borderWidth:0,
    borderRadius:3,
    paddingVertical:8,
    backgroundColor:"#dee4ea"
  },
  timeContainer:{
    flex:0.2,
    justifyContent:'center',
    alignItems:'center',
  },
  timeText:{
    fontSize:25,
    fontFamily: "GTPressuraMono-Bold",
    color:"#27546d",
  },
  unitText:{
    fontSize:16,
    textTransform:'uppercase',
    color:"#27546d",
    fontFamily: "GTPressuraMono-Bold",
    letterSpacing:2,
  },
  divider:{
    width:0.5,
    backgroundColor:"#27536c",
    marginRight:14,
  },
  detailContainer:{
    flex:0.75,
    justifyContent:'center',
  },
  descText:{
    fontSize:16,
    color:'#2e6da0',
    fontWeight:'600',
    fontFamily: "GTPressuraMono-Bold",
    textTransform:'uppercase',
  },
  daysText:{
    fontSize:12,
    marginTop:4,
    color:'#2e6da0',
    fontFamily: "SFProText-Bold",
    textTransform:'uppercase',
  },
  iconContainer:{
    flex:0.1,
    justifyContent:'center',
    alignItems:'center',
    paddingRight:8,
  },
  icon:{
    width:20,
    height:25,
    tintColor:"#27536c",
  },
});

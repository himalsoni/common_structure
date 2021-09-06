import React, { PureComponent } from "react";
import { View, Image, TouchableOpacity, Text, ScrollView, StatusBar, Dimensions } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import { toast, log } from "@common/Tools";
import { Images, Languages, Device } from '@common';
import Orientation from 'react-native-orientation';
import Video from 'react-native-af-video-player'
const { height, width } = Dimensions.get("window");

let textSize = 450;
if(height < 600){
  textSize = 300;
}else if(height > 600 && height < 700){
  textSize = 350;
}

class ExerciseDetail extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      showFullText: false,
      isTimerStart : false,
      excerciseTimerText: '00:00:00',
      totalSeconds:0,
      selectedIndex: this.props.route.params.index,
      exerciseData: this.props.listData.home.list[this.props.route.params.index],
      previousDisable:false,
      nextDisable:false,
      showCloseIcon:true,
    }
  }
  componentDidMount(){
    Orientation.lockToPortrait();
    let indexCount = this.state.selectedIndex;
    if(indexCount == 0){
      this.setState({previousDisable : true});
    }else if(indexCount == this.props.listData.home.list.length){
      this.setState({nextDisable : true});
    }
  }
  componentWillUnMount(){
    this._unsubscribe();
  }

  onCloseClick = () => {
    this.props.navigation.goBack();
    Orientation.lockToPortrait();
  }
  onSeeMoreClick = () => {
    this.setState({showFullText : !this.state.showFullText});
  }

  onPreviousClick = () => {
    let indexCount = this.state.selectedIndex;
    if(indexCount > 0){
      this.setExerciseData(indexCount-1);
      this.setState({nextDisable: false});
    }
    if(indexCount - 1 == 0){
      this.setState({previousDisable: true});
    }
  }
  onNextClick = () => {
    let indexCount = this.state.selectedIndex + 1;
    if(indexCount < this.props.listData.home.list.length){
      this.setExerciseData(indexCount);
      this.setState({previousDisable: false });
    }
    if(indexCount + 1 == this.props.listData.home.list.length){
      this.setState({nextDisable: true});
    }
  }
  setExerciseData(index){
    let temp = this.props.listData.home.list[index];
    this.setState({exerciseData : temp, selectedIndex: index, excerciseTimerText: '00:00:00', totalSeconds:0, isTimerStart : false});
    clearInterval(this.excerciseTimer);
  }

  pad(val){
    return val > 9 ? val : "0" + val;
  }
  startTimer(){
    var totalSeconds = this.state.totalSeconds;
    this.excerciseTimer = setInterval(() => {

      ++totalSeconds;
      var hours = this.pad(Math.floor(totalSeconds /3600));
      var minutes = this.pad(Math.floor((totalSeconds - hours*3600)/60));
      var seconds = this.pad(totalSeconds - (hours*3600 + minutes*60));

      this.setState({excerciseTimerText : hours + ":" + minutes + ":" + seconds, totalSeconds:totalSeconds})
    }, 1000);
  }
  onPlayPauseClick = () => {
    if(this.state.isTimerStart){
      clearInterval(this.excerciseTimer);
      this.setState({isTimerStart : false});
    }else{
      this.startTimer();
      this.setState({isTimerStart : true});
    }
  }

  onFullScreen = (e) => {
    if(e){
      this.setState({showCloseIcon : false});
    }else{
      this.setState({showCloseIcon : true});
      Orientation.lockToPortrait();
    }
  }

  render() {
    const { exerciseData, showFullText, isTimerStart, excerciseTimerText,
      previousDisable, nextDisable, showCloseIcon } = this.state;

    return (
      <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

        <View style={styles.topBlankContainer}/>
        <View style={styles.detailContainer}>
        {/*title container*/}
        <View style={styles.titleContainer}>
            <Text style={styles.titleMainText}>{exerciseData.name}</Text>
            <Text style={styles.titleSubText}>{exerciseData.duration + " - " + exerciseData.excercise_on_day}</Text>
        </View>
        {/*description container*/}
        <View style={styles.descContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.descText}>{
                showFullText ? exerciseData.description : exerciseData.description.slice(0, textSize)
              }</Text>
            </ScrollView>
            {exerciseData.description.length > textSize &&
              <TouchableOpacity style={styles.seeMoreContainer} onPress={this.onSeeMoreClick}>
                  <Text style={styles.seeMoreText}>{showFullText ? Languages.ShowLess : Languages.ShowMore}</Text>
              </TouchableOpacity>
            }
        </View>
        {/*timer container*/}
        <View style={styles.timerContainer}>
            <View style={styles.timerTextContainer}>
                <Text style={styles.timerText}>{excerciseTimerText}</Text>
            </View>
            <View style={styles.timerBtnContainer}>
                <TouchableOpacity style={styles.sideBtnContainer} onPress={this.onPreviousClick} disabled={previousDisable}>
                    <Image source={Images.previous_round} style={[styles.sideIcon,{tintColor: previousDisable ? '#fcdb6a' : '#ffc500'}]} resizeMode={'contain'}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.playPauseBtnContainer} onPress={this.onPlayPauseClick}>
                    <Image source={isTimerStart ? Images.pause : Images.play} style={styles.playPlauseIcon} resizeMode={'contain'}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sideBtnContainer} onPress={this.onNextClick} disabled={nextDisable}>
                    <Image source={Images.next_round} style={[styles.sideIcon,{tintColor: nextDisable ? '#fcdb6a' : '#ffc500'}]} resizeMode={'contain'}/>
                </TouchableOpacity>
            </View>
        </View>
        </View>

        {/*vide player container*/}
        <View style={styles.videoPlayerContainer}>
            <View style={[styles.videoPlayer,{paddingTop: Device.isIphoneX && showCloseIcon ? 40 : 0}]}>
              <Video url={exerciseData.excercise_url}
                onFullScreen={this.onFullScreen}
                rotateToFullScreen
              />
            </View>
        </View>
        {showCloseIcon &&
          <TouchableOpacity style={styles.closeVideoBtnContainer} onPress={this.onCloseClick}>
              <Image source={Images.close} style={styles.closeIcon} resizeMode={'contain'}/>
          </TouchableOpacity>
        }
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  // log('listData listData')
  // log(state.allList)
  return {
    isConnected: state.netInfo.isConnected,
    user: state.user.result,
    listData : state.allList,
  };
};

export default (connect(mapStateToProps,undefined,null)(ExerciseDetail));

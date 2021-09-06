import React from "react";
import styles from "./styles";
import { Images, Languages } from "@common";
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from "react-native";
import { SimpleFlatlist } from '@components';
import { connect } from "react-redux";

const { width, height } = Dimensions.get('window');
const imageWH=(height*100)/812;
const imageMin=(height*18)/812;

class ParallaxScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
    }
  }

  opacityCalculate = () => {
    const { scrollY } = this.state;
    // 0 means View invisible, 1 means Visible. Here, scroll value is 60 at that time 0 value is set to opcity  .
    let opacity = scrollY.interpolate({
        inputRange: [0, 60],
        outputRange: [1, 0],
        extrapolate: "clamp",
        useNativeDriver: true
    });
    return opacity;
  };
  opacityEditCalculate= () => {
    const { scrollY } = this.state;
    // 0 means View invisible, 1 means Visible. Here, scroll value is 60 at that time 0 value is set to opacity  .
    let opacity = scrollY.interpolate({
        inputRange: [0, 20],
        outputRange: [1, 0],
        extrapolate: "clamp",
        useNativeDriver: true
    });
    return opacity;
  };
  _getImageLocation = (w, h) => {
    const { scrollY } = this.state;
    // 75 indicates scroll value. Image margin top is 13 inside fix header part.
    let scroll = scrollY.interpolate({
        inputRange: [0,150],
        outputRange: [75,0],
        extrapolate: "clamp",
        useNativeDriver: true
    });
    return scroll;
  };
  _getImageWidth = () => {
    // Image min height is 34,max is imageWH
    const { scrollY } = this.state;
    let w = scrollY.interpolate({
        inputRange: [0,50,150],
        outputRange: [imageWH,50,34],
        extrapolate: "clamp",
        useNativeDriver: true
    });
    return w;
  };
  _getImageHeight = () => {
    const { scrollY } = this.state;
    // image 30% smaller and fix inside header part. Here,scroll value is 75.
    let h = scrollY.interpolate({
        inputRange: [0,50,150],
        outputRange: [imageWH,50,34],
        extrapolate: "clamp",
        useNativeDriver: true
    });
    return h;
  };
  _getEditImageWidth= () => {
    const { scrollY } = this.state;
    let w = scrollY.interpolate({
        inputRange: [0, 25],
        outputRange: [imageMin, 0],
        extrapolate: "clamp",
        useNativeDriver: true
    });
    return w;
  };
  _getEditImageHeight = () => {
    const { scrollY } = this.state;
    // image 30% smaller and fix inside header part. Here,scroll value is 75.
    let h = scrollY.interpolate({
        inputRange: [0, 25],
        outputRange: [imageMin, 0],
        extrapolate: "clamp",
        useNativeDriver: true
    });
    return h;
  };

  render() {
    const { list, user } = this.props;
    const opacityVal = this.opacityCalculate();
    const profileImageWidth = this._getImageWidth();
    const profileImageHeight = this._getImageHeight();
    const editImageWidth=this._getEditImageWidth();
    const editImageHeight=this._getEditImageHeight();
    const opacityValEdit=this.opacityEditCalculate();
    const translateY = this._getImageLocation(profileImageWidth, profileImageHeight);
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View style={styles.flex1} />
                <View style={styles.flex1}>
                    <Animated.View style={[styles.logoContainer, {
                                        top: translateY,
                                        width: profileImageWidth,
                                        height: profileImageHeight, }]}>
                           <Image defaultSource={Images.user} source={{uri : user.image}} style={styles.logo} resizeMode={'contain'}/>
                           {/*<AnimatedTouchable style={[styles.imageEditContainer,{opacity:opacityValEdit}]} onPress={() => {}}>
                                 <Animated.Image source={Images.close} style={[styles.editProfileIcon,{
                                                       width: editImageWidth,
                                                       height: editImageHeight,
                                                       opacity: opacityValEdit }]} />
                           </AnimatedTouchable>*/}
                    </Animated.View>
                </View>
                <View style={styles.flex1} />
            </View>

            <View style={styles.body}>
                    <Animated.ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow:1 }}
                        alwaysBounceVertical={false}
                        bounces={false}
                        scrollEventThrottle={16}
                        onScroll={Animated.event([
                            {
                                nativeEvent: { contentOffset: { y: this.state.scrollY } }
                            }
                        ])}>
                        <View style={{flex:1}}>
                            <Animated.View style={[styles.headerTextContainer, { opacity: opacityVal }]}>
                                <Text style={styles.headerText}>{Languages.Welcome +" " + user.name + "!"}</Text>
                                <Text style={styles.headerSubText}>{Languages.YourDailyExercise}</Text>
                            </Animated.View>
                            <View>
                            {this.props.children}
                            </View>
                        </View>
                    </Animated.ScrollView>
            </View>
        </View>
      );
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.result,
  };
};

export default (connect(mapStateToProps,undefined,null)(ParallaxScroll));

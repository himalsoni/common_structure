import React, { Component } from "react";
import { Animated } from 'react-native';

export default class Fade extends Component {

  constructor(props){
    super(props);
		this.state = {
      remove:false,
      first:true,
    }
  }

  componentWillMount() {
    this._visibility = new Animated.Value(this.props.visible ? 1 : 0);
    this.duration = 600;
  }
  startAnimate(nextProps){
    Animated.timing(this._visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: this.duration,
    }).start();
    if(nextProps.remove && !this.state.remove){
      setTimeout(()=>{
        this.setState({remove:true});
      },this.duration)
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.duration){
      this.duration = nextProps.duration;
    }
    if(nextProps.delay && nextProps.delay>0){
      setTimeout(()=>{
        this.startAnimate(nextProps);
      },nextProps.delay);
    } else {
      this.startAnimate(nextProps);
    }
    if(!nextProps.remove && this.state.remove){
      this.setState({remove:false,first:false});
    }
  }

  render() {
    const { visible, style, children, ...rest } = this.props;
    const containerStyle = {
      opacity: this._visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this._visibility.interpolate({
            inputRange: [0, 1],
            outputRange: this.props.outputRange || [0.9, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle,style];
    if(this.state.remove || (this.state.first && this.props.remove)){
      return (null);
    }
    return (
      <Animated.View style={combinedStyle} {...rest}>
        {children}
       </Animated.View>
    );
  }
}

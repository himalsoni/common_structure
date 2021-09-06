import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class RecorderScreen extends Component {

  constructor(props) {
		super(props);
		this.state = {
		};
	}

  componentDidMount(){
  }
  render(){
    return (
      <View style={styles.mainView}>
          <Text style={styles.text}>{"Recorder Screen"}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    color:'#000',
    fontSize:18,
  },
  btnWrapper:{
    marginTop:10,
    width:150,
    height:50,
    backgroundColor:'#2A2E43',
    justifyContent:'center',
    alignItems:'center',
  },
  btnText:{
    fontSize:18,
    color:'#fff',
  },
});

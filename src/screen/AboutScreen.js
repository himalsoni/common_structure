import React, {Component} from 'react';
import { View } from 'react-native';
import { About } from '@containers'

export default class AboutScreen extends Component {

  constructor(props) {
		super(props);
	}

  render(){
    const { navigation } = this.props;
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <About navigation={navigation} />
      </View>
    );
  }
}
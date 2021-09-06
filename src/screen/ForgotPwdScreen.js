import React, {Component} from 'react';
import { View } from 'react-native';
import { ForgotPwd } from '@containers'

export default class ForgotPwdScreen extends Component {
  constructor(props) {
		super(props);
	}

  render(){
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <ForgotPwd
          navigation={this.props.navigation}
          route={this.props.route}
        />
      </View>
    );
  }
}

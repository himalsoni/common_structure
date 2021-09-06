import React, {Component} from 'react';
import { View } from 'react-native';
import { RegisterOTP } from '@containers'

export default class RegisterOTPScreen extends Component {
  constructor(props) {
		super(props);
	}

  render(){
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <RegisterOTP
          navigation={this.props.navigation}
          route={this.props.route}
          onHomeScreen={() => this.props.navigation.navigate('DrawerStackNavigator', { screen: 'HomeScreen' })}
        />
      </View>
    );
  }
}

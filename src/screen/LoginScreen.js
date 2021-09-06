import React, {Component} from 'react';
import { View } from 'react-native';
import { Login } from '@containers'

export default class LoginScreen extends Component {

  constructor(props) {
		super(props);
	}

  render(){
    const { navigation } = this.props;
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <Login
            navigation={navigation}
            onPatientRegister={() => navigation.navigate("PatientRegisterScreen")}
            onPractitionerRegister={() => navigation.navigate("PractitionerRegisterScreen")}
            onForgotPwd={() => navigation.navigate("ForgotPwdScreen")}
            onHomeScreen={() => navigation.navigate('DrawerStackNavigator', { screen: 'HomeScreen' })}
        />
      </View>
    );
  }
}

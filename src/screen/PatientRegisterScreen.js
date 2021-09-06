import React, {Component} from 'react';
import { View } from 'react-native';
import { PatientRegister } from '@containers'

export default class PatientRegisterScreen extends Component {
  constructor(props) {
		super(props);
	}

  render(){
    const { navigation } = this.props;
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <PatientRegister
          navigation={this.props.navigation}
          route={this.props.route}
          onContinue={() => navigation.navigate("RegisterOTPScreen")}
        />
      </View>
    );
  }
}

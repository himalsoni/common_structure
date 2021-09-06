import React, {Component} from 'react';
import { View } from 'react-native';
import { PractitionerRegister } from '@containers'

export default class PractitionerRegisterScreen extends Component {
  constructor(props) {
		super(props);
	}

  render(){
    const { navigation } = this.props;
    return (
      <View style={{backgroundColor:'white',flex:1}}>
        <PractitionerRegister
            navigation={this.props.navigation}
            route={this.props.route}
            onContinue={() => navigation.navigate("RegisterOTPScreen")}
         />
      </View>
    );
  }
}

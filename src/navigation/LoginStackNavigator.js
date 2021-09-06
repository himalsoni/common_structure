import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Left from '@components/header/Left';

import LoginScreen from '@screen/LoginScreen';
import PatientRegisterScreen from '@screen/PatientRegisterScreen';
import PractitionerRegisterScreen from '@screen/PractitionerRegisterScreen';
import RegisterOTPScreen from '@screen/RegisterOTPScreen';
import ForgotPwdScreen from '@screen/ForgotPwdScreen';

const Stack = createStackNavigator();

function LoginStackNavigator({navigation}) {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Stack.Navigator >
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown : false}}
        />
        <Stack.Screen
            name="PatientRegisterScreen"
            component={PatientRegisterScreen}
            options={{
              headerBackImage: () => <Left isDrwaer={false} navigation={navigation}/>,
              headerBackTitleVisible:false,
              headerTitle:"",
              headerStyle:{shadowColor: 'transparent',elevation: 0,shadowOpacity: 0,}
            }}
        />
        <Stack.Screen
            name="PractitionerRegisterScreen"
            component={PractitionerRegisterScreen}
            options={{
              headerBackImage: () => <Left isDrwaer={false} navigation={navigation}/>,
              headerBackTitleVisible:false,
              headerTitle:"",
              headerStyle:{shadowColor: 'transparent',elevation: 0,shadowOpacity: 0,}
            }}
        />
        <Stack.Screen
            name="RegisterOTPScreen"
            component={RegisterOTPScreen}
            options={{
              headerBackImage: () => <Left isDrwaer={false} navigation={navigation}/>,
              headerBackTitleVisible:false,
              headerTitle:"",
              headerStyle:{shadowColor: 'transparent',elevation: 0,shadowOpacity: 0,}
              // headerTransparent:true,
            }}
        />
        <Stack.Screen
            name="ForgotPwdScreen"
            component={ForgotPwdScreen}
            options={{
              headerBackImage: () => <Left isDrwaer={false} navigation={navigation}/>,
              headerBackTitleVisible:false,
              headerTitle:"",
              headerStyle:{shadowColor: 'transparent',elevation: 0,shadowOpacity: 0,}
            }}
        />
      </Stack.Navigator>
    </React.Fragment>
  );
}

export default LoginStackNavigator;

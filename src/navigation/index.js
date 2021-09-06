import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { CommonWebviewDialog } from "@components";

import LoginStackNavigator from './LoginStackNavigator';
import DrawerStackNavigator from './DrawerStackNavigator';

const Stack = createStackNavigator();

function MainNavigation({navigation,user}) {
  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor={'transparent'} />
      {Object.keys(user).length != 0 && user.session_id ?
        <Stack.Navigator
          headerMode="none"
          screenOptions={{ animationEnabled: false }}
          mode="modal">
            <Stack.Screen
              name="DrawerStackNavigator" >
              {props => <DrawerStackNavigator {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="LoginStackNavigator"
              component={LoginStackNavigator}
            />
            <Stack.Screen
              name="CommonWebviewDialog"
              component={CommonWebviewDialog}
              options={{
                animationEnabled: true,
              }}
            />
        </Stack.Navigator>
        :
        <Stack.Navigator
          headerMode="none"
          screenOptions={{ animationEnabled: false }}
          mode="modal">
            <Stack.Screen
              name="LoginStackNavigator"
              component={LoginStackNavigator}
            />
            <Stack.Screen
              name="DrawerStackNavigator" >
              {props => <DrawerStackNavigator {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="CommonWebviewDialog"
              component={CommonWebviewDialog}
              options={{
                animationEnabled: true,
              }}
            />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}
export default MainNavigation;

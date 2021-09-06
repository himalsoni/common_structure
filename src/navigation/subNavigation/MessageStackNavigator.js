import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MessageScreen from '@screen/MessageScreen';

const Stack = createStackNavigator();

export default function ({navigation}) {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="MessageScreen" component={MessageScreen} />

      </Stack.Navigator>
    </React.Fragment>
  );
}
import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import RecorderScreen from '@screen/RecorderScreen';

const Stack = createStackNavigator();

export default function ({navigation}) {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="RecorderScreen" component={RecorderScreen} />

      </Stack.Navigator>
    </React.Fragment>
  );
}
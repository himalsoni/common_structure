import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LibraryScreen from '@screen/LibraryScreen';

const Stack = createStackNavigator();

export default function ({navigation}) {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LibraryScreen" component={LibraryScreen} />

      </Stack.Navigator>
    </React.Fragment>
  );
}
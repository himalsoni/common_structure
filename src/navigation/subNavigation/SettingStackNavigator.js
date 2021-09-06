import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingScreen from '@screen/SettingScreen';
import { Color } from "@common";
import Left from '@components/header/Left';

const Stack = createStackNavigator();

export default function ({navigation}) {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Stack.Navigator>
        <Stack.Screen
          name="Settings"
          component={SettingScreen}
          options={{
            headerLeft: () => <Left isDrwaer={true} drwaerIconColor={Color.primary} navigation={navigation}/>,
            headerTintColor: Color.primary,
          }}
        />
      </Stack.Navigator>
    </React.Fragment>
  );
}
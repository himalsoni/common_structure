import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Left from '@components/header/Left';
import AboutScreen from '@screen/AboutScreen';
import { Color } from "@common";

const Stack = createStackNavigator();

export default function ({navigation}) {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Stack.Navigator>
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options={{
            headerLeft: () => <Left isDrwaer={false} navigation={navigation}/>,
            headerTintColor: Color.primary,
          }}
        />
      </Stack.Navigator>
    </React.Fragment>
  );
}

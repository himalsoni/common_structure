import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Left from '@components/header/Left';
import HomeScreen from '@screen/HomeScreen';
import ExerciseDetailScreen from '@screen/ExerciseDetailScreen';
import { CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function ({navigation, user}) {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Stack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
        }}
      >
          <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerLeft: () => <Left isDrwaer={true} drwaerIconColor={'#fff'} navigation={navigation}/>,
                headerTitle: user.is_patient ? "" : "Patients",
                headerStyle:{shadowColor: 'transparent'},
                headerTransparent: user.is_patient ? true : false,
                headerRight: () => {}
              }}
          />
          <Stack.Screen
              name="ExerciseDetailScreen"
              component={ExerciseDetailScreen}
              options={{headerShown : false}}
          />
      </Stack.Navigator>
    </React.Fragment>
  );
}

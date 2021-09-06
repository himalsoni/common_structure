import React from 'react';
import {StatusBar, Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images, Color } from "@common";

import HomeStackNavigator from './subNavigation/HomeStackNavigator';
import LibraryStackNavigator from './subNavigation/LibraryStackNavigator';
import RecordingStackNavigator from './subNavigation/RecordingStackNavigator';
import MessageStackNavigator from './subNavigation/MessageStackNavigator';
import SettingStackNavigator from './subNavigation/SettingStackNavigator';

const Tab = createBottomTabNavigator();

export default function TabStackNavigator({navigation, user}) {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = Images.home;
                } else if (route.name === 'Patients') {
                  iconName = Images.patient;
                } else if (route.name === 'Library') {
                  iconName = Images.library;
                } else if (route.name === 'Record') {
                  iconName = Images.record;
                } else if (route.name === 'Message') {
                  iconName = Images.chat;
                } else if (route.name === 'Settings') {
                  iconName = Images.settings;
                }

                // You can return any component that you like here!
                if(user.is_patient && (route.name === 'Library' || route.name === 'Message') ){
                  return null;
                }
                return <Image source={iconName} style={{
                  height: route.name === 'Record' ? 40 : 25,
                  width: route.name === 'Record' ? 40 : 25,
                  marginTop : route.name === 'Record' ? 20 : 0,
                  tintColor:focused ? Color.tabActiveColor : Color.tabColor}}
                  resizeMode={'contain'}/>;


              },
              tabBarLabel : (route.name === 'Record' ? "" : route.name),
            })}
          tabBarOptions={{
              activeTintColor: Color.tabActiveColor,
              inactiveTintColor: Color.tabColor,
              style: {
                backgroundColor: "#2d6c9f",
              }
            }}
        >
        <Tab.Screen
          name= {user.is_patient ? "Home" : "Patients"}
          options={navigation => ({
            tabBarVisible: navigation?.route?.state?.index > 0 ? false : true
          })}
          >
          {props => <HomeStackNavigator {...props} user={user} />}
        </Tab.Screen>
        {!user.is_patient &&
          <Tab.Screen
            name="Library"
            component={LibraryStackNavigator}
          />
        }
        <Tab.Screen
          name="Record"
          component={RecordingStackNavigator}
        />
        {!user.is_patient &&
          <Tab.Screen
            name="Message"
            component={MessageStackNavigator}
          />
        }
        <Tab.Screen
          name="Settings"
          component={SettingStackNavigator}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
}

import React from 'react';
import {StatusBar, SafeAreaView, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import { Images, Color } from "@common";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import TabStackNavigator from './TabStackNavigator';
import DrawerPageStackNavigator from './subNavigation/DrawerPageStackNavigator';
import { DrawerActions } from '@react-navigation/native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import * as stateActions from '../redux/UserRedux';
import store from '@store';

export default function DrawerStackNavigator({navigation, user}) {
  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Drawer.Navigator
        initialRouteName="TabStackNavigator"
        drawerContent={(props) => <CustomDrawerContent {...props} user={user} navigation={navigation}/>}
        edgeWidth={0} // disable swipe to open drawer
        >
        <Stack.Screen
          name="TabStackNavigator" >
          {props => <TabStackNavigator {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen
          name="DrawerPageStackNavigator"
          component={DrawerPageStackNavigator}
        />
      </Drawer.Navigator>
    </React.Fragment>
  );
}

function logoutApp(navigation){
  navigation.dispatch(DrawerActions.closeDrawer());
  navigation.navigate('LoginStackNavigator', { screen: 'LoginScreen' });
  store.dispatch(stateActions.logout());
}

function CustomDrawerContent({props, user, navigation}) {
  return (
    <SafeAreaView style={styles.drawerMainView}>
      {/* ... drawer contents */}
      <TouchableOpacity onPress={() => navigation.navigate('DrawerPageStackNavigator', { screen: 'AboutScreen' })} style={styles.drawerBtnWrapper}>
          <Image source={Images.about} style={styles.drawerBtnImage} resizeMode={'contain'}/>
          <Text style={styles.drawerBtnText}>{"About"}</Text>
      </TouchableOpacity>
      {!user.is_patient &&
        <TouchableOpacity onPress={() => {}} style={styles.drawerBtnWrapper}>
            <Image source={Images.login_as} style={styles.drawerBtnImage} resizeMode={'contain'}/>
            <Text style={styles.drawerBtnText}>{"Login as Patient"}</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={() => logoutApp(navigation)} style={styles.drawerBtnWrapper}>
          <Image source={Images.logout} style={styles.drawerBtnImage} resizeMode={'contain'}/>
          <Text style={styles.drawerBtnText}>{"Logout"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerMainView:{
    flex:1,
    marginTop:20,
  },
  text:{
    color:'#000',
    fontSize:18,
  },
  drawerBtnWrapper:{
    flexDirection:'row',
    height:65,
    paddingLeft:20,
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:'#c9c9c9'
  },
  drawerBtnImage:{
    height:30,
    width:30,
    tintColor:Color.primary,
  },
  drawerBtnText:{
    fontSize:18,
    color:Color.primary,
    marginLeft:8
  },
});

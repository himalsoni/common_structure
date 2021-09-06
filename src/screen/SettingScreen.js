import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Settings } from '@containers'

export default class SettingScreen extends Component {
  constructor(props) {
  	super(props);
  }

  render(){
    const { navigation } = this.props;
    return (
      <Settings navigation={navigation} />
    );
  }
}

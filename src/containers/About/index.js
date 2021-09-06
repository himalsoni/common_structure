import React from "react";
import { View, Image, Text } from "react-native";
import {Images, Languages } from "@common";
import styles from "./styles";
import DeviceInfo from 'react-native-device-info';

const About = (props) => (
  <View style={styles.mainContainer}>
    <Image source={Images.about} style={styles.icon} />
    <View style={styles.textContainer}>
        <Text style={styles.mainText}>{Languages.AppVersion}</Text>
        <Text style={styles.subText}>{Languages.V + DeviceInfo.getVersion() + " ("+Languages.Build + DeviceInfo.getBuildNumber()+")"}</Text>
    </View>
  </View>
);
export default About;

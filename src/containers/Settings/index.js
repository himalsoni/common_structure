import React, {PureComponent} from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import {Images, Languages } from "@common";
import { connect } from "react-redux";
import styles from "./styles";
import { toast, log } from "@common/Tools";

class Settings extends PureComponent {
  constructor(props) {
    super(props);
  }

  onProfileClick = () => {}
  onUserClick = () => {}
  onChangePwdClick = () => {}

  render() {
    const { user } = this.props;
    return (
      <View style={styles.mainContainer}>
        {/*profile container*/}
        <View style={styles.profileContainer}>
            <View style={styles.photoContainer}>
              <Image source={{uri:user.image}} style={styles.profilePic} resizeMode={'contain'} />
            </View>
            <View style={styles.profileDetailContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{Languages.Welcome+", "+ user.name}</Text>
                </View>
                {!user.is_patient &&
                  <View style={styles.docDetailConatiner}>
                      <View style={styles.docIDContainer}>
                          <Text style={styles.docID}>{Languages.DoctorId+": "}</Text>
                          <Text style={styles.docIDVal}>{"98678 for Apolo only"}</Text>
                      </View>
                      <View style={styles.clinicIDContainer}>
                          <Text style={styles.clinicID}>{Languages.ClinicId+": "}</Text>
                          <Text style={styles.clinicIDVal}>{"456789"}</Text>
                      </View>
                  </View>
                }
            </View>
        </View>
        {/*profile tab container*/}
        <View style={styles.btnTopBorder}>
          <ProfileButtons icon={Images.profile} text={Languages.MyProfile} onPress={this.onProfileClick}/>
        </View>
        {/*practinior/user tab container*/}
        <ProfileButtons icon={Images.setting_user} text={!user.is_patient ? Languages.Users : Languages.Practitioner} onPress={this.onUserClick}/>
        {/*change pwd tab container*/}
        <View style={styles.btnBottomBorder}>
          <ProfileButtons icon={Images.chnge_pwd} text={Languages.ChangePwd} onPress={this.onChangePwdClick}/>
        </View>
      </View>
    );
  }
}

class ProfileButtons extends PureComponent {
  render() {
    const { icon, text, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.btnMainContainer} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.btnIconContainer}>
            <Image source={icon} style={styles.btnIcon} resizeMode={"contain"}/>
        </View>
        <View style={styles.btnNameContainer}>
            <Text style={styles.btnNameText}>{text}</Text>
        </View>
        <View style={styles.btnArrowContainer}>
            <Image source={Images.next} style={styles.arrowIcon} resizeMode={"contain"}/>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.result,
  };
};

export default (connect(mapStateToProps,undefined,null)(Settings));

import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import styles from "./styles";
import { Languages, Color } from "@common";
import { Spinner, Fade } from "@components";
import OTPTextInput from 'react-native-otp-textinput';
import { toast, log } from "@common/Tools";

class OTPPwd extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      mobile:"",
      password:"",
      confirmPwd:"",
      stage: this.props.from == 'forgotPwd' ? 'mobile' : 'OTP',
    };
    this.onMobileEditHandle = (mobile) => this.setState({mobile});
    this.onPwdChange = (password) => this.setState({password});
    this.onConfirmPwdChange = (confirmPwd) => this.setState({confirmPwd});

    this.placeholderColor = Color.inputBoxPlaceholder;
    this.token = "";
    this.OTPCount = 4;
  }
  focusConfirmPwd(){
    if(this.state.password != ""){
      this.confirmPwd && this.confirmPwd.focus();
    }else{
      toast(Languages.enterPwdValidation);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.user !== this.props.user) {
      if(nextProps.user.error != null){
        toast(nextProps.user.error);
      }
      if(nextProps.user.type == "RESEND_OTP_SUCCESS"){
        this.setState({stage : 'OTP'});
      }
      if(nextProps.user.type == "OTP_VERIFICATION_SUCCESS"){
        this.setState({stage : 'setPwd'});
      }
      if(nextProps.user.type == "FETCH_SIGNUP_SUCCESS"){
        toast(this.props.successMsg);
        this.props.navigation.navigate('DrawerStackNavigator', { screen: 'HomeScreen' });
      }
    }
  }

  validateFormField(){
    const { password , confirmPwd } = this.state;
    if(password == ""){
      toast(Languages.enterPwdValidation);
      return false;
    }
    if(confirmPwd == ""){
      toast(Languages.confirmPwdValidation);
      return false;
    }
    if(password != confirmPwd){
      toast(Languages.newConfirmPwdNotMatch);
      return false;
    }
    return true;
  }
  onContinue(){
    const { password , confirmPwd } = this.state;
    if(this.validateFormField()){
      let obj = {
        "params" : {
          "login" : this.props.from == 'forgotPwd' ? this.state.mobile : this.props.user.signupResult.login,
          "token" : this.token,
          "password": password,
          "confirm_password": confirmPwd,
        }
      }
      this.props.signup(obj);
    }
  }
  onSendOTP(){
    if(this.state.mobile != ""){
      this.onResendOTP();
    }else{
      toast(Languages.enterMobileValidation)
    }
  }
  onOTPChange(val){
    if(val.length == this.OTPCount){
      this.token = val;
      let obj = {
        "params" : {
          "login" : this.props.from == 'forgotPwd' ? this.state.mobile : this.props.user.signupResult.login,
          "token" : val,
        }
      }
      this.props.otpVerification(obj);
    }else{
      this.setState({stage : 'OTP'});
    }
  }
  onResendOTP(){
    let obj = {
      "params" : {
        "login" :this.props.from == 'forgotPwd' ? this.state.mobile : this.props.user.signupResult.login,
      }
    }
    log(obj)
    this.props.resendOtp(obj);
  }

  render() {
    const { password, confirmPwd, mobile, stage} = this.state;
    const { user } = this.props;
    let title = '';
    if(stage == 'mobile'){
      title = Languages.ForgotPwdTitle;
    }else if(stage == 'OTP'){
      title = Languages.OTP;
    }else if(stage == 'setPwd'){
      title = Languages.setPWd;
    }
    return (
      <KeyboardAwareScrollView
          enableOnAndroid={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.mainView}>
              <View style={styles.logoWrap}>
                <Text style={styles.logoText}>{title}</Text>
              </View>
              <View style={styles.formView}>
                <Fade delay={50} visible={stage=="mobile"} remove={stage=="OTP" || stage=="setPwd"}>
                    <View style={styles.inputWrap}>
                      <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        underlineColorAndroid="transparent"
                        placeholderTextColor={this.placeholderColor}
                        ref={comp => (this.mobile = comp)}
                        placeholder={Languages.mobilePlaceholder}
                        onChangeText={this.onMobileEditHandle}
                        onSubmitEditing={() => this.onSendOTP()}
                        keyboardType="number-pad"
                        returnKeyType="done"
                        value={mobile}
                      />
                    </View>
                </Fade>
                <Fade delay={100} visible={stage=="OTP"} remove={stage=="setPwd" || stage=="mobile"}>
                      <OTPTextInput
                        ref={e => (this.otpInput = e)}
                        textInputStyle={styles.otpWrapper}
                        tintColor={'#27536c'}
                        handleTextChange={(val) => this.onOTPChange(val)}
                        inputCount={this.OTPCount}
                      />
                      <TouchableOpacity style={styles.resendOTPBtn} onPress={() => this.onResendOTP()}>
                          <View style={styles.resendOTPWrap}>
                              <Text style={styles.resendOTPText}>{Languages.ResendOTP}</Text>
                          </View>
                      </TouchableOpacity>
                </Fade>
                <Fade delay={300} visible={stage=="setPwd"}>
                      <View style={styles.pwdView}>
                          <View style={styles.inputWrap}>
                            <TextInput
                              style={styles.input}
                              underlineColorAndroid="transparent"
                              placeholderTextColor={this.placeholderColor}
                              ref={comp => (this.password = comp)}
                              placeholder={Languages.newPwdPlaceholder}
                              onChangeText={this.onPwdChange}
                              secureTextEntry
                              returnKeyType="next"
                              onSubmitEditing={() => this.focusConfirmPwd()}
                              value={password}
                            />
                          </View>
                          <View style={styles.inputWrap}>
                            <TextInput
                              style={styles.input}
                              underlineColorAndroid="transparent"
                              placeholderTextColor={this.placeholderColor}
                              ref={comp => (this.confirmPwd = comp)}
                              placeholder={Languages.confirmPwdPlaceholder}
                              onChangeText={this.onConfirmPwdChange}
                              secureTextEntry
                              returnKeyType="go"
                              onSubmitEditing={() => this.onContinue()}
                              value={confirmPwd}
                            />
                          </View>

                          <TouchableOpacity style={styles.continueBtn} onPress={() => this.onContinue()}>
                            <Text style={styles.continueBtnText}>{Languages.Continue}</Text>
                          </TouchableOpacity>
                      </View>
                </Fade>
              </View>
          </View>
        {user.isFetching ? <Spinner /> : null}
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.netInfo.isConnected,
    user: state.user,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/UserRedux");
  const { isConnected } = stateProps;
  return {
    ...ownProps,
    ...stateProps,
    otpVerification: (obj) => {
      if(isConnected){
        actions.otpVerification(dispatch, obj)
      }else{
        toast(Languages.InternetError)
      }
    },
    resendOtp: (obj) => {
      if(isConnected){
        actions.resendOtp(dispatch, obj)
      }else{
        toast(Languages.InternetError)
      }
    },
    signup: (signupObj) => {
      if(isConnected){
        actions.signup(dispatch, signupObj)
      }else{
        toast(Languages.InternetError)
      }
    },
  };
}
export default (connect(mapStateToProps,undefined,mergeProps)(OTPPwd));

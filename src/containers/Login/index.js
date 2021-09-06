import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import styles from "./styles";
import { Languages, Color, Images } from "@common";
import { Spinner } from "@components";
import { toast, log } from "@common/Tools";

class Login extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      mobile: "12341234",
      password: "123",
    };

    this.onMobileEditHandle = (mobile) => this.setState({ mobile });
    this.onPasswordEditHandle = (password) => this.setState({ password });

    this.placeholderColor = Color.inputBoxPlaceholder;
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.user !== this.props.user) {
      if(nextProps.user.error != null){
        toast(nextProps.user.error);
      }
      if(nextProps.user.type == "FETCH_LOGIN_SUCCESS"){
         toast(Languages.loginSuccess);
         this.props.onHomeScreen();
         this.setState({mobile : "", password: ""});
      }
    }
  }

  onLogin(){
    if(this.state.mobile != ""){
      if(this.state.password != ""){
        let loginObj = {
          "params" : {
            "login" : this.state.mobile,
            "password" : this.state.password,
            "db": "ptapp"
          }
        }
        this.props.login(loginObj);
      }else {
        toast(Languages.enterPwdValidation);
      }
    }else {
      toast(Languages.enterMobileValidation);
    }
  }
  focusPassword(){
    if(this.state.mobile != ""){
      this.password && this.password.focus();
    }else {
      toast(Languages.enterMobileValidation);
    }
  }

  render() {
    const { mobile, password } = this.state;
    const { user } = this.props;
    return (
      <KeyboardAwareScrollView
          enableOnAndroid={true}
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.mainView}>
              <View style={styles.logoWrap}>
                <Image source={Images.logo} style={styles.logo} resizeMode="stretch" />
              </View>
              <View style={styles.subContain}>
                <View style={styles.loginForm}>
                  <View style={styles.inputWrap}>
                    <TextInput
                      style={styles.input}
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      placeholderTextColor={this.placeholderColor}
                      ref={comp => (this.mobile = comp)}
                      placeholder={Languages.mobilePlaceholder}
                      keyboardType="numeric"
                      onChangeText={this.onMobileEditHandle}
                      onSubmitEditing={() => this.focusPassword()}
                      returnKeyType="done"
                      value={mobile}
                    />
                  </View>
                  <View style={styles.inputWrap}>
                    <TextInput
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      placeholderTextColor={this.placeholderColor}
                      ref={comp => (this.password = comp)}
                      placeholder={Languages.pwdPlaceholder}
                      onChangeText={this.onPasswordEditHandle}
                      secureTextEntry
                      returnKeyType="go"
                      onSubmitEditing={() => this.onLogin()}
                      value={password}
                    />
                  </View>

                  <TouchableOpacity style={styles.loginBtn} onPress={() => this.onLogin()}>
                    <Text style={styles.loginBtnText}>{Languages.Login.toUpperCase()}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.forgotPwdBtn} onPress={() => this.props.onForgotPwd()}>
                    <Text style={styles.forgotPwdText}>{Languages.ForgotPwd}</Text>
                  </TouchableOpacity>


                  <TouchableOpacity style={styles.signupBtn} onPress={() => this.props.onPatientRegister()}>
                    <Text style={styles.signupText}>{Languages.registerAsPatient}</Text>
                  </TouchableOpacity>

                  <View style={styles.orTextWrapper}>
                    <Text style={styles.orText}>{Languages.or}</Text>
                  </View>

                  <TouchableOpacity style={styles.signupBtn} onPress={() => this.props.onPractitionerRegister()}>
                    <Text style={styles.signupText}>{Languages.registerAsPractitioner}</Text>
                  </TouchableOpacity>

                </View>
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
    login: (loginObj) => {
      if(isConnected){
        actions.login(dispatch, loginObj)
      }else{
        toast(Languages.InternetError)
      }
    },
  };
}

export default (connect(mapStateToProps,undefined,mergeProps)(Login));

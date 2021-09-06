import React, { PureComponent } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import styles from "./styles";
import { Images, Languages, Color } from "@common";
import { Spinner } from "@components";
import { toast, log } from "@common/Tools";

let t = require('tcomb-form-native');
let _ = require('lodash');
let Form = t.form.Form;

let formObj = t.struct({
  firstname: t.String,
  lastname:t.String,
  login: t.Number,
});

class Signup extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      checkboxIcon : Images.checkbox,
      formObj: this.props.formObj ? this.props.formObj : formObj,
      value:{},
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if (nextProps.user.signupResult !== this.props.user.signupResult) {
      if(nextProps.user.error != null){
        toast(nextProps.user.error);
      }
      if(nextProps.user.type == "FETCH_SIGNUP_SUCCESS"){
         this.props.onContinue();
      }
    }
  }

  onChange(value) {
    this.setState({value});
  }

  onContinueBtn(){
    let value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      this.callSignup(value);
    }
  }
  callSignup(value){
    const { extraKeyForObj } = this.props;
    let signupObj = {
      "params" : Object.assign(extraKeyForObj ? extraKeyForObj : {}, value)
    }
    log(signupObj)
    this.props.signup(signupObj);
  }

  onTermsCondition(){
    this.props.navigation.navigate('CommonWebviewDialog',
      {'title' : Languages.TermsCondition, 'url' : this.props.appData.term_conditions})
  }
  onPrivacyPolicy(){
    this.props.navigation.navigate("CommonWebviewDialog",
      {'title' : Languages.PrivacyPolicy, 'url' : this.props.appData.privacy_policy});
  }

  render() {
    const { formObj } = this.state;
    const { userType, user, options } = this.props;
    return (
      <KeyboardAwareScrollView
          enableOnAndroid={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.mainView}>
                <View style={styles.logoWrap}>
                  <Text style={styles.logoText}>{Languages.RegisterAs + userType}</Text>
                </View>

                <View style={styles.formView}>
                  <Form
                    ref="form"
                    type={formObj}
                    options={options}
                    value={this.state.value}
                    onChange={(value) => this.onChange(value)}
                  />

                  <View style={styles.continueBtnWrapper}>
                      <TouchableOpacity style={styles.continueBtn} onPress={() => this.onContinueBtn()}>
                        <Text style={styles.continueBtnText}>{Languages.Continue.toUpperCase()}</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={styles.acceptTermsPolicyView}>
                      {/*<Image source={checkboxIcon} style={styles.checkboxIcon} resizeMode={'contain'} />*/}
                      <Text style={styles.acceptText}>{Languages.Accept}</Text>
                      <View style={styles.termsWrapper}>
                          <TouchableOpacity style={styles.termsBtn} onPress={() => this.onTermsCondition()}>
                              <Text style={styles.termsText}>{Languages.TermsCondition}</Text>
                          </TouchableOpacity>
                          <Text style={styles.acceptText}>{"  "+Languages.and+"  "}</Text>
                          <TouchableOpacity style={styles.policyBtn} onPress={() => this.onPrivacyPolicy()}>
                              <Text style={styles.policyText}>{Languages.PrivacyPolicy}</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                </View>
            </View>
          </ScrollView>
        {user.isFetching ? <Spinner /> : null}
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.netInfo.isConnected,
    user: state.user,
    appData: state.appData.result,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/UserRedux");
  const { isConnected } = stateProps;
  return {
    ...ownProps,
    ...stateProps,
    signup: (signupObj) => {
      if(isConnected){
        actions.signup(dispatch, signupObj)
      }else{
        toast(Languages.InternetError)
      }
    },
  };
}
export default (connect(mapStateToProps,undefined,mergeProps)(Signup));

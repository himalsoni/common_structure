import React, { PureComponent } from "react";
import { OTPPwd } from "@components";
import { Languages } from "@common";

export default class RegisterOTP extends PureComponent {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <OTPPwd from={'registerOTP'} successMsg={Languages.signupSuccess} navigation={this.props.navigation}/>
    );
  }
}

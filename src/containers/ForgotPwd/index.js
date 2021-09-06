import React, { PureComponent } from "react";
import { OTPPwd } from "@components";
import { Languages } from "@common";

export default class ForgotPwd extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <OTPPwd from={'forgotPwd'} successMsg={Languages.pwdSetSuccess} navigation={this.props.navigation}/>
    );
  }
}

import React, { PureComponent } from "react";
import { Signup } from "@components";
import { Color } from "@common";

let t = require('tcomb-form-native');

export default class PatientRegister extends PureComponent {

  constructor(props) {
    super(props);
    this.extraKey = {
      "is_patient" : true,
    }
    this.formObj = t.struct({
      firstname: t.String,
      lastname:t.String,
      login: t.Number,
      invitation_code: t.String
    });
    this.options = {
      auto: 'placeholders',
      fields: {
        firstname:{
          placeholder: 'First name',
          placeholderTextColor: Color.inputBoxPlaceholder,
        },
        lastname:{
          placeholder: 'Last name',
          placeholderTextColor: Color.inputBoxPlaceholder,
        },
        login: {
          placeholder: 'Mobile',
          placeholderTextColor: Color.inputBoxPlaceholder,
        },
        invitation_code:{
          placeholder: 'Invitation code',
          placeholderTextColor: Color.inputBoxPlaceholder,
        },
      }
    };
  }

  render() {
    return (
      <Signup
        navigation={this.props.navigation}
        formObj={this.formObj}
        extraKeyForObj={this.extraKey}
        options={this.options}
        userType={'Patient'}
        onContinue={() => this.props.onContinue()}
        />
    );
  }
}

import PTApi from "../services/PTApi";
import HTTP from "../services/http";
import { toast, log } from "@common/Tools";

const types = {
  FETCH_LOGIN_PENDING: "FETCH_LOGIN_PENDING",
  FETCH_LOGIN_SUCCESS: "FETCH_LOGIN_SUCCESS",
  FETCH_LOGIN_FAILURE: "FETCH_LOGIN_FAILURE",

  FETCH_SIGNUP_PENDING: "FETCH_SIGNUP_PENDING",
  FETCH_SIGNUP_SUCCESS: "FETCH_SIGNUP_SUCCESS",
  FETCH_SIGNUP_FAILURE: "FETCH_SIGNUP_FAILURE",

  OTP_VERIFICATION_PENDING: "OTP_VERIFICATION_PENDING",
  OTP_VERIFICATION_SUCCESS: "OTP_VERIFICATION_SUCCESS",
  OTP_VERIFICATION_FAILURE: "OTP_VERIFICATION_FAILURE",

  RESEND_OTP_PENDING: "RESEND_OTP_PENDING",
  RESEND_OTP_SUCCESS: "RESEND_OTP_SUCCESS",
  RESEND_OTP_FAILURE: "RESEND_OTP_FAILURE",
};

export const actions = {
  login: async (dispatch, loginObj) => {
    dispatch({ type: types.FETCH_LOGIN_PENDING });
    const json = await PTApi.login(loginObj).then((responseJson) =>{
      return responseJson;
    }).catch((error) => {
      return error;
    });
    log("--login response---");
    log(json);

    if (json === undefined) {
      dispatch(actions.loginFailure("Can't get data from server"));
    } else if (json.status == 'error') {
      dispatch(actions.loginFailure(json.message));
    } else if (json.status == 'failed') {
      dispatch(actions.loginFailure(json.error));
    } else {
      dispatch(actions.loginSuccess(json));
      HTTP.setCredentials(loginObj.params.login, loginObj.params.password);
    }
  },
  loginSuccess: (items) => ({
    type: types.FETCH_LOGIN_SUCCESS,
    items,
  }),
  loginFailure: (error) => ({
    type: types.FETCH_LOGIN_FAILURE,
    error,
  }),

  signup: async (dispatch, signupObj) => {
    dispatch({ type: types.FETCH_SIGNUP_PENDING });
    const json = await PTApi.signup(signupObj).then((responseJson) =>{
      return responseJson;
    }).catch((error) => {
      return error;
    });
    log("--signup response---");
    log(json);

    if (json === undefined) {
      dispatch(actions.signupFailure("Can't get data from server"));
    } else if (json.status == 'error') {
      dispatch(actions.signupFailure(json.message));
    } else if (json.status == 'failed') {
      dispatch(actions.signupFailure(json.error));
    } else {
      dispatch(actions.signupSuccess(json));
      HTTP.setCredentials(signupObj.params.login, signupObj.params.password);
    }
  },
  signupSuccess: (items) => ({
    type: types.FETCH_SIGNUP_SUCCESS,
    items,
  }),
  signupFailure: (error) => ({
    type: types.FETCH_SIGNUP_FAILURE,
    error,
  }),

  otpVerification: async (dispatch, obj) => {
    dispatch({ type: types.OTP_VERIFICATION_PENDING });
    const json = await PTApi.otpVerification(obj).then((responseJson) =>{
      return responseJson;
    }).catch((error) => {
      return error;
    });
    log("--otpVerification response---");
    log(json);

    if (json === undefined) {
      dispatch(actions.otpVerificationFailure("Can't get data from server"));
    } else if (json.status == 'error') {
      dispatch(actions.otpVerificationFailure(json.message));
    } else if (json.status == 'failed') {
      dispatch(actions.otpVerificationFailure(json.error));
    } else {
      dispatch(actions.otpVerificationSuccess(json));
    }
  },
  otpVerificationSuccess: (items) => ({
    type: types.OTP_VERIFICATION_SUCCESS,
    items,
  }),
  otpVerificationFailure: (error) => ({
    type: types.OTP_VERIFICATION_FAILURE,
    error,
  }),

  resendOtp: async (dispatch, obj) => {
    dispatch({ type: types.RESEND_OTP_PENDING });
    const json = await PTApi.resendOtp(obj).then((responseJson) =>{
      return responseJson;
    }).catch((error) => {
      return error;
    });
    log("--resendOtp response---");
    log(json);

    if (json === undefined) {
      dispatch(actions.resendOtpFailure("Can't get data from server"));
    } else if (json.status == 'error') {
      dispatch(actions.resendOtpFailure(json.message));
    } else if (json.status == 'failed') {
      dispatch(actions.resendOtpFailure(json.error));
    } else {
      dispatch(actions.resendOtpSuccess(json));
    }
  },
  resendOtpSuccess: (items) => ({
    type: types.RESEND_OTP_SUCCESS,
    items,
  }),
  resendOtpFailure: (error) => ({
    type: types.RESEND_OTP_FAILURE,
    error,
  }),
};

export const logout = () =>
{
	return {
		type  : 'LOGOUT'
	}
}

const initialState = {
  isFetching: false,
  error: null,
  result: {},
  signupResult : {},
  verifyToken : {},
  code:200,
  type:'',
};

export const reducer = (state = initialState, action) => {
  const { type, items, error} = action;
  switch (type) {
    case types.FETCH_LOGIN_PENDING:
			return {
				...state,
				isFetching: true,
				error: null,
        type
			};
		case types.FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        result: {...state.result, ...items },
        type
      };
		case types.FETCH_LOGIN_FAILURE:
			return {
				...state,
				isFetching: false,
				error,
        type
		};

    case types.FETCH_SIGNUP_PENDING:
			return {
				...state,
				isFetching: true,
				error: null,
        type
			};
		case types.FETCH_SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        signupResult: {...state.signupResult, ...items },
        result : items,
        type
      };
		case types.FETCH_SIGNUP_FAILURE:
			return {
				...state,
				isFetching: false,
				error,
        type
		};

    case types.OTP_VERIFICATION_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null,
        type
      };
    case types.OTP_VERIFICATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        verifyToken: items,
        type
      };
    case types.OTP_VERIFICATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        error,
        type
    };

    case types.RESEND_OTP_PENDING:
      return {
        ...state,
        isFetching: true,
        error: null,
        type
      };
    case types.RESEND_OTP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        type
      };
    case types.RESEND_OTP_FAILURE:
      return {
        ...state,
        isFetching: false,
        error,
        type
    };

    case 'LOGOUT':
      return Object.assign({}, initialState);

    default: {
      return state;
    }
  }
};

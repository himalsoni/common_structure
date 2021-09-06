import PTApi from "../services/PTApi";
import { toast, log } from "@common/Tools";

const types = {
  FETCH_APP_SETTING_PENDING: "FETCH_APP_SETTING_PENDING",
  FETCH_APP_SETTING_SUCCESS: "FETCH_APP_SETTING_SUCCESS",
  FETCH_APP_SETTING_FAILURE: "FETCH_APP_SETTING_FAILURE",

};

export const actions = {
  fetchAppSetting: async (dispatch) => {
    dispatch({ type: types.FETCH_APP_SETTING_PENDING });
    const json = await PTApi.fetchAppSetting().then((responseJson) =>{
      return responseJson;
    }).catch((error) => {
      return error;
    });
    log("--fetchAppSetting response---");
    log(json);

    if (json === undefined) {
      dispatch(actions.fetchAppSettingFailure("Can't get data from server"));
    } else if (json.status == 'error') {
      dispatch(actions.fetchAppSettingFailure(json.message));
    } else if (json.status == 'failed') {
      dispatch(actions.fetchAppSettingFailure(json.error));
    } else {
      dispatch(actions.fetchAppSettingSuccess(json));
    }
  },
  fetchAppSettingSuccess: (items) => ({
    type: types.FETCH_APP_SETTING_SUCCESS,
    items,
  }),
  fetchAppSettingFailure: (error) => ({
    type: types.FETCH_APP_SETTING_FAILURE,
    error,
  }),
};

const initialState = {
  isFetching: false,
  error: null,
  result: {},
  type:'',
};

export const reducer = (state = initialState, action) => {
  const { type, items, error} = action;
  switch (type) {
    case types.FETCH_APP_SETTING_PENDING:
			return {
				...state,
				isFetching: true,
				error: null,
        type
			};
		case types.FETCH_APP_SETTING_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: null,
        result: { ...items },
        type
      };
		case types.FETCH_APP_SETTING_FAILURE:
			return {
				...state,
				isFetching: false,
				error,
        type
		};

    default: {
      return state;
    }
  }
};

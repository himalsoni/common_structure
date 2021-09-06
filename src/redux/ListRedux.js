import PTApi from "../services/PTApi";
import { toast, log } from "@common/Tools";

const types = {
  FETCH_LIST_PENDING: "FETCH_LIST_PENDING",
  FETCH_LIST_SUCCESS: "FETCH_LIST_SUCCESS",
  FETCH_MORE_LIST_SUCCESS: "FETCH_MORE_LIST_SUCCESS",
  FETCH_LIST_FAILURE: "FETCH_LIST_FAILURE",

};

let storeVal;

export const actions = {
  searchRead: async (dispatch, model, domain, fields, listLimit, offset, storeValData) => {
    storeVal = storeValData;
    if(offset == 0){
      dispatch({ type: types.FETCH_LIST_PENDING });
    }
    const json = await PTApi.searchRead(model, domain, fields, listLimit, offset).then((responseJson) =>{
      return responseJson;
    }).catch((error) => {
      return error;
    });
    log("--searchRead response---");
    log(json);

    if (json === undefined) {
      dispatch(actions.searchReadFailure("Can't get data from server"));
    } else if (json.status == 'error') {
      dispatch(actions.searchReadFailure(json.message));
    } else if (json.status == 'failed') {
      dispatch(actions.searchReadFailure(json.error));
    } else {
      if(offset == 0){
        dispatch(actions.searchReadSuccess(json, storeVal));
      }else{
        dispatch(actions.searchReadMoreSuccess(json, storeVal));
      }
    }
  },
  searchReadSuccess: (items, storeVal) => ({
    type: types.FETCH_LIST_SUCCESS,
    items,
    storeVal,
  }),
  searchReadMoreSuccess: (items, storeVal) => ({
    type: types.FETCH_MORE_LIST_SUCCESS,
    items,
    storeVal,
  }),
  searchReadFailure: (error) => ({
    type: types.FETCH_LIST_FAILURE,
    error,
  }),
};

const initialState = {};

export const reducer = (state = initialState, action) => {
  const { type, items, error} = action;
  switch (type) {
    case types.FETCH_LIST_PENDING:
      let pendingObj = {};
      pendingObj["isFetching"] = true;
      pendingObj["error"] = null;
      pendingObj["type"] = type;
      pendingObj["stillFetch"] = false;

      if(state.hasOwnProperty(storeVal)){
        Object.assign(state[storeVal], pendingObj)
      }else{
        state[storeVal] = pendingObj;
      }
			return {...state};

		case types.FETCH_LIST_SUCCESS:
      let successObj = {};
      successObj["isFetching"] = false;
      successObj["error"] = null;
      successObj["type"] = type;
      successObj["list"] = items.records;
      successObj["stillFetch"] = items.records.length !== 0;
      if(storeVal){
        Object.assign(state[storeVal], successObj)
      }
      return {...state};

    case types.FETCH_MORE_LIST_SUCCESS:
      let moreSuccessObj =  {};
      moreSuccessObj["isFetching"] = false;
      moreSuccessObj["error"] = null;
      moreSuccessObj["type"] = type;
      moreSuccessObj["list"] = state[storeVal].list.concat(items.records);
      moreSuccessObj["stillFetch"] = items.records.length !== 0;
      if(storeVal){
        Object.assign(state[storeVal], moreSuccessObj)
      }
      return {...state};

		case types.FETCH_LIST_FAILURE:
      let failurObj =  {};
      failurObj["isFetching"] = false;
      failurObj["error"] = error;
      failurObj["type"] = type;
      failurObj["list"] = [];
      failurObj["stillFetch"] = false;
      if(storeVal){
        Object.assign(state[storeVal], failurObj)
      }
      return {...state};


    default: {
      return state;
    }
  }
};

/** @format */

import { persistCombineReducers } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';

import { reducer as NetInfoRedux } from "./NetInfoRedux";
import { reducer as UserRedux } from "./UserRedux";
import { reducer as ToastRedux } from "./ToastRedux";
import { reducer as AppRedux } from "./AppRedux";
import { reducer as ListRedux } from "./ListRedux";

const config = {
  key: "PTApp",
  storage : AsyncStorage,
  debug: true,
};

export default persistCombineReducers(config, {
  netInfo: NetInfoRedux,
  user: UserRedux,
  toast: ToastRedux,
  appData: AppRedux,
  allList: ListRedux,
});

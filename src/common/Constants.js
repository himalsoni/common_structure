/**
 * Created by InspireUI on 20/12/2016.
 *
 * @format
 */

import { Dimensions } from "react-native";
import AppConfig from "./AppConfig";

const { width, height } = Dimensions.get("window");

const Constants = {
  Language: "en", // ar, en. Default to set redux. Only use first time
  listLimit : 10, 
};

export default Constants;

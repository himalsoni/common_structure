import Reactotron from "reactotron-react-native";
import { reactotronRedux as reduxPlugin } from "reactotron-redux";
import AsyncStorage from '@react-native-community/async-storage';

console.disableYellowBox = true;

Reactotron.configure({ name: "PTApp" });

Reactotron.useReactNative({
  asyncStorage: { ignore: ["secret"] },
});

Reactotron.use(reduxPlugin());

if (__DEV__) {
  Reactotron
    .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!
  Reactotron.clear();
}

console.tron = Reactotron;

import { PixelRatio } from "react-native";
import Reactotron from 'reactotron-react-native';
import _EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
export const EventEmitter = new _EventEmitter();

export function toast(msg, duration = 1500){
  EventEmitter.emit('toast', msg, duration) ;
}

export function log(message) {
  console.log(message);
  Reactotron.log(message);
}

export const FontScalling = (size, scale) => {
    if (PixelRatio.get() <2) {
        size = size - scale;
    }
    return size;
}

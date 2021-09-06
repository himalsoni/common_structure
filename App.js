import React, { Component } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import {YellowBox} from 'react-native';
import store from "@store";
import Router from "./src/Router";
import 'react-native-gesture-handler';

console.disableYellowBox = true;
export default class App extends Component {
	constructor(props) {
		super(props);
		console.disableYellowBox = true;
	}
	componentDidMount() {

	}
	render() {
		const persistor = persistStore(store);
		return (
			<Provider store={store}>
				<PersistGate persistor={persistor} >
					<Router />
				</PersistGate>
			</Provider>
		);
	}
}

import React from "react";
import { View } from "react-native";
import Navigation from "@navigation";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import {MyToast} from '@components';

class Router extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.unsubscribe;
	}
	componentWillMount() {
		this.unsubscribe = NetInfo.addEventListener(state => {
		  console.log("Connection type", state.type);
		  console.log("Is connected?", state.isConnected);
		});
		NetInfo.fetch().then(state => {
			this.props.updateConnectionStatus(state.type != "none");
  		log("Connection type----> ", state.type);
		  log("Is connected?----> ", state.isConnected);
		});
		this.props.fetchAppSetting();
  }
	componentWillUnMount(){
		unsubscribe();
	}

	render() {
		return (
			<View style={{flex:1}}>
				<Navigation ref={comp => (this.navigator = comp)} user={this.props.user.result}/>
				<MyToast />
			</View>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/NetInfoRedux");
	const AppRedux = require("@redux/AppRedux");
  return {
    updateConnectionStatus: (isConnected) =>
      dispatch(actions.updateConnectionStatus(isConnected)),
		fetchAppSetting: () => {
			AppRedux.actions.fetchAppSetting(dispatch)
		}
  };
};

const mapStateToProps = (state) => {
  return {
    netInfo: state.netInfo,
    user: state.user,
  };
};

export default (connect(mapStateToProps,mapDispatchToProps)(Router));

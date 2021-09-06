import React, {Component} from 'react';
import { Home } from '@containers'

export default class HomeScreen extends Component {

  constructor(props) {
		super(props);
	}

  render(){
    const { navigation } = this.props;
    return (
      <Home navigation={navigation} />
    );
  }
}

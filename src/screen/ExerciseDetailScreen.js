import React, {Component} from 'react';
import { ExerciseDetail } from '@containers'

export default class ExerciseDetailScreen extends Component {

  constructor(props) {
		super(props);
	}

  render(){
    return (
      <ExerciseDetail navigation={this.props.navigation} route={this.props.route}/>
    );
  }
}

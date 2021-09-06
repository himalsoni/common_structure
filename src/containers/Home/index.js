import React, { PureComponent } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import { ParallaxScroll, SimpleFlatlist } from "@components";
import { toast, log } from "@common/Tools";
import PatientExerciseCard from './PatientExerciseCard';

class Home extends PureComponent {

  constructor(props) {
    super(props);
  }

  onItemPress(item, index){
    this.props.navigation.navigate("ExerciseDetailScreen", {"excercise" : item, "index":index });
  }

  render() {
    const { user } = this.props;
    this.FlatList = <SimpleFlatlist
            model={'clinic.patient.excercise'}
            domain={[["patient_id", "=", user.uid]]}
            fields={
              [
                "name",
                "display_name",
                "excercise_url",,"duration","excercise_on_day", "description",
                ["excercise_id", ["name"]]
              ]
            }
            storeVal={'home'}
            renderItem={(item, index, isFetching) => {
              return (
                <PatientExerciseCard item={item} onPress={() => this.onItemPress(item, index)} isFetching={isFetching}/>
              );
            }}
            onEndReachedThreshold={0.2}
        />

    return (
      <View style={styles.container}>
        {user.is_patient ?
          <ParallaxScroll>
            {this.FlatList}
          </ParallaxScroll>
        :
          <View style={{flex:1}}>
            {this.FlatList}
          </View>
        }
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isConnected: state.netInfo.isConnected,
    user: state.user.result,
  };
};

export default (connect(mapStateToProps,undefined,null)(Home));

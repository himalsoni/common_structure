import React from "react";
import { View, ActivityIndicator, Dimensions, StyleSheet, Modal } from "react-native";
import { Color } from "@common";
const { width, height } = Dimensions.get("window");

const SIZES = { SMALL: "small", LARGE: "large" };

class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    const { animating } = nextProps;
    this.setState({ animating });
  }

  render() {
    const { size, color } = this.props;
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={true}>
          <View style={styles.container_overlay}>
            <ActivityIndicator
              size={size}
              color={color}
              style={[
                styles.wrapper,
                { borderRadius: size == SIZES.SMALL ? 10 : 20 },
              ]}
            />
          </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container_overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width,
    height,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    backgroundColor: "transparent",
    zIndex: 100,
    marginBottom:100,
  },
});

Spinner.defaultProps = {
  color: Color.theme,
  size: "large",
};

export default Spinner;
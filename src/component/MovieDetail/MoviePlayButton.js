import React from "react";
import { View, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

import { orange, white } from "../../helper/Color";

const MoviePlayButton = () => {
  return (
    <View style={_styles.wrapper}>
      <Icon name={"play"} size={20} color={white} style={_styles.icon} />
    </View>
  );
};

export default MoviePlayButton;

const _styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    right: 0,
    top: -30,
    marginRight: 32,
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: orange,
    justifyContent: "center",
  },

  icon: {
    alignSelf: "center",
  },
});

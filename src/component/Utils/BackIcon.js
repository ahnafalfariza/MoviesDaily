import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import { Ionicons } from "@expo/vector-icons";
import { black } from "../../helper/Color";

const BackIcon = ({ style, navigation, color = black }) => {
  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={32} color={color} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default BackIcon;

BackIcon.propTypes = {
  style: PropTypes.object,
  navigation: PropTypes.object,
  color: PropTypes.string,
};

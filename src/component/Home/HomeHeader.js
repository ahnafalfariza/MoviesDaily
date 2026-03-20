import React from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";
import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

import MenuIcon from "../../assets/icons/open-menu.png";

const HomeHeader = ({ navigation, type }) => {
  return (
    <View style={{ margin: 16, flexDirection: "row", justifyContent: "space-between" }}>
      <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
        <Image source={MenuIcon} style={{ width: 20, height: 20 }} />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("Search", { type: type })}>
        <Feather name="search" size={20} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default HomeHeader;

HomeHeader.propTypes = {
  navigation: PropTypes.object,
  type: PropTypes.oneOf(["tv", "movie"]),
};

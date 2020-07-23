import React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Feather";

import MenuIcon from "../assets/icons/open-menu.png";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Menu = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.toggleDrawer()}>
      <FastImage source={MenuIcon} style={{ width: 20, height: 20 }} />
    </TouchableWithoutFeedback>
  );
};

const Search = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Search")}>
      <Icon name={"search"} size={20} />
    </TouchableWithoutFeedback>
  );
};

const Header = ({ navigation }) => {
  return (
    <View style={{ margin: 16, flexDirection: "row", justifyContent: "space-between" }}>
      <Menu navigation={navigation} />
      <Search navigation={navigation} />
    </View>
  );
};

export default Header;

import React from "react";
import { View } from "react-native";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/Feather";

import MenuIcon from "../assets/icons/open-menu.png";

const Header = () => {
  return (
    <View style={{ margin: 16, flexDirection: "row", justifyContent: "space-between" }}>
      <FastImage source={MenuIcon} style={{ width: 20, height: 20 }} />
      <Icon name={"search"} size={20} />
    </View>
  );
};

export default Header;

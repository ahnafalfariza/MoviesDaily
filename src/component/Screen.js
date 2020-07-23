import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

import { white } from "../helper/Color";

const Screen = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: white, marginTop: StatusBar.currentHeight }}>
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />
      {children}
    </SafeAreaView>
  );
};

export default Screen;

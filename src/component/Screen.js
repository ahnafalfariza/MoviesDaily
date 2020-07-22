import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

const Screen = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff", marginTop: StatusBar.currentHeight }}>
      <StatusBar barStyle="default" translucent backgroundColor="transparent" />
      {children}
    </SafeAreaView>
  );
};

export default Screen;

import React from "react";
import PropTypes from "prop-types";
import { StatusBar, View, SafeAreaView, Platform, StyleSheet } from "react-native";

import { getStatusBarHeight } from "react-native-status-bar-height";
import { white } from "../helper/Color";

const Container = ({ children }) => {
  if (Platform.OS === "ios") {
    return <View style={_styles.container}>{children}</View>;
  } else {
    return <SafeAreaView style={_styles.container}>{children}</SafeAreaView>;
  }
};

const Screen = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: white }}>
      <Container>
        <StatusBar barStyle="dark-content" translucent />
        {children}
      </Container>
    </View>
  );
};

export default Screen;

Screen.propTypes = {
  children: PropTypes.any.isRequired,
};

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    marginTop: Platform.OS === "ios" ? getStatusBarHeight() : StatusBar.currentHeight,
  },
});

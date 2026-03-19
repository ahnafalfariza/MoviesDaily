import React from "react";
import PropTypes from "prop-types";
import { StatusBar, View, SafeAreaView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { white } from "../helper/Color";

const Screen = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: white }}>
      <SafeAreaView style={[_styles.container, { marginTop: insets.top }]}>
        <StatusBar barStyle="dark-content" translucent />
        {children}
      </SafeAreaView>
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
  },
});

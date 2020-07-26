import React from "react";
import PropTypes from "prop-types";
import Webview from "react-native-webview";
import Screen from "../component/Screen";

const WebViewScreen = ({ route }) => {
  const { id } = route.params;
  const url = `https://www.youtube.com/watch?v=${id}`;
  return (
    <Screen>
      <Webview source={{ uri: url }} />
    </Screen>
  );
};

export default WebViewScreen;

WebViewScreen.propTypes = {
  route: PropTypes.any,
};

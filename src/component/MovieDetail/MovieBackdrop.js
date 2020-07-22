import React from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";

import { getImageUrl } from "../../api/url";

const MovieBackdrop = ({ movieData, children }) => {
  const url = getImageUrl(movieData.backdrop_path, "uri", "original")
  return (
    <View style={Styles.container}>
      <FastImage
        source={url}
        resizeMode={"cover"}
        style={Styles.imageStyle}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}
        locations={[0.45, 0.9]}
        style={Styles.gradientImage}
      />
      {children}
    </View>
  );
};

export default MovieBackdrop;

const Styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height / 2.5
  },

  imageStyle: {
    flex: 1,
    height: Dimensions.get("window").width * 1.7,
    width: Dimensions.get("window").width,
  },

  gradientImage: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});

import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";

import { getImageUrl } from "../api/url";

const MoviePoster = ({ item, navigation, height = 180, width = 120 }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("MovieDetail", { id: item.id });
      }}
    >
      <View style={styles.imageContainer}>
        <FastImage
          style={[styles.image, { height, width }]}
          resizeMode="cover"
          source={getImageUrl(item.poster_path)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MoviePoster;

MoviePoster.propTypes = {
  item: PropTypes.any,
  navigation: PropTypes.any,
};

const styles = StyleSheet.create({
  imageContainer: {
    margin: 4,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 12,
  },
});

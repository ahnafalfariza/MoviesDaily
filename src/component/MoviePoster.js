import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import FastImage from "react-native-fast-image";

import { getImageUrl } from "../api/url";
import { gray } from "../helper/Color";

const MoviePoster = ({ item, navigation, height = 180, width = 120, type }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (type === "tv") {
          navigation.navigate("TVDetail", { id: item.id });
        } else {
          navigation.navigate("MovieDetail", { id: item.id });
        }
      }}
    >
      <View style={styles.imageContainer}>
        <FastImage style={{ height, width }} resizeMode="cover" source={getImageUrl(item.poster_path)} />
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
    backgroundColor: gray,
    borderRadius: 12,
    overflow: "hidden",
  },
});

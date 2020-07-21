import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { getImageUrl } from "../api/url";

const MoviePoster = ({ item }) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          resizeMode="cover"
          source={getImageUrl(item.poster_path)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MoviePoster;

const styles = StyleSheet.create({
  imageContainer: {
    margin: 4,
    height: 180,
    width: 120,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
});

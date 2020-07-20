import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { requestImage } from "../api/api";

const MoviePoster = (data) => {
  return (
    <TouchableOpacity>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          resizeMode="cover"
          source={requestImage(data.item.poster_path)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MoviePoster;

const styles = StyleSheet.create({
  imageContainer: {
    margin: 4,
    height: 150,
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 8,
  },
});

import React from "react";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import { FlatList } from "react-native-gesture-handler";
import { View, Text } from "react-native";

import { getImageUrl } from "../../api/url";
import { Styles } from "./Styles";

const MovieImages = ({ images }) => {
  const imagesData = images.backdrops.slice(0, 7);
  return (
    <View>
      <Text style={Styles.titleText}>Image</Text>
      <FlatList
        keyExtractor={(item) => item.file_path}
        data={imagesData}
        renderItem={({ item }) => ImagesComponent(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const ImagesComponent = (data) => {
  const imageUrl = getImageUrl(data.file_path, "uri", "w300");
  const style = { ...Styles.movieImages, ...{ width: 100 * data.aspect_ratio } };
  return (
    <View style={[style, Styles.imagePlaceholder]}>
      <FastImage source={imageUrl} style={style} />
    </View>
  );
};

export default MovieImages;

MovieImages.propTypes = {
  images: PropTypes.object,
};

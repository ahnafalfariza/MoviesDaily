import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Image } from "expo-image";
import { View, Text, FlatList, Modal, TouchableWithoutFeedback } from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";

import { getImageUrl } from "../../api/url";
import { Styles } from "./Styles";

const MovieImages = ({ images }) => {
  const backdrops = images.backdrops;
  const [isShowModal, setIsShowModal] = useState(false);
  const [imageModalIndex, setImageModalIndex] = useState(0);

  const modalImagesUrl = useMemo(() => {
    return backdrops.map((item) => {
      const imageurl = getImageUrl(item.file_path, "url", "original");
      return { ...imageurl, width: item.width, height: item.height };
    });
  }, [backdrops]);

  const onPressImage = (index = 0) => {
    setIsShowModal((prev) => !prev);
    setImageModalIndex(index);
  };

  if (backdrops.length === 0) return null;

  return (
    <View>
      <Text style={Styles.titleText}>Images</Text>
      <FlatList
        keyExtractor={(item) => item.file_path}
        data={backdrops}
        renderItem={({ item, index }) => (
          <ImageComponent data={item} index={index} onPress={onPressImage} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <Modal visible={isShowModal} transparent={true}>
        <ImageViewer imageUrls={modalImagesUrl} onCancel={() => onPressImage()} enableSwipeDown index={imageModalIndex} />
      </Modal>
    </View>
  );
};

const ImageComponent = ({ data, index, onPress }) => {
  const imageUrl = getImageUrl(data.file_path, "uri", "w300");
  const style = { ...Styles.movieImages, width: 100 * data.aspect_ratio };

  return (
    <TouchableWithoutFeedback onPress={() => onPress(index)} style={[style, Styles.imagePlaceholder]}>
      <Image source={imageUrl} style={style} />
    </TouchableWithoutFeedback>
  );
};

export default MovieImages;

MovieImages.propTypes = {
  images: PropTypes.object,
};

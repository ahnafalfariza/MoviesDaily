import React from "react";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import { getImageUrl } from "../../api/url";
import { View, Text } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Styles } from "./Styles";
import { useRoute } from "@react-navigation/native";

const MovieRecommendations = ({ recommendations, navigation }) => {
  const movieData = recommendations.results.slice(0, 10);
  const route = useRoute().name;

  return (
    <View>
      <Text style={Styles.titleText}>Recommendations</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={movieData}
        renderItem={({ item }) => Recommendations(item, navigation, route)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Recommendations = (data, navigation, route) => {
  const imageUrl = getImageUrl(data.poster_path, "uri", "w185");

  return (
    <TouchableWithoutFeedback onPress={() => navigation.push(route, { id: data.id })}>
      <View style={[Styles.imagePlaceholder, Styles.movieRecommImages]}>
        <FastImage source={imageUrl} style={Styles.movieRecommImages} />
      </View>
      <Text style={Styles.bottomText} numberOfLines={2}>
        {data.title}
        {data.name}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default MovieRecommendations;

MovieRecommendations.propTypes = {
  navigation: PropTypes.object,
  recommendations: PropTypes.object,
  route: PropTypes.string,
};

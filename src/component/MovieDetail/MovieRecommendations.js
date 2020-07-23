import React from "react";
import FastImage from "react-native-fast-image";
import { getImageUrl } from "../../api/url";
import { View, Text } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Styles } from "./Styles";

const MovieRecommendations = ({ recommendations, navigation }) => {
  const movieData = recommendations.results.slice(0, 10);
  return (
    <View>
      <Text style={Styles.titleText}>Recommendations</Text>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={movieData}
        renderItem={({ item }) => Recommendations(item, navigation)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Recommendations = (data, navigation) => {
  const imageUrl = getImageUrl(data.poster_path, "uri", "w185");

  return (
    <TouchableWithoutFeedback onPress={() => navigation.push("MovieDetail", { id: data.id })}>
      <View style={[Styles.imagePlaceholder, Styles.movieRecommImages]}>
        <FastImage source={imageUrl} style={Styles.movieRecommImages} />
      </View>
      <Text style={Styles.bottomText} numberOfLines={2}>
        {data.title}
      </Text>
    </TouchableWithoutFeedback>
  );
};

export default MovieRecommendations;

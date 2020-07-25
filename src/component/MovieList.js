import React from "react";
import PropTypes from "prop-types";
import { FlatList, View, TouchableWithoutFeedback, Text } from "react-native";

import MoviePoster from "./MoviePoster";
import MovieRating from "./MovieDetail/MovieRating";
import { black } from "../helper/Color";
import { genres } from "../helper/Genres";

const MovieList = ({ results, navigation, type }) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={results}
      renderItem={({ item }) => MoviesPosterandInfo(item, navigation, type)}
      contentContainerStyle={{ marginVertical: 8 }}
    />
  );
};

const MoviesPosterandInfo = (data, navigation, type) => {
  return (
    <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (type === "tv") {
            navigation.navigate("TVDetail", { id: data.id });
          } else {
            navigation.navigate("MovieDetail", { id: data.id });
          }
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <MoviePoster item={data} height={150} width={100} navigation={navigation} type={type} />
          <View style={{ margin: 16, justifyContent: "center", marginBottom: 24, flex: 1 }}>
            <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 16, marginBottom: 10 }} numberOfLines={2}>
              {data.name}
              {data.title}
            </Text>
            <MovieRating rating={data.vote_average} textColor={black} />
            <Text style={{ fontFamily: "Montserrat-Light", fontSize: 12, marginTop: 10, width: "75%" }}>
              {Genres(data.genre_ids)}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Genres = (genreId = []) => {
  const text = genreId.map((item) => genres[item.toString()].name);
  return text.join(", ");
};

export default MovieList;

MovieList.propTypes = {
  results: PropTypes.array,
  navigation: PropTypes.object,
  type: PropTypes.oneOf(["tv", "movie"]),
};

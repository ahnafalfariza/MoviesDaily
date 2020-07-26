import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { genres } from "../helper/Genres";
import { View, TouchableWithoutFeedback, Text } from "react-native";
import MoviePoster from "./MoviePoster";
import MovieRating from "./MovieDetail/MovieRating";
import { black } from "../helper/Color";

class MoviesPosterandInfo extends PureComponent {
  Genres = (genreId = []) => {
    const text = genreId.map((item) => genres[item.toString()].name);
    return text.join(", ");
  };

  render() {
    const { data, navigation, type } = this.props;
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
                {this.Genres(data.genre_ids)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default MoviesPosterandInfo;

MoviesPosterandInfo.propTypes = {
  data: PropTypes.object,
  navigation: PropTypes.object,
  type: PropTypes.oneOf(["tv", "movie"]),
};

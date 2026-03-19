import React, { useState, useEffect } from "react";
import { View, StatusBar, ScrollView, StyleSheet } from "react-native";

import { requestMovieDetailScreen } from "../api/api";

import MovieBackdrop from "../component/MovieDetail/MovieBackdrop";
import MovieOverview from "../component/MovieDetail/MovieOverview";
import MovieImages from "../component/MovieDetail/MovieImages";
import MovieCast from "../component/MovieDetail/MovieCast";
import MovieRecommendations from "../component/MovieDetail/MovieRecommendations";
import MovieGenres from "../component/MovieDetail/MovieGenres";
import MovieRating from "../component/MovieDetail/MovieRating";
import MoviePlayButton from "../component/MovieDetail/MoviePlayButton";
import MovieTitle from "../component/MovieDetail/MovieTitle";
import { black, white } from "../helper/Color";
import BackIcon from "../component/Utils/BackIcon";

const MovieDetailScreen = ({ route, navigation }) => {
  const [movieData, setMovieData] = useState({});
  const [credit, setCredit] = useState({});
  const [images, setImages] = useState({});
  const [videos, setVideos] = useState({});
  const [recommendations, setRecommendations] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const { id } = route.params;
    requestMovieDetailScreen(id, (response) => {
      const [movieData, credit, images, videos, recommendations] = response;
      setMovieData(movieData);
      setCredit(credit);
      setImages(images);
      setVideos(videos);
      setRecommendations(recommendations);
      setIsLoaded(true);
    });
  }, [route.params]);

  return (
    <View style={{ flex: 1, backgroundColor: white }}>
      <ScrollView style={Styles.scrollview} contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
        <StatusBar translucent backgroundColor="transparent" />
        <MovieBackdrop backdrop={movieData.backdrop_path}>
          {isLoaded && (
            <View>
              <MovieTitle title={movieData.title} />
              <MovieRating rating={movieData.vote_average} />
            </View>
          )}
        </MovieBackdrop>
        <View style={Styles.movieDetailWrapper}>
          <View style={Styles.movieDetail}>
            {isLoaded && (
              <View>
                <MovieGenres genre={movieData.genres} />
                <MovieOverview overview={movieData.overview} />
                <MovieCast credit={credit} />
                <MovieImages images={images} />
                <MovieRecommendations recommendations={recommendations} navigation={navigation} />
              </View>
            )}
          </View>
          <MoviePlayButton videoData={videos} navigation={navigation} />
        </View>
      </ScrollView>
      <BackIcon navigation={navigation} style={{ marginLeft: 5, position: "absolute", top: 40 }} color={white} />
    </View>
  );
};

export default MovieDetailScreen;

const Styles = StyleSheet.create({
  scrollview: {
    backgroundColor: white,
    flexGrow: 1,
  },

  movieDetailWrapper: {
    flex: 1,
    backgroundColor: black,
  },

  movieDetail: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: white,
  },
});

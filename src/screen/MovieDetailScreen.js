import React, { Component } from "react";
import PropTypes from "prop-types";
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

class MovieDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {},
      credit: {},
      images: {},
      videos: {},
      recommendations: {},
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.requestInfoDetail();
  }

  requestInfoDetail = async () => {
    const { id } = this.props.route.params;
    console.log("movie id", id);

    await requestMovieDetailScreen(id, this.callbackRequest);
  };

  callbackRequest = (response) => {
    const [movieData, credit, images, videos, recommendations] = response;
    this.setState({ movieData, credit, images, videos, recommendations, isLoaded: true });
  };

  movieInfoGeneral = () => {
    const { movieData, isLoaded } = this.state;
    return (
      <MovieBackdrop backdrop={movieData.backdrop_path}>
        {isLoaded && (
          <View>
            <MovieTitle title={movieData.title} />
            <MovieRating rating={movieData.vote_average} />
          </View>
        )}
      </MovieBackdrop>
    );
  };

  movieInfoDetail = () => {
    const { movieData, credit, isLoaded, images, videos, recommendations } = this.state;
    const { navigation } = this.props;
    return (
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
    );
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: white }}>
        <ScrollView style={Styles.scrollview} contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
          <StatusBar translucent backgroundColor={"transparent"} />
          {this.movieInfoGeneral()}
          {this.movieInfoDetail()}
        </ScrollView>
        <BackIcon navigation={navigation} style={{ marginLeft: 5, position: "absolute", top: 40 }} color={white} />
      </View>
    );
  }
}

export default MovieDetailScreen;

MovieDetailScreen.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.object,
};

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

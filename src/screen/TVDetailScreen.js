import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StatusBar, ScrollView, StyleSheet } from "react-native";

import { requestTvDetailScreen } from "../api/api";

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

class TVDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {},
      credit: {},
      images: {},
      recommendations: {},
      isLoaded: false,
    };
  }

  componentDidMount() {
    this.requestInfoDetail();
  }

  requestInfoDetail = async () => {
    const { id } = this.props.route.params;
    console.log("tv id", id);
    const [movieData, credit, images, recommendations] = await requestTvDetailScreen(id);
    this.setState({ movieData, credit, images, recommendations, isLoaded: true });
  };

  movieInfoGeneral = () => {
    const { movieData, isLoaded } = this.state;
    return (
      <MovieBackdrop backdrop={movieData.backdrop_path}>
        {isLoaded && (
          <View>
            <MovieTitle title={movieData.name} />
            <MovieRating rating={movieData.vote_average} />
          </View>
        )}
      </MovieBackdrop>
    );
  };

  movieInfoDetail = () => {
    const { movieData, credit, isLoaded, images, recommendations } = this.state;
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
        <MoviePlayButton />
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={Styles.scrollview}>
        <StatusBar translucent backgroundColor={"transparent"} />
        {this.movieInfoGeneral()}
        {this.movieInfoDetail()}
      </ScrollView>
    );
  }
}

export default TVDetailScreen;

TVDetailScreen.propTypes = {
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

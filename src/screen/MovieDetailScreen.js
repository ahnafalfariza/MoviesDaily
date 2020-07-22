import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StatusBar, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { requestMovieDetail } from "../api/api";
import MovieBackdrop from "../component/MovieDetail/MovieBackdrop";
import MovieOverview from "../component/MovieDetail/MovieOverview";

class MovieDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {},
    };
  }

  componentDidMount() {
    this.requestInfoDetail();
  }

  requestInfoDetail = async () => {
    const { id } = this.props.route.params;
    const data = await requestMovieDetail(id);
    this.setState({ movieData: data });
  };

  render() {
    const { movieData } = this.state;
    return (
      <ScrollView style={{ backgroundColor: "#ffffff", flexGrow: 1 }}>
        <StatusBar translucent />
        <MovieBackdrop movieData={movieData}>
          <MovieTitle movieData={movieData} />
        </MovieBackdrop>
        <MovieInfoDetail movieData={movieData} />
      </ScrollView>
    );
  }
}

const MovieInfoDetail = ({ movieData }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <View
        style={{
          flex: 1,
          padding: 16,
          paddingTop: 24,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: "#ffffff",
        }}
      >
        <Genres genre={movieData.genres} />
        <MovieOverview overview={movieData.overview} />
        <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 18, marginBottom: 4, marginTop: 24 }}>Cast</Text>
        <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 18, marginBottom: 4, marginTop: 24 }}>Video</Text>
        <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 18, marginBottom: 4, marginTop: 24 }}>
          Movies like this
        </Text>
      </View>
    </View>
  );
};

const Genres = ({ genre = [] }) => {
  let component = genre.map((item, index) => {
    return (
      <View
        key={index}
        style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderWidth: 0.75,
          borderColor: "#000080",
          borderRadius: 4,
          marginRight: 4,
        }}
      >
        <Text style={{ color: "#000080", fontFamily: "Montserrat-Light", fontSize: 12 }}>{item.name}</Text>
      </View>
    );
  });

  return <View style={{ flexDirection: "row" }}>{component}</View>;
};

const MovieTitle = ({ movieData }) => {
  return (
    <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, margin: 16, borderTopLeftRadius: 16 }}>
      <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 24, color: "#ffffff" }}>{movieData.title}</Text>
      <View style={{ width: 30, height: 5, backgroundColor: "#ffffff", marginTop: 4 }} />
      <MovieRatingAndDuration rating={movieData.vote_average} duration={movieData.runtime} />
    </View>
  );
};

const MovieRatingAndDuration = ({ rating, duration }) => {
  const getDuration = () => {
    if (duration <= 60) {
      return `${duration}m`;
    } else {
      const h = Math.floor(duration / 60);
      const m = duration % 60;
      return `${h}h ` + (m != 0 ? `${m}m` : "");
    }
  };

  const Star = ({ color, rating = 10 }) => {
    const items = [];
    for (let i = 1; i <= 5; i++) {
      items.push(<Icon key={i} name="star" size={15} color={color} />);
    }
    return (
      <View style={{ position: "absolute", flexDirection: "row", overflow: "hidden", width: 75 * (rating / 10) }}>
        {items}
      </View>
    );
  };

  const Rating = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Star color={"#ffffff"} />
        <Star color={"#ffd700"} rating={rating} />
        <Text style={{ color: "#ffffff", marginLeft: 75, fontFamily: "Montserrat-Medium" }}>
          {(rating / 2).toFixed(1)}
        </Text>
      </View>
    );
  };

  const Duration = () => {
    return (
      <Text style={{ color: "#ffffff", position: "absolute", right: 0, fontFamily: "Montserrat-Medium" }}>
        {getDuration()}
      </Text>
    );
  };

  return (
    <View style={{ flexDirection: "row", marginTop: 8 }}>
      <Rating />
      <Duration />
    </View>
  );
};

export default MovieDetailScreen;

MovieDetailScreen.propTypes = {
  route: PropTypes.any,
};

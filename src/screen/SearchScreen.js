import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import { FlatList, TouchableWithoutFeedback } from "react-native-gesture-handler";

import Screen from "../component/Screen";
import MoviePoster from "../component/MoviePoster";
import MovieRating from "../component/MovieDetail/MovieRating";
import { requestSearchMovie } from "../api/api";
import { genres } from "../helper/Genres";

import Icon from "react-native-vector-icons/Feather";
import { orange, lightGray, black } from "../helper/Color";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {},
      isLoaded: false,
    };
  }

  renderTitle = () => {
    return (
      <View>
        <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 20, textAlign: "center", marginTop: 24 }}>
          Search Movies
        </Text>
        <View
          style={{
            width: 30,
            height: 5,
            backgroundColor: orange,
            marginTop: 4,
            marginBottom: 12,
            alignSelf: "center",
          }}
        />
        <Text
          style={{
            margin: 16,
            marginTop: 5,
            fontFamily: "Montserrat-Regular",
            fontSize: 12,
            textAlign: "center",
            alignSelf: "center",
            width: "70%",
          }}
        >
          {"We'll help you find your favorite movies. Discover wonderful movies."}
        </Text>
      </View>
    );
  };

  renderSearchText = () => {
    return (
      <View style={{ marginHorizontal: 16, backgroundColor: lightGray, borderRadius: 24, flexDirection: "row" }}>
        <Icon name={"search"} size={20} style={{ margin: 12 }} />
        <View style={{ alignSelf: "center", flex: 1 }}>
          <TextInput
            style={{ fontFamily: "Montserrat-Medium", fontSize: 14, flex: 1, marginRight: 12 }}
            placeholder={"Avengers: End Gamee"}
            onChangeText={(text) => this.requestMovie(text)}
            returnKeyType={"search"}
            autoCorrect={false}
          />
        </View>
      </View>
    );
  };

  renderListMovies = () => {
    const { results = [] } = this.state.search;
    const { navigation } = this.props;
    return <ListMovies results={results} navigation={navigation} />;
  };

  render() {
    return (
      <Screen>
        {this.renderTitle()}
        {this.renderSearchText()}
        {this.renderListMovies()}
      </Screen>
    );
  }

  renderMovies = () => {
    const { results = [] } = this.state.search;
    return results.map((item) => <Text key={item.id}>{item.title}</Text>);
  };

  requestMovie = async (text) => {
    const search = await requestSearchMovie(text);
    this.setState({ search, isLoaded: true });
  };
}

const ListMovies = ({ results, navigation }) => {
  return (
    <FlatList
      keyExtractor={(item) => item.id.toString()}
      data={results}
      renderItem={({ item }) => MoviesPosterandInfo(item, navigation)}
      contentContainerStyle={{ marginVertical: 8 }}
    />
  );
};

const MoviesPosterandInfo = (data, navigation) => {
  return (
    <View style={{ marginHorizontal: 16, marginVertical: 8 }}>
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("MovieDetail", { id: data.id })}
        style={{ flexDirection: "row" }}
      >
        <MoviePoster item={data} height={150} width={100} navigation={navigation} />
        <View style={{ margin: 16, justifyContent: "center", marginBottom: 24, flex: 1 }}>
          <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 16, marginBottom: 10 }} numberOfLines={2}>
            {data.title}
          </Text>
          <MovieRating rating={data.vote_average} textColor={black} />
          <Text style={{ fontFamily: "Montserrat-Light", fontSize: 12, marginTop: 10, width: "75%" }}>
            {Genres(data.genre_ids)}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Genres = (genreId = []) => {
  const text = genreId.map((item) => genres[item.toString()].name);
  return text.join(", ");
};

export default SearchScreen;

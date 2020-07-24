import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import Screen from "../component/Screen";
import { requestSearchMovie, requestSearchTv } from "../api/api";
import { orange, lightGray } from "../helper/Color";
import ListMovies from "../component/MovieList";

import Icon from "react-native-vector-icons/Feather";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {},
    };
  }

  renderHeaderTitle = () => {
    const { type } = this.props.route.params;
    const title = type === "tv" ? "TV Shows" : "Movies";
    return (
      <View>
        <Text style={_styles.headerTitle}>{`Search ${title}`}</Text>
        <View style={_styles.titleBar} />
        <Text style={_styles.subTitle}>
          {`We'll help you find your favorite ${title}. Discover wonderful ${title}.`}
        </Text>
      </View>
    );
  };

  renderSearchText = () => {
    return (
      <View style={_styles.searchContainer}>
        <Icon name={"search"} size={20} style={{ margin: 12 }} />
        <View style={{ alignSelf: "center", flex: 1 }}>
          <TextInput
            style={_styles.searchInput}
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
    const { type } = this.props.route.params;
    const { navigation } = this.props;
    return <ListMovies results={results} navigation={navigation} type={type} />;
  };

  render() {
    return (
      <Screen>
        {this.renderHeaderTitle()}
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
    const { type } = this.props.route.params;
    const requestSearch = type === "tv" ? requestSearchTv : requestSearchMovie;
    if (text !== "") {
      const search = await requestSearch(text);
      this.setState({ search });
    }
  };
}

export default SearchScreen;

const _styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 24,
  },

  titleBar: {
    width: 40,
    height: 5,
    backgroundColor: orange,
    marginTop: 4,
    marginBottom: 12,
    alignSelf: "center",
  },

  subTitle: {
    margin: 16,
    marginTop: 5,
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    width: "70%",
  },

  searchContainer: {
    marginHorizontal: 16,
    backgroundColor: lightGray,
    borderRadius: 24,
    flexDirection: "row",
  },

  searchInput: {
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    flex: 1,
    marginRight: 12,
  },
});

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, TextInput, View, StyleSheet } from "react-native";

import Screen from "../component/Screen";
import { requestSearchMovie, requestSearchTv } from "../api/api";
import { orange, lightGray } from "../helper/Color";
import MovieList from "../component/MovieList";

import Icon from "react-native-vector-icons/Ionicons";
import BackIcon from "../component/Utils/BackIcon";

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {},
    };
  }

  renderHeaderTitle = () => {
    const { type } = this.props.route.params;
    const { navigation } = this.props;
    const title = type === "tv" ? "TV Shows" : "Movies";

    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>{`Search ${title}`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={_styles.titleBar} />
        <Text style={_styles.subTitle}>
          {`We'll help you find your favorite ${title.toLowerCase()}. Discover wonderful ${title.toLowerCase()}.`}
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
            placeholder={"Avengers: End Game"}
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
    return <MovieList results={results} navigation={navigation} type={type} />;
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
      if (search) this.setState({ search });
    }
  };
}

export default SearchScreen;

SearchScreen.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.object,
};

const _styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    flex: 8,
    textAlign: "center",
    alignSelf: "center",
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

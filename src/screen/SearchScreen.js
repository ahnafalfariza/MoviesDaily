import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import Screen from "../component/Screen";
import { requestSearchMovie, requestSearchTv } from "../api/api";
import { orange, lightGray } from "../helper/Color";
import MovieList from "../component/MovieList";

import { Ionicons } from "@expo/vector-icons";
import BackIcon from "../component/Utils/BackIcon";

const SearchScreen = ({ route, navigation }) => {
  const [search, setSearch] = useState({});
  const { type } = route.params;
  const title = type === "tv" ? "TV Shows" : "Movies";

  const requestMovie = async (text) => {
    const requestSearch = type === "tv" ? requestSearchTv : requestSearchMovie;
    if (text !== "") {
      const result = await requestSearch(text);
      if (result) setSearch(result);
    }
  };

  const { results = [] } = search;

  return (
    <Screen>
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>{`Search ${title}`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }} />
        </View>
        <View style={_styles.titleBar} />
        <Text style={_styles.subTitle}>
          {`We'll help you find your favorite ${title.toLowerCase()}. Discover wonderful ${title.toLowerCase()}.`}
        </Text>
      </View>
      <View style={_styles.searchContainer}>
        <Ionicons name="search" size={20} style={{ margin: 12 }} />
        <View style={{ alignSelf: "center", flex: 1 }}>
          <TextInput
            style={_styles.searchInput}
            placeholder="Avengers: End Game"
            onChangeText={(text) => requestMovie(text)}
            returnKeyType="search"
            autoCorrect={false}
          />
        </View>
      </View>
      <MovieList results={results} navigation={navigation} type={type} />
    </Screen>
  );
};

export default SearchScreen;

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

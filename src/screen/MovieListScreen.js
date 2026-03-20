import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet } from "react-native";

import MovieList from "../component/MovieList";
import Screen from "../component/Screen";
import { fetchFunctionListScreen } from "../helper/Types";
import BackIcon from "../component/Utils/BackIcon";
import { orange } from "../helper/Color";

const MovieListScreen = ({ route, navigation }) => {
  const { data: initialData, type, title } = route.params;
  const [page, setPage] = useState(1);
  const [data, setData] = useState(initialData);

  const onReachEnd = useCallback(async () => {
    const nextPage = page + 1;
    const fetchUrl = fetchFunctionListScreen(type, title);
    const response = await fetchUrl({ page: nextPage });

    if (response) {
      setPage(nextPage);
      setData((prevData) => [...prevData, ...response.results]);
    }
  }, [page, type, title]);

  return (
    <Screen>
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>{`${title} ${type === "tv" ? "TV Show" : "Movies"}`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }} />
        </View>
        <View style={_styles.titleBar} />
      </View>
      <MovieList results={data} navigation={navigation} onReachEnd={onReachEnd} type={type} />
    </Screen>
  );
};

export default MovieListScreen;

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
    alignSelf: "center",
  },
});

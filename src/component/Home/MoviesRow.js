import React from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, StyleSheet } from "react-native";

import MoviePoster from "../MoviePoster";
import { normalize } from "../../helper/FontSize";

const MoviesRow = ({ data, title, navigation, type }) => {
  return (
    <View>
      <Text style={Styles.text}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => <MoviePoster item={item} navigation={navigation} type={type} />}
        keyExtractor={(item) => item.id.toString()}
        style={{ margin: 8, marginTop: 4 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

MoviesRow.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string,
  navigation: PropTypes.any,
};

export default MoviesRow;

const Styles = StyleSheet.create({
  text: {
    fontSize: normalize(15),
    margin: 16,
    marginBottom: 0,
    fontFamily: "Montserrat-SemiBold",
  },
});

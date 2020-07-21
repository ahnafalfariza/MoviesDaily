import React from "react";
import PropTypes from "prop-types";
import { View, Text, FlatList, StyleSheet } from "react-native";

import MoviePoster from "./MoviePoster";

const MoviesRow = ({ data, title }) => {
  return (
    <View>
      <Text style={Styles.text}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        renderItem={MoviePoster}
        keyExtractor={(item) => item.id.toString()}
        style={{ margin: 4 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

MoviesRow.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string,
};

export default MoviesRow;

const Styles = StyleSheet.create({
  text: {
    fontSize: 21,
    margin: 8,
    marginBottom: 0,
    fontFamily: "Montserrat-Bold",
  },
});

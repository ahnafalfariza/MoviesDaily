import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import { darkBlue } from "../../helper/Color";

const MovieGenres = ({ genre }) => {
  let component = genre.map((item, index) => {
    return (
      <View key={index} style={_styles.view}>
        <Text style={_styles.text}>{item.name}</Text>
      </View>
    );
  });

  return <View style={_styles.container}>{component}</View>;
};

export default MovieGenres;

MovieGenres.propTypes = {
  genre: PropTypes.array,
};

MovieGenres.defaultProps = {
  genre: [],
};

const _styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "70%",
  },

  view: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 0.75,
    borderColor: darkBlue,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },

  text: {
    color: darkBlue,
    fontFamily: "Montserrat-Light",
    fontSize: 12,
  },
});

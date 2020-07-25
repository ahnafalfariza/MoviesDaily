import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import { white, yellow } from "../../helper/Color";

const MovieRating = ({ rating, style, textColor = white }) => {
  const Rating = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <Star color={white} />
        <Star color={yellow} rating={rating} />
        <Text style={[_styles.ratingText, { color: textColor }]}>{(rating / 2).toFixed(1)}</Text>
      </View>
    );
  };

  const Star = ({ color, rating = 10 }) => {
    const items = [];
    for (let i = 1; i <= 5; i++) {
      items.push(<Icon key={i} name="star" size={15} color={color} />);
    }
    return <View style={[_styles.star, { width: 75 * (rating / 10) }]}>{items}</View>;
  };

  return (
    <View style={{ flexDirection: "row", ...style }}>
      <Rating />
    </View>
  );
};

export default MovieRating;

MovieRating.propTypes = {
  rating: PropTypes.number,
  style: PropTypes.object,
  textColor: PropTypes.string,
  color: PropTypes.string,
};

const _styles = StyleSheet.create({
  star: {
    position: "absolute",
    flexDirection: "row",
    overflow: "hidden",
  },

  ratingText: {
    color: white,
    marginLeft: 75,
    fontFamily: "Montserrat-Medium",
  },
});

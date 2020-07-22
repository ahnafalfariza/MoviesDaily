import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const MovieOverview = ({ overview }) => {
  const [textShown, setTextShown] = useState(false);
  return (
    <View>
      <Text style={Styles.titleText}>Overview</Text>
      <TouchableWithoutFeedback onPress={() => setTextShown(!textShown)}>
        <Text numberOfLines={textShown ? 0 : 3} style={Styles.textOverview}>
          {overview}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MovieOverview;

const Styles = StyleSheet.create({
  titleText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    marginBottom: 4,
    marginTop: 24,
  },

  textOverview: {
    fontFamily: "Montserrat-Regular",
  },
});

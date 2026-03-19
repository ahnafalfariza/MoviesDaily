import React, { useState, useCallback } from "react";
import PropTypes, { string, object } from "prop-types";
import { ScrollView, Text, View, StyleSheet, RefreshControl } from "react-native";

import Screen from "../Screen.js";
import MoviesRow from "./MoviesRow";
import HomeHeader from "./HomeHeader";
import { normalize } from "../../helper/FontSize";
import { orange } from "../../helper/Color";

const HomeComponent = ({ navigation, type, data, onRefresh, subTitle }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  }, [onRefresh]);

  const title = type === "tv" ? "TV Shows" : "Movies";

  return (
    <Screen>
      <HomeHeader navigation={navigation} type={type} />
      <ScrollView
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={Styles.screenTitle}>{title}</Text>
          <View style={Styles.titleBar} />
        </View>
        {subTitle.map((t, index) => (
          <MoviesRow key={index} data={{ ...data[index] }.results} title={t} navigation={navigation} type={type} />
        ))}
      </ScrollView>
    </Screen>
  );
};

export default HomeComponent;

HomeComponent.propTypes = {
  navigation: PropTypes.object,
  type: PropTypes.oneOf(["tv", "movie"]),
  data: PropTypes.arrayOf(object),
  onRefresh: PropTypes.func,
  subTitle: PropTypes.arrayOf(string),
};

const Styles = StyleSheet.create({
  screenTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: normalize(30),
    margin: 16,
    marginBottom: 0,
  },

  titleBar: {
    width: 30,
    height: 5,
    backgroundColor: orange,
    marginTop: 2,
    marginBottom: 12,
    marginLeft: 16,
  },
});

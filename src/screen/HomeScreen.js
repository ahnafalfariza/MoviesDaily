import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";

import { requestPopularMovie, requestTopRatedMovie, requestUpcomingMovie } from "../api/api";
import Screen from "../component/Screen.js";
import MoviesRow from "../component/MoviesRow";
import { normalize } from "../helper/FontSize";
import Header from "../component/Header";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: false,
    };
  }

  componentDidMount() {
    this.requestMoviesInfo();
  }

  requestMoviesInfo = async () => {
    try {
      const data = await Promise.all([requestTopRatedMovie(), requestPopularMovie(), requestUpcomingMovie()]);
      this.setState({ moviesData: data });
    } catch (error) {
      console.log(error);
    }
  };

  renderHeader = () => {
    return <Header />;
  };

  renderScreenTitle = () => {
    return (
      <View>
        <Text style={Styles.screenTitle}>Movies</Text>
        <View style={Styles.titleBar} />
      </View>
    );
  };

  renderMoviesComponent = () => {
    const { moviesData } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView>
        <MoviesRow data={{ ...moviesData[0] }.results} title={"Top Rated"} navigation={navigation} />
        <MoviesRow data={{ ...moviesData[1] }.results} title={"Popular"} navigation={navigation} />
        <MoviesRow data={{ ...moviesData[2] }.results} title={"Upcoming"} navigation={navigation} />
      </ScrollView>
    );
  };

  render() {
    return (
      <Screen>
        {this.renderHeader()}
        {this.renderScreenTitle()}
        {this.renderMoviesComponent()}
      </Screen>
    );
  }
}

export default HomeScreen;

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
    backgroundColor: "#000000",
    marginTop: 2,
    marginBottom: 12,
    marginLeft: 16,
  },
});

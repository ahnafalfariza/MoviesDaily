import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet, RefreshControl } from "react-native";

import { requestPopularMovie, requestTopRatedMovie, requestUpcomingMovie } from "../api/api";
import Screen from "../component/Screen.js";
import MoviesRow from "../component/MoviesRow";
import { normalize } from "../helper/FontSize";
import Header from "../component/Header";
import { orange } from "../helper/Color";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: false,
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.requestMoviesInfo();
  }

  requestMoviesInfo = async () => {
    try {
      const data = await Promise.all([requestPopularMovie(), requestTopRatedMovie(), requestUpcomingMovie()]);
      this.setState({ moviesData: data });
    } catch (error) {
      console.log(error);
    }
  };

  onRefresh = async () => {
    this.setState({ isRefreshing: true });
    await this.requestMoviesInfo();
    this.setState({ isRefreshing: false });
  };

  renderHeader = () => {
    const { navigation } = this.props;
    return <Header navigation={navigation} />;
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
    const { moviesData, isRefreshing } = this.state;
    const { navigation } = this.props;
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={this.onRefresh} />}>
        {this.renderScreenTitle()}
        <MoviesRow data={{ ...moviesData[0] }.results} title={"Popular"} navigation={navigation} />
        <MoviesRow data={{ ...moviesData[1] }.results} title={"Top Rated"} navigation={navigation} />
        <MoviesRow data={{ ...moviesData[2] }.results} title={"Upcoming"} navigation={navigation} />
      </ScrollView>
    );
  };

  render() {
    return (
      <Screen>
        {this.renderHeader()}
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
    backgroundColor: orange,
    marginTop: 2,
    marginBottom: 12,
    marginLeft: 16,
  },
});

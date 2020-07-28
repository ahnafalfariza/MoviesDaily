import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet } from "react-native";

import MovieList from "../component/MovieList";
import Screen from "../component/Screen";
import { fetchFunctionListScreen } from "../helper/Types";
import BackIcon from "../component/Utils/BackIcon";
import { orange } from "../helper/Color";

class MovieListScreen extends Component {
  state = {
    page: 1,
    data: this.props.route.params.data,
  };

  onReachEnd = async () => {
    const page = { page: this.state.page + 1 };
    const { type, title } = this.props.route.params;

    const fetchUrl = fetchFunctionListScreen(type, title);
    const response = await fetchUrl(page);

    if (response) {
      this.setState((prevState) => ({ page: prevState.page + 1, data: [...prevState.data, ...response.results] }));
    }
  };

  renderTitle = () => {
    const { navigation } = this.props;
    const { title, type } = this.props.route.params;
    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 24 }}>
          <BackIcon style={{ flex: 1, paddingLeft: 12, alignSelf: "flex-start" }} navigation={navigation} />
          <Text style={_styles.headerTitle}>{`${title} ${type === "tv" ? "TV Show" : "Movies"}`}</Text>
          <View style={{ flex: 1, paddingRight: 12 }}></View>
        </View>
        <View style={_styles.titleBar} />
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { type } = this.props.route.params;
    const { data } = this.state;
    return (
      <Screen>
        {this.renderTitle()}
        <MovieList results={data} navigation={navigation} onReachEnd={this.onReachEnd} type={type} />
      </Screen>
    );
  }
}

export default MovieListScreen;

MovieListScreen.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.object,
};

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

  subTitle: {
    margin: 16,
    marginTop: 5,
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center",
    width: "70%",
  },
});

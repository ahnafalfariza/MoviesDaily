import React, { Component } from "react";
import PropTypes from "prop-types";

import HomeComponent from "../component/Home/HomeComponent";
import { requestTVShowScreen as requestTVShowAPI } from "../api/api";
import { TVShowTypes } from "../helper/Types";

class TVShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesData: [],
    };
  }

  componentDidMount() {
    this.requestMovieScreen();
  }

  requestMovieScreen = async () => {
    await requestTVShowAPI((data) => this.setState({ moviesData: data }));
  };

  render() {
    return (
      <HomeComponent
        type={"tv"}
        subTitle={TVShowTypes}
        navigation={this.props.navigation}
        data={this.state.moviesData}
        onRefresh={this.requestMovieScreen}
      />
    );
  }
}

export default TVShowScreen;

TVShowScreen.propTypes = {
  navigation: PropTypes.object,
};

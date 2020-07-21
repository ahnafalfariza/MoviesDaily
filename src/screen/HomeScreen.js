import React, { Component } from "react";
import { ScrollView } from "react-native";

import {
  requestPopularMovie,
  requestTopRatedMovie,
  requestUpcomingMovie,
} from "../api/api";
import Screen from "../component/Screen.js";
import MoviesRow from "../component/MoviesRow";

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
      const data = await Promise.all([
        requestTopRatedMovie(),
        requestPopularMovie(),
        requestUpcomingMovie(),
      ]);
      this.setState({ moviesData: data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { moviesData } = this.state;
    return (
      <Screen>
        <ScrollView>
          <MoviesRow
            data={{ ...moviesData[0] }.results}
            title={"Top Rated Movies"}
          />
          <MoviesRow
            data={{ ...moviesData[1] }.results}
            title={"Popular Movies"}
          />
          <MoviesRow
            data={{ ...moviesData[2] }.results}
            title={"Upcoming Movies"}
          />
        </ScrollView>
      </Screen>
    );
  }
}

export default HomeScreen;

import React, { Component } from "react";
import { FlatList, Text } from "react-native";
import { request } from "../api/api";
import Screen from "../component/Screen.js";
import MovieRow from "../component/MovieRow";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.requestMoviesInfo();
  }

  requestMoviesInfo = async () => {
    try {
      const data = await request();
      this.setState({ results: data.results });
    } catch (error) {
      error;
    }
  };

  render() {
    return (
      <Screen>
        <Text
          style={{
            fontSize: 21,
            margin: 8,
            marginBottom: 0,
            fontFamily: "Montserrat-Bold",
          }}
        >
          Popular Movies
        </Text>
        <FlatList
          data={this.state.results}
          horizontal
          renderItem={MovieRow}
          keyExtractor={(item) => item.id.toString()}
          style={{ margin: 4 }}
          showsHorizontalScrollIndicator={false}
        />
      </Screen>
    );
  }
}

export default HomeScreen;

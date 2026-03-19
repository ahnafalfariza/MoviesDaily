import React, { useState, useEffect, useCallback } from "react";

import HomeComponent from "../component/Home/HomeComponent";
import { requestMovieScreen as RequestMovieApi } from "../api/api";
import { MovieTypes } from "../helper/Types";

const MovieScreen = ({ navigation }) => {
  const [moviesData, setMoviesData] = useState([]);

  const requestMovieScreen = useCallback(async () => {
    await RequestMovieApi((data) => setMoviesData(data));
  }, []);

  useEffect(() => {
    requestMovieScreen();
  }, [requestMovieScreen]);

  return (
    <HomeComponent
      type="movie"
      subTitle={MovieTypes}
      navigation={navigation}
      data={moviesData}
      onRefresh={requestMovieScreen}
    />
  );
};

export default MovieScreen;

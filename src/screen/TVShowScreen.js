import React, { useState, useEffect, useCallback } from "react";

import HomeComponent from "../component/Home/HomeComponent";
import { requestTVShowScreen as requestTVShowAPI } from "../api/api";
import { TVShowTypes } from "../helper/Types";

const TVShowScreen = ({ navigation }) => {
  const [moviesData, setMoviesData] = useState([]);

  const requestTVScreen = useCallback(async () => {
    await requestTVShowAPI((data) => setMoviesData(data));
  }, []);

  useEffect(() => {
    requestTVScreen();
  }, [requestTVScreen]);

  return (
    <HomeComponent
      type="tv"
      subTitle={TVShowTypes}
      navigation={navigation}
      data={moviesData}
      onRefresh={requestTVScreen}
    />
  );
};

export default TVShowScreen;

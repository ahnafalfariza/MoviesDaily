/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";

import MovieDetailScreen from "./src/screen/MovieDetailScreen";
import SearchScreen from "./src/screen/SearchScreen";
import HomeDrawerNavigator from "./src/navigator/HomeDrawerNavigator";
import TVDetailScreen from "./src/screen/TVDetailScreen";
import WebViewScreen from "./src/screen/WebViewScreen";
import MovieListScreen from "./src/screen/MovieListScreen";

import OfflineNotice from "./src/component/OfflineNotice";
import MovieSeasonScreen from "./src/screen/MovieSeasonScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeDrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
      <Stack.Screen name="TVDetail" component={TVDetailScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          gestureDirection: "vertical",
        }}
      />
      <Stack.Screen name="Webview" component={WebViewScreen} />
      <Stack.Screen name="Movielist" component={MovieListScreen} />
      <Stack.Screen name="Movieseason" component={MovieSeasonScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
      <OfflineNotice />
    </NavigationContainer>
  );
};

export default App;

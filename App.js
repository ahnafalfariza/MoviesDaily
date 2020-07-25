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

import { white } from "./src/helper/Color";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: false,
        headerTransparent: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeDrawerNavigator} options={{ headerShown: false }} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: white,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          gestureDirection: "vertical",
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;

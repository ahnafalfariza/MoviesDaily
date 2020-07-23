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
import HomeDrawerNavigator from "./src/navigator/HomeDrawerNavigator";

import { white } from "./src/helper/Color";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerTitle: false, headerTransparent: true, gestureEnabled: false }}
    >
      <Stack.Screen name="Home" component={HomeDrawerNavigator} />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetailScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
          headerBackTitleVisible: false,
          headerTintColor: white,
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

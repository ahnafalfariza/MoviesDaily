import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text } from "react-native";

import { black, white, orange } from "../helper/Color";
import TVShowScreen from "../screen/TVShowScreen";
import MovieScreen from "../screen/MovieScreen";

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Movies"
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerStyle: { width: "50%", backgroundColor: black },
        drawerActiveBackgroundColor: "transparent",
        drawerActiveTintColor: orange,
        drawerInactiveTintColor: white,
      }}
    >
      <Drawer.Screen
        name="Movies"
        component={MovieScreen}
        options={{
          drawerLabel: ({ color, focused }) => (
            <CustomDrawerLabel color={color} focused={focused} title="Movies" />
          ),
        }}
      />
      <Drawer.Screen
        name="TV Show"
        component={TVShowScreen}
        options={{
          drawerLabel: ({ color, focused }) => (
            <CustomDrawerLabel color={color} focused={focused} title="TV Shows" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const CustomDrawerLabel = ({ color, focused, title }) => {
  return (
    <Text
      style={{
        fontSize: focused ? 20 : 16,
        fontWeight: undefined,
        color: color,
        fontFamily: focused ? "Montserrat-Bold" : "Montserrat-Light",
      }}
    >
      {title}
    </Text>
  );
};

export default HomeDrawerNavigator;

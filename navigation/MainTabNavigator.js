import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import * as Speech from "expo-speech";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import BarCodeScreen from "../screens/BarCodeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CurrencyScreen from "../screens/CurrencyScreen";
import StepScreen from "../screens/StepScreen";

import ColorScreen from "../screens/ColorScreen";
import DemographicsScreen from "../screens/DemographicsScreen";
import FoodScreen from "../screens/FoodScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  ),
};

HomeStack.path = "";

const DemographicsStack = createStackNavigator(
  {
    Demographics: DemographicsScreen,
  },
  config
);

DemographicsStack.navigationOptions = {
  tabBarLabel: "Demographics",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  ),
};

DemographicsStack.path = "";

const FoodStack = createStackNavigator(
  {
    Food: FoodScreen,
  },
  config
);

FoodStack.navigationOptions = {
  tabBarLabel: "Food",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  ),
};

FoodStack.path = "";

const StepStack = createStackNavigator(
  {
    Step: StepScreen,
  },
  config
);
StepStack.navigationOptions = {
  tabBarLabel: "Steps",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  ),
};
StepStack.path = "";

const ColorStack = createStackNavigator(
  {
    Color: ColorScreen,
  },
  config
);
ColorStack.navigationOptions = {
  tabBarLabel: "Color",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  ),
};
ColorStack.path = "";

const CurrencyStack = createStackNavigator(
  {
    Currency: CurrencyScreen,
  },
  config
);

CurrencyStack.navigationOptions = {
  tabBarLabel: "Currency",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  ),
};

CurrencyStack.path = "";

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: "Links",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  ),
};

LinksStack.path = "";

const BarCodeStack = createStackNavigator(
  {
    BarCode: BarCodeScreen,
  },
  config
);

BarCodeStack.navigationOptions = {
  tabBarLabel: "BarCode",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  ),
};

BarCodeStack.path = "";

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: "Surroundings",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-options" : "md-options"}
    />
  ),
};

SettingsStack.path = "";

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  BarCodeStack,
  SettingsStack,
  CurrencyStack,
  StepStack,
  ColorStack,
  FoodStack,
  DemographicsStack,
});

tabNavigator.path = "";

export default tabNavigator;

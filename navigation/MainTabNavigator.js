import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation-tabs";
import * as Speech from "expo-speech";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Foundation,
  Feather,
} from "@expo/vector-icons";

import TabBarIcon from "../components/TabBarIcon";
import BarCodeScreen from "../screens/BarCodeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import CurrencyScreen from "../screens/CurrencyScreen";
import StepScreen from "../screens/StepScreen";

import ColorScreen from "../screens/ColorScreen";
import DemographicsScreen from "../screens/DemographicsScreen";
import FoodScreen from "../screens/FoodScreen";
import FaceDetectionScreen from "../screens/FaceDetectionScreen";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {},
});

const FaceDetectionStack = createStackNavigator(
  {
    FaceDetection: FaceDetectionScreen,
  },
  config
);

FaceDetectionStack.navigationOptions = {
  tabBarLabel: ({ focused, tintColor: color }) => (
    <MaterialCommunityIcons name="face-recognition" size={20} color={color} />
  ),
};

FaceDetectionStack.path = "";

const DemographicsStack = createStackNavigator(
  {
    Demographics: DemographicsScreen,
  },
  config
);

DemographicsStack.navigationOptions = {
  tabBarLabel: ({ focused, tintColor: color }) => (
    <Fontisto name="earth" size={20} color={color} />
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
  tabBarLabel: ({ focused, tintColor: color }) => (
    <MaterialCommunityIcons name="food" size={20} color={color} />
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
  tabBarLabel: ({ focused, tintColor: color }) => (
    <Foundation name="foot" size={20} color={color} />
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
  tabBarLabel: ({ focused, tintColor: color }) => (
    <Ionicons name="md-color-palette" size={20} color={color} />
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
  tabBarLabel: ({ focused, tintColor: color }) => (
    <MaterialCommunityIcons name="currency-usd" size={20} color={color} />
  ),
};

CurrencyStack.path = "";

const BarCodeStack = createStackNavigator(
  {
    BarCode: BarCodeScreen,
  },
  config
);

BarCodeStack.navigationOptions = {
  tabBarLabel: ({ focused, tintColor: color }) => (
    <MaterialCommunityIcons name="barcode-scan" size={20} color={color} />
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
  tabBarLabel: ({ focused, tintColor: color }) => (
    <MaterialCommunityIcons name="home-assistant" size={20} color={color} />
  ),
};

SettingsStack.path = "";
const tabNavigator = createMaterialTopTabNavigator(
  {
    BarCodeStack,
    SettingsStack,
    CurrencyStack,
    StepStack,
    ColorStack,
    FoodStack,
    //DemographicsStack,
    FaceDetectionStack,
  },
  {
    lazy: true,
    tabBarPosition: "top",
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "yellow",
      style: {
        backgroundColor: "#33344a",
        paddingTop: 30,
      },
    },
  },
  {
    //tabBarPosition: "top",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "green",
      inactiveTintColor: "#F8F8F8",
      style: {
        backgroundColor: "#0d1491",
        paddingTop: 20,
      },
      //lablePosition:"beside-icon",
      lableStyle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
      },
      indicatorStyle: {
        borderBottomColor: "#eee",
        borderBottomWidth: 70,
      },
    },
  }
);

tabNavigator.path = "";

export default tabNavigator;

import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState, useEffect } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";
import * as ImageManipulator from "expo-image-manipulator";
import { NavigationEvents } from "react-navigation";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

import Clarifai from "clarifai";
console.disableYellowBox = true;

const app = new Clarifai.App({
  apiKey: "e02c1b3436ca4a699442e0fdb7c77dda",
});
process.nextTick = setImmediate;

export default function CurrencyScreen(props) {
  const resize = async (uri) => {
    let manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { height: 300, width: 300 } }],
      { base64: true }
    );
    return manipulatedImage.base64;
  };

  const predict = async (base64) => {
    const response = await app.models.predict(
      { id: "qatari riyal", version: "aedd2bca17ba4409814ce44504a4f98a" },
      { base64 }
    );
    console.log("predict result", response);
    return response;
  };
  const [predictions, setPredictions] = useState([{ name: "hi" }]);
  const [loaded, setLoaded] = useState(true);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === "granted");
  };

  useEffect(() => {
    //Speech.speak("Currency");

    askPermission();
  }, []);
  useEffect(() => {
    console.log("sdfghjmk,l.ghjkl;/");
  }, []);

  const capturePhoto = async () => {
    const photo = await this.camera.takePictureAsync();
    console.log("uri of photo capture", photo.uri);
    return photo.uri;
  };

  //method call when Capture Image button pressed
  //set the state for predictions get

  const objectDetection = async () => {
    const photo = await capturePhoto();
    const resized = await resize(photo);
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync(require("../assets/Sounds/beep1.mp3"));
      soundObject.replayAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
    const predictions = await predict(resized);
    setPredictions(predictions.outputs[0].data.concepts);

    console.log("predictions");
    console.log(predictions);
    const arr = predictions.outputs[0].data.concepts;
    Speech.speak("This is ".concat(arr[0].name));
  };
  const check = () => {
    console.log("sdgvdsfgdsfdbrgs");
  };
  // useEffect(() => {
  //   return () => {
  //     Speech.stop();
  //   };
  // }, []);
  const setLoaded2 = () => {
    setLoaded(true);
    Speech.speak("Currency");
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillFocus={(payload) => setLoaded2(true)}
        onDidBlur={(payload) => setLoaded(false)}
      />

      {loaded && (
        <Camera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={{ flex: 1 }}
          type={Camera.Constants.Type.back}
        >
          {/* {Speech.speak("Currency")} */}
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 2,
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "#33344a",
              }}
              onPress={objectDetection}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 40,
                  marginTop: 25,
                  color: "white",
                }}
              >
                Capture Image
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "black",
              }}
              onPress={check}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {predictions[0].name}
                {predictions[0].name !== "hi" &&
                  Speech.speak("This is ".concat(predictions[0].name))}
              </Text>
            </TouchableOpacity> */}
          </View>
        </Camera>
      )}
    </View>
  );
}
CurrencyScreen.navigationOptions = {
  header: null,
};
async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require("../assets/images/robot-dev.png"),
      require("../assets/images/robot-prod.png"),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

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
import Clarifai from "clarifai";
console.disableYellowBox = true;

const app = new Clarifai.App({
  apiKey: "e02c1b3436ca4a699442e0fdb7c77dda",
});
process.nextTick = setImmediate;

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
    "a403429f2ddf4b49b307e318f00e528b",
    { base64 },
    { video: true, sampleMs: 1000 }
  );
  console.log("predict result", response);
  return response;
};

export default function FaceDetectionScreen(props) {
  const [predictions, setPredictions] = useState(0);
  const [loaded, setLoaded] = useState(true);

  const [recording, setRecording] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    setHasCameraPermission(status === "granted");
  };

  useEffect(() => {
    //Speech.speak("FaceDetection");
    askPermission();
  }, []);
  useEffect(() => {
    console.log("sdfghjmk,l.ghjkl;/");
  }, []);

  const capturePhoto = async () => {
    setRecording(true);
    const photo = await this.camera.recordAsync(
      Camera.Constants.VideoQuality["720p"],
      10,
      10,
      true,
      false
    );
    setRecording(false);

    console.log("uri of photo capture", photo.uri);
    return photo.uri;
  };

  //method call when Capture Image button pressed
  //set the state for predictions get

  const objectDetection = async () => {
    const photo = await capturePhoto();
    //const resized = await resize(photo);
    const predictions = await predict(photo);

    const totalScores = predictions.outputs[0].data.frames.reduce(
      (previousScore, currentScore, index) =>
        previousScore + currentScore.data.regions.length,
      0
    );

    setPredictions(totalScores);
    //predictions.outputs[0].data.frames[0].data.regions
    console.log("predictions");
    console.log(predictions);
  };
  const check = () => {
    console.log("sdgvdsfgdsfdbrgs");
  };

  const StopRecord = async () => {
    const photo = await this.camera.stopRecording();
    setRecording(false);
  };
  // useEffect(() => {
  //   return () => {
  //     Speech.stop();
  //   };
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillFocus={(payload) => setLoaded(true)}
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
          {Speech.speak("FaceDetection")}
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "black",
              }}
              onPress={objectDetection}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                Capture Image
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={StopRecord}
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: recording ? "#ef4f84" : "#4fef97",
              }}
            >
              <Text style={{ textAlign: "center" }}>
                {recording ? "Stop" : "Record"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "black",
              }}
              onPress={check}
            >
              {/* {predictions.map((prediction) => (
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                >
                  {prediction.name}
                  {Speech.speak(prediction.name)}
                </Text>
              ))} */}
              <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
                {predictions}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}
FaceDetectionScreen.navigationOptions = {
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

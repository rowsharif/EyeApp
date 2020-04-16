import React, { useState, useEffect } from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Speech from "expo-speech";
import { NavigationEvents } from "react-navigation";
export default function StepScreen() {
  const [isPedometerAvailable, setisPedometerAvailable] = useState("checking");
  const [pastStepCount, setpastStepCount] = useState(0);
  const [currentStepCount, setcurrentStepCount] = useState(0);

  const _subscribe = () => {
    let _subscription = Pedometer.watchStepCount((result) => {
      setcurrentStepCount(result.steps);
      // Speech.speak("Step ".concat(result.steps));
    });
    Pedometer.isAvailableAsync().then(
      (result) => {
        setisPedometerAvailable(String(result));
      },
      (error) => {
        setisPedometerAvailable("Could not get isPedometerAvailable: " + error);
      }
    );
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      (result) => {
        setpastStepCount(result.steps);
        //Speech.speak(result.steps);
      },
      (error) => {
        setpastStepCount("Could not get stepCount: " + error);
      }
    );
  };

  const _unsubscribe = () => {
    let _subscription = _subscription && _subscription.remove();
    _subscription = null;
  };
  useEffect(() => {
    _subscribe();
    //Speech.speak("Step screen.");
    //Speech.speak("Steps taken in the last 24 hours:".concat(currentStepCount));
  }, []);

  useEffect(() => {
    _unsubscribe();
    //Speech.speak("Steps");
  }, []);

  const Refresh = () => {
    Speech.speak("Restart the count");
    setcurrentStepCount(0);
    setisPedometerAvailable("checking");
    //Speech.speak("Steps taken in the last 24 hours:".concat(currentStepCount));
  };
  const [loaded, setLoaded] = useState(true);
  const setLoaded2 = () => {
    setLoaded(true);
    Speech.speak("Steps");
  };
  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillFocus={(payload) => setLoaded2(true)}
        onDidBlur={(payload) => setLoaded(false)}
      />
      {/* {Speech.speak("Steps")} */}
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
          onPress={() =>
            Speech.speak(
              "Steps taken in the last 24 hours:".concat(pastStepCount)
            )
          }
        >
          <Text
            style={{
              fontSize: 18,
              marginBottom: 40,
              marginTop: 25,
              color: "white",
            }}
          >
            Steps taken in the last 24 hours: {pastStepCount}
            {/* {Speech.speak("Steps you have taken:".concat(currentStepCount))} */}
          </Text>
        </TouchableOpacity>
      </View>
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
          onPress={() =>
            Speech.speak("Steps you have taken:".concat(currentStepCount))
          }
        >
          <Text
            style={{
              fontSize: 18,
              marginBottom: 40,
              marginTop: 25,
              color: "white",
            }}
          >
            Steps you have taken: {currentStepCount}
            {/* {Speech.speak("Steps you have taken:".concat(currentStepCount))} */}
          </Text>
        </TouchableOpacity>
      </View>
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
          onPress={Refresh}
        >
          <Text
            style={{
              fontSize: 18,
              marginBottom: 40,
              marginTop: 25,
              color: "white",
            }}
          >
            Refresh
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

StepScreen.navigationOptions = {
  title: "Steps",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 5,
  },
});

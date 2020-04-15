import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Speech from "expo-speech";
console.disableYellowBox = true;
import { NavigationEvents } from "react-navigation";

export default function BarCodeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      //Speech.speak("BarCode screen");

      setHasPermission(status === "granted");
    })();
  }, []);
  // useEffect(() => {
  //   return () => {
  //     Speech.stop();
  //   };
  // }, []);
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const response = await fetch(
      `https://api.barcodelookup.com/v2/products?barcode=${data}&formatted=y&key=jsojcjrwego49jdx4utapb5g2np48r`
    );
    const json = await response.json();
    Speech.speak("for the product".concat(json.products[0].product_name));
    console.log("json", json);
    //alert(`Product is ${json.products[0].product_name}`);
    // alert(`Product is ${json.products[0].product_name}
    // description is ${json.products[0].description}
    // color is ${json.products[0].color}`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationEvents
        onWillFocus={(payload) => setLoaded(true)}
        onDidBlur={(payload) => setLoaded(false)}
      />
      {loaded && (
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          {Speech.speak("BarCode")}
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />

          {scanned && (
            <TouchableOpacity
              style={{
                flex: 2,
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "#33344a",
              }}
              onPress={() => setScanned(false)}
            >
              <Text
                style={{
                  fontSize: 18,
                  marginBottom: 40,
                  marginTop: 25,
                  color: "white",
                }}
              >
                Tap to Scan Again
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

BarCodeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
});

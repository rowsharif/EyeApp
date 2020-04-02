import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Speech from 'expo-speech';

export default function BarCodeScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      Speech.speak("BarCode screen")

      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const response = await fetch(
      `https://api.barcodelookup.com/v2/products?barcode=${data}&formatted=y&key=kwm395rj9cfv7hxnvszaoal4mh08mj`
    );
    const json = await response.json();
    Speech.speak(json.products[0].product_name);
    console.log("json", json);
    alert(`Product is ${json.products[0].product_name}`);
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
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

BarCodeScreen.navigationOptions = {
  title: "BarCode"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});

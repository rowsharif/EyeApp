import React,{useState,useEffect} from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View,TouchableOpacity } from "react-native";

export default function StepScreen() {
    const [isPedometerAvailable,setisPedometerAvailable]=useState("checking");
    const [pastStepCount,setpastStepCount]=useState(0);
    const [currentStepCount,setcurrentStepCount]=useState(0);
    

  const _subscribe = () => {
            _subscription = Pedometer.watchStepCount(result => {
                setcurrentStepCount(result.steps)
            });
            Pedometer.isAvailableAsync().then(
            result => {
                setisPedometerAvailable(String(result))
                Speech.speak(setisPedometerAvailable(String(result)))

             },
            error => {
                setisPedometerAvailable("Could not get isPedometerAvailable: " + error)
                }
            );
            const end = new Date();
            const start = new Date();
            start.setDate(end.getDate() - 1);
            Pedometer.getStepCountAsync(start, end).then(
            result => {
                setpastStepCount(result.steps )
            },
            error => {
                setpastStepCount("Could not get stepCount: " + error)
            }
            );
  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  }; 
  useEffect(() => {
            _subscribe();
  },[])

  useEffect(()=> {
        _unsubscribe();
  },[])

  const Refresh=()=>{
        setcurrentStepCount(0);
        setpastStepCount(0);
        setisPedometerAvailable("checking")
  }

    return (
      <View style={styles.container}>
        <Text>
          Steps taken in the last 24 hours: {pastStepCount}
        </Text>
          <TouchableOpacity
        style={styles.button}
       
      >
        <Text>Steps you have taken: {currentStepCount}</Text>
      </TouchableOpacity>       
      <TouchableOpacity
        style={styles.button}
       onPress={()=>Refresh()}
      >
        <Text>Refresh</Text>
      </TouchableOpacity>           
        
       
      </View>
    );
  
}

StepScreen.navigationOptions = {
    title: "Step"
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin:5
  },
});

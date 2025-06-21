import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SpinModal = () => {
  const router = useRouter();
  const [disabled, setDisabled] = React.useState(false);

  const handleSpin = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
      alert((Math.random() * 10).toString());
    }
    , 2000); // Simulate a spin duration of 2 seconds
  };

  return (
    <View
    >
      <View style={{padding: 10, flexDirection: "row", alignItems: "center"}}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{height: "100%", alignItems: "center", justifyContent: "center"}}> 
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Spin the Wheel!
        </Text>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#fff",
            borderRadius: 15,
          }}
          disabled={disabled}
          onPress={() => handleSpin()}>
          <Text style={{fontWeight: 'bold', fontSize: 20, letterSpacing: 5}}>SPIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpinModal;

const styles = StyleSheet.create({});

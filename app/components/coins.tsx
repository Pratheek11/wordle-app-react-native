import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { appConstants } from "../colors";

const Coins = () => {
  const [coins, setCoins] = React.useState(0);
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderColor: "#000",
        borderWidth: 1,
        padding: 10,
        borderRadius: appConstants.borderRadius,
      }}
    >
      <Text>Coins : <Animated.Text entering={FadeInDown.springify().damping(80).stiffness(200)} >{coins}</Animated.Text></Text>
      <TouchableOpacity onPress={() => router.push("/components/spinModal")}>
        <Ionicons name="add-circle-outline" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Coins;

const styles = StyleSheet.create({});

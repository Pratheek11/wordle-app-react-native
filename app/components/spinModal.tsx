import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SpinModal = () => {
  const router = useRouter();
  const [coins, setCoins] = React.useState(0);
  const [spinValue, setSpinValue] = React.useState("$$$");
  const [disabled, setDisabled] = React.useState(false);
  const ty1 = useSharedValue(0);

  const animateDigits = () => {
    const springCfg = { damping: 5, stiffness: 100 };

    ty1.value = withSpring(-10, springCfg);

    setTimeout(() => {
      ty1.value = withSpring(0);
    }, 1000);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ty1.value }],
  }));

  const handleSpin = () => {
    setDisabled(true);
    setSpinValue("$$$");
    const generatedValue = Math.round(Math.random() * 10);
    animateDigits();
    setTimeout(() => {
      setDisabled(false);
      if (generatedValue > 9 && generatedValue < 100) {
        setSpinValue("0" + generatedValue);
      } else {
        setSpinValue("00" + generatedValue);
      }
      setCoins((previousVal) => previousVal + generatedValue);
    }, 1000);
  };

  return (
    <View>
      <View style={{ padding: 10, flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            borderColor: "#000",
            borderWidth: 1,
            padding: 10,
            borderRadius: 15,
          }}
        >
          <Animated.Text>
            Coins :{" "}
            <Animated.Text
              entering={FadeInDown.springify().damping(80).stiffness(200)}
            >
              {coins} <FontAwesome6 name="coins" size={12} color="black" />
            </Animated.Text>
          </Animated.Text>
        </View>
      </View>
      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Animated.Text style={[styles.numberBox, animatedStyle]}>
            {spinValue.charAt(0)}
          </Animated.Text>
          <Animated.Text style={[styles.numberBox, animatedStyle]}>
            {spinValue.charAt(1)}
          </Animated.Text>
          <Animated.Text style={[styles.numberBox, animatedStyle]}>
            {spinValue.charAt(2)}
          </Animated.Text>
        </View>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: "#000",
            borderRadius: 15,
          }}
          disabled={disabled}
          onPress={() => handleSpin()}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              letterSpacing: 5,
              color: "#fff",
            }}
          >
            SPIN
          </Text>
        </TouchableOpacity>
        <Text style={{ color: "grey" }}>Spin to get the coins</Text>
      </View>
    </View>
  );
};

export default SpinModal;

const styles = StyleSheet.create({
  numberBox: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    fontSize: 32,
    fontWeight: "bold",
  },
});

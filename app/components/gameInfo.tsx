import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GameInfo = () => {
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const gameData = data ? JSON.parse(data as string) : null;

  const getImageSource = (imgPath: string) => {
    // Adjust the path according to your folder structure
    if (imgPath === "assets/images/gameInfo/gameInfo1.png") {
      return require("../../assets/images/gameInfo/gameInfo1.png");
    }
    if (imgPath === "assets/images/gameInfo/gameInfo2.png") {
      return require("../../assets/images/gameInfo/gameInfo2.png");
    }
     if (imgPath === "assets/images/gameInfo/gameInfo3.png") {
      return require("../../assets/images/gameInfo/gameInfo3.png");
    }
    return null;
  };

  return (
    <View>
      <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {gameData && (
        <ScrollView>
          <View
            style={{
              padding: 20,
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {gameData.title}
            </Text>
            <Text style={{ fontSize: 16, color: "gray", textAlign: "center" }}>
              {gameData.description}
            </Text>
            <View>
              {gameData.rules.map((rule: string, index: number) => (
                <Text
                  key={index}
                  style={{ fontSize: 14, color: "grey", marginVertical: 2 }}
                >
                  ᐧ {rule}
                </Text>
              ))}
            </View>
            <ScrollView horizontal={true}>
              {gameData.images.map((image: string, index: number) => (
                <View key={index} style={{ marginVertical: 10 }}>
                  <Image
                    source={getImageSource(image)}
                    style={{ width: 200, height: 200, resizeMode: "cover" }}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default GameInfo;

const styles = StyleSheet.create({});

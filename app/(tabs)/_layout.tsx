import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: useColorScheme() === "dark" ? "#000" : "#fff",
          borderRadius: 15,
          marginHorizontal: 50,
          marginBottom: 36,
          position: "absolute",
          height: 50,
          overflow: "hidden",
          elevation: 1,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  height: 50,
                  width: 100,
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {focused ? (
                  <Animated.View
                    layout={FadeInRight.springify().damping(80).stiffness(200)}
                    exiting={FadeOutRight.springify()
                      .damping(80)
                      .stiffness(200)}
                    style={{
                      height: 40,
                      width: 100,
                      marginTop: 5,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#000",
                      borderRadius: 15,
                    }}
                  >
                    <Feather name="home" size={24} color="#fff" />
                  </Animated.View>
                ) : (
                  <View
                    style={{
                      height: 40,
                      width: 100,
                      marginTop: 5,
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="home" size={20} color="#000" />
                    <Animated.Text
                      entering={FadeInRight.springify()
                        .damping(80)
                        .stiffness(200)}
                      exiting={FadeOutRight.springify()
                        .damping(80)
                        .stiffness(200)}
                      style={{
                        color: "#000",
                      }}
                    >
                      Home
                    </Animated.Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  height: 50,
                  width: 100,
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {focused ? (
                  <Animated.View
                    layout={FadeInLeft.springify().damping(80).stiffness(200)}
                    exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
                    style={{
                      height: 40,
                      width: 100,
                      marginTop: 5,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#000",
                      borderRadius: 15,
                    }}
                  >
                    <Feather name="user" size={24} color="#fff" />
                  </Animated.View>
                ) : (
                  <View
                    style={{
                      height: 40,
                      width: 100,
                      marginTop: 5,
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="user" size={20} color="#000" />
                    <Animated.Text
                      entering={FadeInRight.springify()
                        .damping(80)
                        .stiffness(200)}
                      exiting={FadeOutRight.springify()
                        .damping(80)
                        .stiffness(200)}
                      style={{
                        color: "#000",
                      }}
                    >
                      Profile
                    </Animated.Text>
                  </View>
                )}
              </View>
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _layout;

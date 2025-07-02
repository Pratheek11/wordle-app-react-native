import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { initUser } from "./utils/dbUtils/userUtil";

export default function RootLayout() {

  React.useState(() => {
    initUser();
  });

  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="components/onBoardProfile/index"
          options={{
            title: "Onboard Profile",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="game/wordleGame"
          options={{
            title: "Game",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="components/spinModal"
          options={{
            title: "Spin the Wheel",
            presentation: "modal",
            animation: "slide_from_bottom",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="components/gameInfo"
          options={{
            title: "Game Info",
            presentation: "modal",
            animation: "slide_from_bottom",
            headerShown: false,
          }}
        />
      </Stack>
    </Provider>
  );
}

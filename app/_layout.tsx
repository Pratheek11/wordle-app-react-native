import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="components/onBoardProfile/index"
        options={{
          title: "Onboard Profile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
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
  );
}

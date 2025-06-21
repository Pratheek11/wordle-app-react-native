import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="game/index"
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
    </Stack>
  );
}

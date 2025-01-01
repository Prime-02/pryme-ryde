import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="signIn" />
      <Stack.Screen options={{ headerShown: false }} name="signUp" />
      <Stack.Screen options={{ headerShown: false }} name="welcome" />
    </Stack>
  );
};

export default _layout;

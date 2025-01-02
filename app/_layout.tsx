// import React from "react";
// import "../global.css";
// import { Stack } from "expo-router";
// import { useFonts } from "expo-font";

// const _layout = () => {
//   const [loaded] = useFonts({
//     "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
//     "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
//     "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
//     "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
//     "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
//     Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
//     "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
//   });
//   return (
//     <Stack>
//       <Stack.Screen options={{ headerShown: false }} name="index" />
//       <Stack.Screen options={{ headerShown: false }} name="(root)" />
//       <Stack.Screen options={{ headerShown: false }} name="(auth)" />
//     </Stack>
//   );
// };

// export default _layout;

import React, { useEffect } from "react";
import "../global.css";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { createTokenCache, tokenCache } from "@/lib/auth";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;



if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

function _layout() {
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    Jakarta: require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });
   
  useEffect(() => {
    if (!loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded])

  if (!loaded) {
    return null;
  }
  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={createTokenCache()}
    >
      <ClerkLoaded>
        <Stack>
          <Stack.Screen options={{ headerShown: false }} name="index" />
          <Stack.Screen options={{ headerShown: false }} name="(root)" />
          <Stack.Screen options={{ headerShown: false }} name="(auth)" />{" "}
        </Stack>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
export default _layout;

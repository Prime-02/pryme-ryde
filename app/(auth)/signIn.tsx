import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";

const signIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
    // confirmPassword: ''
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        console.log("Sign in successful");
        
        router.replace("/(root)/(tabs)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[250px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome
          </Text>
        </View>
        <View className="p-5 ">
          <InputField
            label={`Email`}
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
            icon={icons.email}
            containerStyle="focus:border-primary-500 "
          />
          <InputField
            label={`Password`}
            placeholder="Enter your password"
            value={form.password}
            secureTextEntry={true}
            onChangeText={(text) => setForm({ ...form, password: text })}
            icon={icons.lock}
            containerStyle="focus:border-primary-500 "
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignInPress}
            className="mt-5"
          />
          <OAuth />
          <Link href={`/signUp`} className="text-center mt-5">
            <Text className="text-primary-500">
              Don't have an account? Sign Up.
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default signIn;

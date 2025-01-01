import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const signIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    // confirmPassword: ''
  });

  const handleSignIn = async () => {};
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
            onPress={() => console.log("Sign Up")}
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

import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp, useUser } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const signUp = () => {
    const { user } = useUser();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: ''
  });
  const [verification, setVerification] = useState({
    state: `default`,
    error: ``,
    code: ``,
  });

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        // username: form.name,
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: `pending`,
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
        Alert.alert("Error", err.message);

    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await fetchAPI(`/(api)/user`, {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt?.createdUserId ,
          }),
        } )
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: `success`,
        });
        setShowSuccess(true); // Show success modal immediately
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: `Verification failed. Please try again.`,
          state: `failed`,
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.erros[0].longMessage,
        state: `failed`,
      });
    }
  };
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
            Create Your Account
          </Text>
        </View>
        <View className="p-5 ">
          <InputField
            label={`Name`}
            placeholder="Enter your name"
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            icon={icons.person}
            containerStyle="focus:border-primary-500 "
          />
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
            onPress={onSignUpPress}
            className="mt-5"
          />
          <OAuth />
          <Link href={`/signIn`} className="text-center mt-5">
            <Text className="text-primary-500">
              Already have an account? Sign In here.
            </Text>
          </Link>
        </View>

        <ReactNativeModal isVisible={verification.state === `pending`}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl text-black font-JakartaExtraBold">
              Verification
            </Text>
            <Text className="text-gray-800 text-base font-Jakart my-5">
              Enter the verification code sent to {form.email}.
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="123456"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(text) =>
                setVerification({ ...verification, code: text })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify Email"
              onPress={onVerifyPress}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccess}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-20 h-20 mx-auto my-5"
              resizeMode="contain"
            />
            <Text className="text-3xl text-black text-center font-JakartaBold">
              Verification Successful
            </Text>
            <Text className="text-gray-800 text-base font-Jakarta text-center mt-5">
              Your account has been successfully created.
            </Text>
            <CustomButton
              title="Continue"
              onPress={() => router.replace("/(root)/(tabs)/home")}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default signUp;

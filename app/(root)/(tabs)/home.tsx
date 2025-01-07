import { useLocationStore } from "@/app/store";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { icons, images, recentRides } from "@/constants";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
  const {setUserLocation, setDestinationLocation} = useLocationStore();
  const { user } = useUser();

  const loading = true;

  const [hasPermission, setHasPermission] = useState(false);
  useEffect(() => {
    const requestPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        alert("Permission to access location was denied");
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords?.latitude!,
      longitude: location.coords?.longitude!,
    })
    setUserLocation({
      latitude: location.coords?.latitude!,
      longitude: location.coords?.longitude!,
      address: `${address[0].name},  ${address[0].region}` ,
    })
  }
    requestPermission();
  }, []);

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides?.slice(0, 5)}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-3"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col justify-center items-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="No Recent Rides"
                  resizeMode="contain"
                />
                <Text>Np Recent Rides Found</Text>
              </>
            ) : (
              <ActivityIndicator size="large" color="#00000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-1xl font-JakartaExtraBold text-black">
                Welcome {user?.emailAddresses[0].emailAddress}
              </Text>
              <TouchableOpacity className="justify-center items-center w-10 h-10 bg-general-500 rounded-full">
                <Image
                  source={icons.out}
                  className="w-4 h-4"
                  alt="Log Out"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={() => {}}
            />
            <>
              <Text className="text-xl font-JakartaBold text-black mt-5 mb-3">
                Your Current Location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>
            <Text className="text-xl font-JakartaBold text-black mt-5 mb-3">
             Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
}

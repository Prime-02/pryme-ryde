import React from "react";
import {  Tabs } from "expo-router";
import { Image, ImageSourcePropType, StatusBar, Text, View } from "react-native";
import { icons } from "@/constants";

const TabIcon = ({
 source,
  focused,
}: {source: ImageSourcePropType, focused: boolean}) => {
  return (
    <View className={`flex flex-row jsutify-center items-center rounded-full ${focused ? 'bg-general-400' : ''} p-2`}>
      <View className={`rounded-full w-18 h-18 items-center justify-center`}>
     <Image
     source={source}
     tintColor={`white`}
     resizeMode="contain"
     className="w-7 h-7"
     />
      </View>
    </View>
  );
}

const _layout = () => {
  return (
    <>
   <Tabs initialRouteName="home" screenOptions={{
     headerShown: false,
     tabBarActiveTintColor: "blue",
      tabBarInactiveTintColor: "gray",
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 70,
        borderTopWidth: 0,
        elevation: 0,
        backgroundColor: "#333333",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 50,
        paddingBottom: 24,
        marginBottom: 20,
        marginHorizontal: 20,
        flexDirection: "row",
        position: "absolute",
        
      },
     }}> 
      <Tabs.Screen name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon:({focused})=><TabIcon
        source={icons.home}
        focused={focused}
        />
      }}
      />  
      <Tabs.Screen name="rides"
      options={{
        title: "Rides",
        headerShown: false,
        tabBarIcon:({focused})=><TabIcon
        source={icons.list}
        focused={focused}
        />
      }}
      />  
      <Tabs.Screen name="chat"
      options={{
        title: "Chat",
        headerShown: false,
        tabBarIcon:({focused})=><TabIcon
        source={icons.chat}
        focused={focused}
        />
      }}
      />  
      <Tabs.Screen name="profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon:({focused})=><TabIcon
        source={icons.profile}
        focused={focused}
        />
      }}
      />  
   </Tabs>
   <StatusBar barStyle={"dark-content"}/>
        </>
  );
};

export default _layout;

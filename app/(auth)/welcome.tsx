import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import Swiper from "react-native-swiper";
import { onboarding } from '@/constants';
import CustomButton from '@/components/CustomButton';


const welcome = () => {
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);   
    const isLastSlide = activeIndex === onboarding.length - 1;   
  return (
    <SafeAreaView className="flex h-full w-full justify-between items-center">
      <TouchableOpacity
        onPress={() => {
          router.replace("/signUp");
        }}
        className="w-full justify-end items-end p-4 "
      >
        <Text className="text-black font-medium font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        dot={
          <View className="w-[32px] h-[4px] bg-[#e2e8f0] rounded-full mx-1" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] bg-[#0286ff] rounded-full mx-1" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
        loop={false}
      >
     {
        onboarding.map((item) => (
            <View key={item.id} className='flex items-center justify-center p-5'>
                <Image
                source={item.image}
                className='w-full h-[300px] object-contain'
                resizeMode='contain'
                />
                <View className='flex flex-row items-center justify-center w-full mt-10 '> 
                <Text className='text-3xl text-black font-bold mx-10 text-center '>
                {item.title}
                </Text>
                </View>
                <Text className='text-lg font-JakartaSemiBold text-[#858585] mx-10 mt-3 text-center'>  
                    {item.description}
                </Text>
            </View>
        )
    )}
      </Swiper>
    <CustomButton
    onPress={() => {
        if (isLastSlide) {
          router.replace("/signUp");
        } else {
          swiperRef.current?.scrollBy(1);
        }
    }}
    title={`${isLastSlide ? "Get Started" : "Next"}`}
    className={`w-11/12 my-10`}
    />
    </SafeAreaView>
  );
}

export default welcome  
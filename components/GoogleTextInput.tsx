import { View, Text } from 'react-native'
import React from 'react'
import { GoogleInputProps } from '@/types/type'

const GoogleTextInput = ({
    icon,
    initialLocation,
    containerStyle,
    textInputBackgroundColor,
    handlePress
}: GoogleInputProps) => {
  return (
    <View className={`flex flex-row items-center justify-center rounded-xl mb-5 relative z-50 ${containerStyle}`}>
      <Text>Search</Text>
    </View>
  )
}

export default GoogleTextInput
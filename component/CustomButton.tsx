import { View, Text, TouchableOpacity, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react';
import { CustomButtonProps } from "@/type";
// clsx is not needed in React Native, but you can keep it for combining conditional classes in JS environments.
// In React Native, use StyleSheet or style props instead.
// import clsx from "clsx";

const CustomButton = ({
  onPress,
  title = "Click Me",
  style,
  textStyle,
  leftIcon,
  isLoading = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading}
      style={[
        {
          backgroundColor: '#FAC84F', // Tailwind bg-blue-600
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isLoading ? 0.7 : 1,
        },
        style as StyleProp<ViewStyle>,
      ]}
    >
      {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Text
            style={[
              {
                color: '#fff',
                fontWeight: '600',
                fontSize: 16,
              },
              textStyle as StyleProp<TextStyle>,
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
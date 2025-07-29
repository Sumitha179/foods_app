import {View,KeyboardAvoidingView, Platform, ScrollView, Dimensions, ImageBackground, Image} from 'react-native'
import { Slot} from "expo-router";
import {images} from "@/constants";


export default function AuthLayout() {
  return (
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25}}>
                  <ImageBackground source={images.pizzahut} className="size-full rounded-b-lg" resizeMode="stretch" />
                  <Image source={images.pizzalogo} className="self-center size-48 absolute -bottom-20 z-20" />
                </View>

              <Slot />  
              
            </ScrollView>
            
        </KeyboardAvoidingView>
    )
}




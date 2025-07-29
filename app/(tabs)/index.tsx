import { FlatList, Pressable,  View, Text, Image, TouchableOpacity } from 'react-native';
import { images, offers } from "@/constants";
import { Fragment } from "react";
import cn from "clsx";
import CartButton from "@/component/CartButton";
import useAuthStore from '@/store/auth.store';
import { SafeAreaView } from 'react-native-safe-area-context';




export default function Index() {
  const { user } = useAuthStore();

 return (
    <SafeAreaView className="flex-1 bg-white ">
      <FlatList
        data={offers}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }} 
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
        <View className="flex-row justify-between items-center px-5 py-4">
            <View>
              <Text className="font-semibold text-primary">DELIVER TO</Text>
            <TouchableOpacity className="flex-row items-center gap-x-1 mt-1">
              <Text className="font-bold text-black">Your Location</Text>
              <Image source={images.arrowDown} className="w-3 h-3" resizeMode="contain" />
            </TouchableOpacity>
            </View>
            <CartButton />
        </View>
      )}

        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;

          return (
            <View>
              <Pressable
                className={cn(
                  "p-9 rounded-xl m-4 items-center",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#FFFFFF22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    
                    <View className="w-1/2 h-32 justify-center items-center">
                      <Image
                        source={item.image}
                        className="w-full h-full"
                        resizeMode="contain"
                      />
                    </View>

                   
                    <View
                      className={cn(
                        "w-1/2 h-32 justify-center items-center space-y-2",
                        isEven ? "pl-10" : "pr-10"
                      )}
                    >
                      <Text className="text-xl font-bold text-white text-center leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        className="w-10 h-10"
                        resizeMode="contain"
                        tintColor="#ffffff"
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}

      // ListFooterComponent={() =>(
      // <Button 
      //     title='Try!' 
      //     onPress={ () => { Sentry.captureException(new Error('First error')) }}/>
      // )}
       
      />
      
    </SafeAreaView>
  );
}

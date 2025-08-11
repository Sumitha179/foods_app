import {
  FlatList,
  Pressable,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { offers, images } from "@/constants";
import CartButton from "@/component/CartButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Fragment } from "react";
import useAuthStore from "@/store/auth.store";

export default function Index() {
  const { user } = useAuthStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={offers}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 20
          }}>
            <View>
              <Text style={{ fontWeight: "600", color: "#FFA500", fontSize: 18 }}>DELIVER TO</Text>
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
                <Text style={{ fontWeight: "bold", color: "#222", fontSize: 16 }}>Your Location</Text>
                <Image
                  source={images.arrowDown}
                  style={{ width: 12, height: 12, marginLeft: 6 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <CartButton />
          </View>
        )}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/filterScreen",
                  params: {
                    categoryId: item.categoryId,
                    title: item.title,
                  },
                })
              }
              style={{
                padding: 24,
                borderRadius: 18,
                margin: 16,
                flexDirection: isEven ? "row-reverse" : "row",
                alignItems: "center",
                backgroundColor: item.color || "#FFA000"
              }}
              android_ripple={{ color: "#FFFFFF22" }}
            >
              {/* Image */}
              <View style={{ width: "50%", height: 128, justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={item.image}
                  style={{ width: "100%", height: "100%", borderRadius: 12 }}
                  resizeMode="contain"
                />
              </View>
              {/* Text */}
              <View style={{
                width: "50%",
                height: 128,
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: isEven ? 24 : 0,
                paddingRight: !isEven ? 24 : 0
              }}>
                <Text style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "center",
                  marginBottom: 10
                }}>
                  {item.title}
                </Text>
                <Image
                  source={images.arrowRight}
                  style={{ width: 32, height: 32, tintColor: "#fff" }}
                  resizeMode="contain"
                />
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function FilterScreen() {
  const { categoryId, title } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Category: {categoryId}</Text>
      <Text style={{ fontSize: 18 }}>Title: {title}</Text>
      {/* Here you can fetch and display data based on categoryId, etc */}
    </View>
  );
}
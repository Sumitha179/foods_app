import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "@/constants";

const CartItem = ({ item }: { item: CartItemType }) => {
  const { increaseQty, decreaseQty, removeItem } = useCartStore();

  return (
    <View style={{
      backgroundColor: "#fff",
      borderRadius: 20,
      padding: 16,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 14,
      shadowColor: "#000",
      shadowOpacity: 0.03,
      shadowRadius: 4,
      elevation: 1,
    }}>
      {/* Checkbox (fake, for demo) */}
      <View style={{ marginRight: 8 }}>
        <View style={{
          width: 20, height: 20, borderRadius: 6,
          borderWidth: 2, borderColor: "#FFA500",
          backgroundColor: "#FFA500", // checked
          alignItems: "center", justifyContent: "center",
        }}>
          {/* You can add a checkmark icon if needed */}
        </View>
      </View>

      {/* Food Image */}
      <Image
        source={{ uri: item.image_url }}
        style={{
          width: 52, height: 52, borderRadius: 12,
          marginRight: 10, backgroundColor: "#f6f6f6",
        }}
        resizeMode="cover"
      />

      {/* Info & Controls */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 17, color: "#222" }}>{item.name}</Text>
        <Text style={{ fontWeight: "600", color: "#FFA500", fontSize: 15, marginTop: 2 }}>
          ${item.price}
        </Text>

        <View style={{
          flexDirection: "row", alignItems: "center", marginTop: 5,
        }}>
          {/* Minus */}
          <TouchableOpacity
            onPress={() => decreaseQty(item.id, item.customizations!)}
            style={{
              width: 28, height: 28, borderRadius: 8,
              backgroundColor: "#FFEFD6", alignItems: "center", justifyContent: "center",
            }}
          >
            <Image
              source={images.minus}
              style={{ width: 16, height: 16, tintColor: "#FFA500" }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={{ fontWeight: "bold", fontSize: 17, marginHorizontal: 12, color: "#222" }}>
            {item.quantity}
          </Text>

          {/* Plus */}
          <TouchableOpacity
            onPress={() => increaseQty(item.id, item.customizations!)}
            style={{
              width: 28, height: 28, borderRadius: 8,
              backgroundColor: "#FFEFD6", alignItems: "center", justifyContent: "center",
            }}
          >
            <Image
              source={images.plus}
              style={{ width: 16, height: 16, tintColor: "#FFA500" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Trash */}
      <TouchableOpacity
        onPress={() => removeItem(item.id, item.customizations!)}
        style={{ marginLeft: 8 }}
      >
        <Image source={images.trash} style={{ width: 22, height: 22 }} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
export default CartItem;
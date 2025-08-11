import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { useCartStore } from "@/store/cart.store";
import CartItem from "@/component/CartItem";
import CustomHeader from "@/component/CustomHeader";
import CustomButton from "@/component/CustomButton";

const CARD_GAP = 16; // Adjust for your preferred gap
const CARD_RADIUS = 18;
const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - CARD_GAP * 3) / 2;

// Format value to INR currency
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const PaymentInfo = ({ label, value, labelStyle, valueStyle }) => (
  <View style={styles.infoRow}>
    <Text style={[styles.infoLabel, labelStyle]}>{label}</Text>
    <Text style={[styles.infoValue, valueStyle]}>{value}</Text>
  </View>
);

const CartScreen = () => {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const deliveryLocation = "Home";
  const discount = 145;
  const finalPrice = totalPrice - discount;

  const handleOrder = () => {
    Alert.alert("Order Placed", "Your order has been successfully placed!", [
      {
        text: "OK",
        onPress: () => clearCart(), // Clear the cart after ordering
      },
    ]);
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyCart}>
      <Text style={styles.emptyCartText}>Your cart is empty</Text>
    </View>
  );

  const renderFooter = () => {
    if (totalItems === 0) return null;

    return (
      <View style={styles.footer}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <PaymentInfo
            label={`Total Items (${totalItems})`}
            value={formatCurrency(totalPrice)} labelStyle={undefined} valueStyle={undefined}          />
          <PaymentInfo label="Delivery Fee" value="Free" labelStyle={undefined} valueStyle={undefined} />
          <PaymentInfo
            label="Discount"
            value={`- ${formatCurrency(discount)}`}
            valueStyle={{ color: "#0cb37b" }} labelStyle={undefined}          />
          <View style={styles.divider} />
          <PaymentInfo
            label="Total"
            value={formatCurrency(finalPrice)}
            labelStyle={styles.totalLabel}
            valueStyle={styles.totalValue}
          />
        </View>
        <CustomButton
          title="Order Now"
          style={styles.orderButton}
          onPress={handleOrder}
        />
      </View>
    );
  };

  const renderDeliveryLocation = () => (
    <View style={styles.deliveryRow}>
      <View>
        <Text style={styles.deliveryLabel}>DELIVERY LOCATION</Text>
        <Text style={styles.deliveryValue}>{deliveryLocation}</Text>
      </View>
      <TouchableOpacity style={styles.changeLocationBtn}>
        <Text style={styles.changeLocationBtnText}>Change Location</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={
          <>
            <CustomHeader title="Your Cart" />
            {renderDeliveryLocation()}
          </>
        }
        ListEmptyComponent={renderEmptyCart}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  flatListContainer: {
    paddingTop: 16,
    paddingBottom: 80,
    paddingHorizontal: 18,
  },
  deliveryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fcfcfc",
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 2,
  },
  deliveryLabel: {
    color: "#FFA500",
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 2,
  },
  deliveryValue: { color: "#222", fontWeight: "bold", fontSize: 16 },
  changeLocationBtn: {
    borderWidth: 1,
    borderColor: "#FFA500",
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 18,
    backgroundColor: "#fff",
  },
  changeLocationBtnText: {
    color: "#FFA500",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyCart: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyCartText: { fontSize: 18, color: "#bbb" },
  footer: { marginTop: 18, marginBottom: 18 },
  card: {
    backgroundColor: "#fff",
    borderRadius: CARD_RADIUS,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
    width: CARD_WIDTH,
    // vertical gap is handled by FlatList's columnWrapperStyle
    // shadow for iOS & elevation for Android:
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 22,
    marginBottom: 18,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  infoLabel: { fontSize: 15, color: "#888" },
  infoValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    textAlign: "right",
  },
  divider: {
    borderTopWidth: 1,
    borderColor: "#e2e2e2",
    marginVertical: 12,
  },
  totalLabel: { fontWeight: "bold", fontSize: 17 },
  totalValue: { fontWeight: "bold", fontSize: 17, textAlign: "right" },
  orderButton: {
    backgroundColor: "#FFA500",
    borderRadius: 30,
    paddingVertical: 14,
  },
});

export default CartScreen;

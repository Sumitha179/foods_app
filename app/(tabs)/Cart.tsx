import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "@/store/cart.store";
import CustomHeader from "@/component/CustomHeader";
import CustomButton from "@/component/CustomButton";
import CartItem from "@/component/CartItem";
import { PaymentInfoStripeProps } from "@/type";

// Format Indian currency
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const PaymentInfo = ({
  label,
  value,
  labelStyle,
  valueStyle,
}: PaymentInfoStripeProps) => (
  <View style={styles.infoRow}>
    <Text style={[styles.infoLabel, labelStyle]}>{label}</Text>
    <Text style={[styles.infoValue, valueStyle]}>{value}</Text>
  </View>
);

const Cart = () => {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const deliveryFee = 0;
  const discount = 145;
  const finalPrice = totalPrice + deliveryFee - discount;

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
            value={formatCurrency(totalPrice)}
          />
          <PaymentInfo label="Delivery Fee" value="Free" />
          <PaymentInfo
            label="Discount"
            value={`- ${formatCurrency(discount)}`}
            valueStyle={{ color: "#0cb37b" }}
          />
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
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={<CustomHeader title="Your Cart" />}
        ListEmptyComponent={renderEmptyCart}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

export default Cart;

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatListContainer: {
    paddingTop: 16,
    paddingBottom: 80,
    paddingHorizontal: 18,
  },
  emptyCart: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#bbb",
  },
  footer: {
    marginTop: 18,
    marginBottom: 18,
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
  infoLabel: {
    fontSize: 15,
    color: "#888",
  },
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
  totalLabel: {
    fontWeight: "bold",
    fontSize: 17,
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "right",
  },
  orderButton: {
    backgroundColor: "#FFA500",
    borderRadius: 30,
    paddingVertical: 14,
  },
});

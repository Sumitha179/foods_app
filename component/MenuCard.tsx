import { Text, TouchableOpacity, Image, Platform, View, ToastAndroid } from 'react-native';
import { MenuItem } from '@/type';
import { appwriteConfig, storage } from '@/lib/appwrite';
import { useCartStore } from '@/store/cart.store';

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);

const MenuCard = ({ item }: { item: MenuItem }) => {
  const { $id, name, price, image_url } = item;

  // ✅ Use File ID directly
  const fileId = image_url;
  let previewUrl = '';
  try {
    previewUrl = storage.getFileView(appwriteConfig.bucketId, fileId).toString();
  } catch (err) {
    console.warn('❗ Error generating image URL:', err);
  }

  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: $id,
      name,
      price,
      image_url: previewUrl,
      customizations: [],
    });

    if (Platform.OS === 'android') {
      ToastAndroid.show(`${name} added to cart`, ToastAndroid.SHORT);
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
        flex: 1,
        marginHorizontal: 8,
      }}
    >
      <Image
        source={{ uri: previewUrl }}
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          marginBottom: 12,
          backgroundColor: '#f9f9f9',
        }}
        resizeMode="contain"
      />

      <Text
        numberOfLines={1}
        style={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: 14,
          color: '#222',
          marginBottom: 4,
        }}
      >
        {name}
      </Text>

      <Text
        style={{
          fontSize: 13,
          color: '#888',
          marginBottom: 10,
        }}
      >
        From {formatINR(price)}
      </Text>

      <TouchableOpacity
        onPress={handleAddToCart}
        style={{
          backgroundColor: '#FFF6E5',
          borderRadius: 18,
          paddingVertical: 6,
          paddingHorizontal: 14,
        }}
      >
        <Text
          style={{
            color: '#FFA500',
            fontSize: 13,
            fontWeight: '600',
          }}
        >
          + Add to cart
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuCard;

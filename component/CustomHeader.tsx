import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View, Platform } from 'react-native';
import { CustomHeaderProps } from '@/type';
import { images } from '@/constants';

const ICON_SIZE = 28;

const CustomHeader = ({ title }: CustomHeaderProps) => {
  const router = useRouter();

  return (
    <View
      className="flex-row items-center bg-white px-4"
      style={{
        paddingVertical: 8,
        ...Platform.select({
          android: { elevation: 4, shadowColor: '#ccc' },
          ios: {
            shadowColor: '#ccc',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.10,
            shadowRadius: 5,
          },
        }),
      }}
    >
      {/* Back */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          width: ICON_SIZE + 10,
          height: ICON_SIZE + 10,
          borderRadius: ICON_SIZE,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F5F5F6',
        }}
        hitSlop={10}
      >
        <Image
          source={images.arrowBack}
          style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: "#222" }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Title */}
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{
          fontSize: 17,
          fontWeight: '600',
          color: '#222',
        }}>
          {title}
        </Text>
      </View>

      {/* Search */}
      <TouchableOpacity
        style={{
          width: ICON_SIZE + 10,
          height: ICON_SIZE + 10,
          borderRadius: ICON_SIZE,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: "#F5F5F6",
        }}
        hitSlop={10}
      >
        <Image
          source={images.search}
          style={{ width: ICON_SIZE, height: ICON_SIZE, tintColor: "#666" }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
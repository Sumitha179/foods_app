import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAppwrite from '@/lib/useAppwrite';
import { getCategories, getMenu } from '@/lib/appwrite';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import CartButton from '@/component/CartButton';
import MenuCard from '@/component/MenuCard';
import { MenuItem } from '@/type';
import Filter from '@/component/Filter';
import SearchBar from '@/component/SearchBar';

const Search = () => {
  const { category, query } = useLocalSearchParams<{ query: string; category: string }>();

  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: { category, query, limit: 6 },
  });

  const { data: categories } = useAppwrite({ fn: getCategories });

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <MenuCard item={item as unknown as MenuItem} />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          gap: 14,
        }}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
        ListHeaderComponent={() => (
          <View style={{ paddingBottom: 10 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#FFA500', textTransform: 'uppercase' }}>
                  Search
                </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#222', marginTop: 2 }}>
                  Find your favorite food
                </Text>
              </View>
              <CartButton />
            </View>

            {/* Search Bar */}
            <View style={{ marginTop: 16 }}>
              <SearchBar />
            </View>

            {/* Categories Filter */}
            <View style={{ marginTop: 18 }}>
              <Filter
                categories={(categories || []).map((cat: any) => ({
                  $id: cat.$id,
                  name: cat.name ?? '',
                  description: cat.description ?? '',
                }))}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          !loading && (
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 60 }}>
              <Text style={{ textAlign: 'center', marginTop: 18, color: '#888', fontSize: 16 }}>
                No matching results found
              </Text>
            </View>
          )
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Search;

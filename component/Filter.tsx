import { FlatList, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native';
import { Category } from "@/type";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";

type FilterData = Category | { $id: string; name: string };

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
    ...Platform.select({
      android: { elevation: 3 },
      ios: { shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2 },
    }),
  },
  pillActive: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  pillText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  pillTextActive: {
    color: '#fff',
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category ?? 'all');

  const handlePress = (id: string) => {
    setActive(id);
    if (id === 'all') router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  const filterData: FilterData[] = categories && categories.length > 0
    ? [{ $id: 'all', name: 'All' }, ...categories]
    : [{ $id: 'all', name: 'All' }];

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.pill,
            active === item.$id && styles.pillActive
          ]}
          onPress={() => handlePress(item.$id)}
        >
          <Text style={[
            styles.pillText,
            active === item.$id && styles.pillTextActive
          ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default Filter;
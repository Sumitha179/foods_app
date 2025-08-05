import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Platform, StyleSheet } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const SearchBar = () => {
  const params = useLocalSearchParams<{ query: string }>();
  const [query, setQuery] = useState(params.query || '');

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text) router.setParams({ query: undefined });
  };

  const handleSubmit = () => {
    if (query.trim()) router.setParams({ query });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchGroup}>
        <TextInput
          style={styles.input}
          placeholder="Search for any food"
          value={query}
          onChangeText={handleSearch}
          onSubmitEditing={handleSubmit}
          placeholderTextColor="#BDBDBD"
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.iconCircle}>
          <EvilIcons name="search" size={28} color="#FFA500" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  searchGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 26,
    paddingHorizontal: 16,
    height: 48,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
    }),
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: "#222",
  },
  iconCircle: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    marginLeft: 6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
      },
    }),
  },
});

export default SearchBar;
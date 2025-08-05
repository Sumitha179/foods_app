import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import useAuthStore from '@/store/auth.store';

const Profile = () => {
  // Get user from your store
  const { user } = useAuthStore();

  // If user is not loaded, show a message
  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontSize: 18, color: "#888" }}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <Image
        source={{
          uri: user.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=FFA500&color=fff`,
        }}
        style={styles.avatar}
      />

      {/* Name */}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {/* Edit Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => Alert.alert('Edit Profile', 'Edit profile coming soon!')}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 18,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 6,
  },
  email: {
    fontSize: 16,
    color: "#888",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#FFA500",
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Profile;
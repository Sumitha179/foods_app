import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import useAuthStore from '@/store/auth.store';
import logout from '@/store/auth.store';
import { useRouter } from 'expo-router';

const ProfileScreen = () => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  // Simulate Edit Profile navigation
  const handleEditProfile = () => {
    router.push('/profile'); // Use a valid route as defined in your app
  };

  // Logout logic
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logout();
            router.replace('/(auth)/sign-in'); // Redirect to sign-in after logout
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconwrapper}>
          <Feather name="arrow-left" size={24} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.iconwrapper}>
          <Feather name="search" size={24} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Avatar and Edit Icon */}
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: user.avatar ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=FFA500&color=fff`,
          }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon} onPress={handleEditProfile}>
          <Feather name="edit" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profile Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Feather name="user" size={20} color="#FFA500" style={styles.infoIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{user.name}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={20} color="#FFA500" style={styles.infoIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Feather name="phone" size={20} color="#FFA500" style={styles.infoIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>Phone number</Text>
            <Text style={styles.infoValue}>{user.phone || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={20} color="#FFA500" style={styles.infoIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>Address 1 - (Home)</Text>
            <Text style={styles.infoValue}>{user.addressHome || 'Not Provided'}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={20} color="#FFA500" style={styles.infoIcon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.infoLabel}>Address 2 - (Work)</Text>
            <Text style={styles.infoValue}>{user.addressWork || 'Not Provided'}</Text>
          </View>
        </View>
      </View>

      {/* Edit and Logout Buttons */}
      <TouchableOpacity style={styles.editBtn} onPress={handleEditProfile}>
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <MaterialIcons name="logout" size={20} color="#f55" style={{ marginRight: 8 }} />
        <Text style={styles.logoutBtnText}>Logout</Text>
      </TouchableOpacity>

      {/* Bottom Navigation (optional, per your app) */}
      <View style={styles.bottomNav}>
        {/* Add your navigation icons here */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  avatarContainer: { alignItems: 'center', marginTop: 16, marginBottom: 8 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#eee' },
  editIcon: {
    position: 'absolute',
    right: 120, // Position edit relative to avatar
    bottom: 10,
    backgroundColor: '#FFA500',
    borderRadius: 15,
    padding: 6,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 24,
    padding: 18,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },
  iconwrapper: {
    padding:4

  },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  infoIcon: { marginRight: 10 },
  infoLabel: { fontWeight: '600', color: '#888', fontSize: 13 },
  infoValue: { fontWeight: '400', color: '#222', fontSize: 15 },
  editBtn: {
    borderRadius: 20,
    borderColor: "#FFA500",
    borderWidth: 1.5,
    marginHorizontal: 32,
    marginTop: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  editBtnText: { color: "#FFA500", fontWeight: "bold", fontSize: 16 },
  logoutBtn: {
    flexDirection: 'row',
    borderRadius: 20,
    borderColor: "#f55",
    borderWidth: 1.5,
    marginHorizontal: 32,
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtnText: { color: "#f55", fontWeight: "bold", fontSize: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { fontSize: 18, color: '#888' },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 68, backgroundColor: '#fff' },
});

export default ProfileScreen;
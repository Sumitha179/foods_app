import { Redirect, Slot, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { TabBarIconProps } from "@/type";
import useAuthStore from "@/store/auth.store";
import cn from 'clsx';   
import { images } from "@/constants";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="tab-icon">
    <Image
      source={icon}
      className="size-7"
      resizeMode="contain"
      tintColor={focused ? '#FE8C00' : '#5D5F6D'}
    />
    <Text className={cn('text-sm font-bold', focused ? 'text-goldshade' : 'text-gray-200')}>
      {title}
    </Text>
  </View>
);

export default function Layout() {
  const {
    isAuthenticated,
    isLoading,
    fetchAuthenticatedUser,
  } = useAuthStore();

  useEffect(() => {
    fetchAuthenticatedUser();
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#fbbf24" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href='/sign-in' />;
  }
  

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
          marginHorizontal: 20,
          height: 80,
          position: 'absolute',
          bottom: 40,
          backgroundColor: 'white',
          shadowColor: '#1a1a1a',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" icon={images.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Search" icon={images.search} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='cart'
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cart" icon={images.bag} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Profile" icon={images.person} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
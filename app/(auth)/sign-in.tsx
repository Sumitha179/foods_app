import { View, Text, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import CustomInput from '@/component/CustomInput';
import CustomButton from '@/component/CustomButton';
import { useState } from 'react';
import { signIn, getCurrentUser } from '@/lib/appwrite';
import * as Sentry from '@sentry/react-native';

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async () => {
    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      return Alert.alert('Error', 'Please enter a valid email and password.');
    }

    setIsSubmitting(true);

    try {
      // 🔐 Sign in the user
      await signIn({ email, password });

      // 🧠 Fetch user to confirm session
      const user = await getCurrentUser();

      if (!user) {
        throw new Error('Login failed. No session found.');
      }

      router.replace('/');
    } catch (error: any) {
      console.error('SignIn Error:', error);
      Sentry.captureException(error);
      Alert.alert('Sign In Failed', error.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label="Email"
        keyboardType="email-address"
      />

      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label="Password"
        secureTextEntry
      />

      <CustomButton
        title="Sign In"
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">Don’t have an account?</Text>
        <Link href="/sign.up" className="base-bold text-goldshade">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;

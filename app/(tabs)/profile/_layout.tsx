import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="addresses" />
      <Stack.Screen name="payment-methods" />
      <Stack.Screen name="history" />
      <Stack.Screen name="rewards" />
      <Stack.Screen name="help" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
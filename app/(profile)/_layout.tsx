import { Stack } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="payment-methods" />
      <Stack.Screen name="addresses" />
      <Stack.Screen name="rewards" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="history" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="help" />
    </Stack>
  );
}
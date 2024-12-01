import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName="Landing" screenOptions={{ animation: 'fade' }}>
      <Stack.Screen name="EngageLanding" options={{ headerShown: false }} />
      <Stack.Screen name="TrackLanding" options={{ headerShown: false }} />
      <Stack.Screen name="ReportLanding" options={{ headerShown: false }} />
      <Stack.Screen name="GetStartedLanding" options={{ headerShown: false }} />
      <Stack.Screen name="SecureBlockchainLanding" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="Register" options={{ headerShown: false }} />
      <Stack.Screen name="Landing" options={{ headerShown: false }} />
    </Stack>
  );
}

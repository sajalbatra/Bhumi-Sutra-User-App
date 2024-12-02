import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Navigate only after the layout is mounted
    if (isMounted && Platform.OS === 'android') {
      router.replace('/Home');
    }
  }, [isMounted]);

  return <View />;
}

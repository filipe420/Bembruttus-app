import { useEffect } from 'react';
import { Platform } from 'react-native';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady() {
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof window.frameworkReady === 'function') {
      window.frameworkReady();
    }
  }, []); // Empty dependency array ensures the effect runs only once
}
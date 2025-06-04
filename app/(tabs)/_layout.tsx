import { Tabs } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Chrome as Home, Search, ShoppingBag, User, MapPin, Tag } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.gray[600],
        tabBarStyle: {
          ...styles.tabBar,
          height: 50 + (Platform.OS === 'ios' ? insets.bottom : 0), // ↓ diminuímos aqui
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 6, // ↓ menos padding
          paddingTop: 6, // um leve padding superior
        },
        tabBarBackground: () => (
          <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="light" />
        ),
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Cardápio',
          tabBarIcon: ({ color, size }) => <Search size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="promotions"
        options={{
          title: 'Promoções',
          tabBarIcon: ({ color, size }) => <Tag size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrinho',
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{
          title: 'Lojas',
          tabBarIcon: ({ color, size }) => <MapPin size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
  },
});

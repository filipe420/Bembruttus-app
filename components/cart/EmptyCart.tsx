import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';

export default function EmptyCart() {
  const navigateToMenu = () => {
    router.push('/(tabs)/menu');
  };
  
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/5474272/pexels-photo-5474272.jpeg' }} 
        style={styles.image} 
      />
      <Text style={styles.title}>Seu carrinho está vazio</Text>
      <Text style={styles.subtitle}>
        Adicione itens do nosso cardápio para começar seu pedido
      </Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={navigateToMenu}
      >
        <Text style={styles.buttonText}>Explorar Cardápio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: theme.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
  },
});
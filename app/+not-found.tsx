import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/5474272/pexels-photo-5474272.jpeg' }}
        style={styles.image}
      />
      
      <Text style={styles.title}>Página não encontrada</Text>
      <Text style={styles.message}>
        Desculpe, mas a página que você está procurando não existe ou foi removida.
      </Text>
      
      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Voltar para o Início</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 24,
    borderRadius: 100,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
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
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // For demo purposes, accept any input
    router.replace('/(tabs)/profile');
  };

  const windowWidth = Dimensions.get('window').width;
  const isSmallDevice = windowWidth < 375;

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg' }} 
        style={[styles.logo, isSmallDevice && styles.logoSmall]} 
      />
      <Text style={[styles.title, isSmallDevice && styles.titleSmall]}>Bem-vindo de volta!</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TextInput
        style={[styles.input, isSmallDevice && styles.inputSmall]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={[styles.input, isSmallDevice && styles.inputSmall]}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity 
        style={[styles.loginButton, isSmallDevice && styles.buttonSmall]} 
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.registerButton}
        onPress={() => router.push('/auth/register')}
      >
        <Text style={styles.registerButtonText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  logoSmall: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.text.primary,
    marginBottom: 24,
    textAlign: 'center',
  },
  titleSmall: {
    fontSize: 20,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.error,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    maxWidth: 400,
    height: Platform.OS === 'ios' ? 48 : 56,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  inputSmall: {
    height: 44,
    fontSize: 14,
    marginBottom: 12,
  },
  loginButton: {
    width: '100%',
    maxWidth: 400,
    height: Platform.OS === 'ios' ? 48 : 56,
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonSmall: {
    height: 44,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 16,
  },
  registerButton: {
    padding: 8,
  },
  registerButtonText: {
    fontFamily: 'Poppins-Medium',
    color: theme.colors.primary,
    fontSize: 14,
  },
});
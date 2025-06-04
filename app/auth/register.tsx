import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { theme } from '@/constants/theme';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        createdAt: new Date(),
        orders: [],
      });

      router.replace('/(tabs)');
    } catch (error) {
      setError('Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg' }} 
        style={styles.logo}
      />
      <Text style={styles.title}>Criar Conta</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => router.push('/auth/login')}
      >
        <Text style={styles.loginButtonText}>Já tem uma conta? Entre</Text>
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
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.text.primary,
    marginBottom: 24,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: theme.colors.error,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
  },
  registerButton: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  registerButtonText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    padding: 8,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Medium',
    color: theme.colors.primary,
    fontSize: 14,
  },
});
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface CheckoutHeaderProps {
  onBack: () => void;
}

export default function CheckoutHeader({ onBack }: CheckoutHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={onBack}
      >
        <ArrowLeft size={24} color={theme.colors.text.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>Finalizar Pedido</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
});
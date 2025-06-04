import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { useCart } from '@/contexts/CartContext';

export default function CartHeader() {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrinho</Text>
      {totalItems > 0 && (
        <Text style={styles.itemCount}>{totalItems} {totalItems === 1 ? 'item' : 'itens'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.text.primary,
  },
  itemCount: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginLeft: 12,
    backgroundColor: theme.colors.gray[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
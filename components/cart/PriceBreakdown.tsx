import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

interface PriceBreakdownProps {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
}

export default function PriceBreakdown({ 
  subtotal, 
  deliveryFee, 
  discount, 
  total 
}: PriceBreakdownProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Resumo de Valores</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Taxa de entrega</Text>
        <Text style={styles.value}>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
      </View>
      
      {discount > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Desconto</Text>
          <Text style={[styles.value, styles.discount]}>-R$ {discount.toFixed(2).replace('.', ',')}</Text>
        </View>
      )}
      
      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>R$ {total.toFixed(2).replace('.', ',')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[50],
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  value: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  discount: {
    color: theme.colors.success,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    paddingTop: 8,
    marginTop: 4,
    marginBottom: 0,
  },
  totalLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.primary,
  },
});
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CreditCard, Plus } from 'lucide-react-native';
import PageHeader from '@/components/common/PageHeader';
import { theme } from '@/constants/theme';

const paymentMethods = [
  {
    id: '1',
    type: 'credit',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: '12',
    expiryYear: '24',
    isDefault: true,
  },
  {
    id: '2',
    type: 'credit',
    last4: '1234',
    brand: 'Mastercard',
    expiryMonth: '06',
    expiryYear: '25',
    isDefault: false,
  },
];

export default function PaymentMethodsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <PageHeader title="Métodos de Pagamento" showBackButton />
      </View>

      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color={theme.colors.primary} />
            <Text style={styles.addButtonText}>Adicionar novo cartão</Text>
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.cardIcon}>
              <CreditCard size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.cardDetails}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardBrand}>{item.brand}</Text>
                {item.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Principal</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardNumber}>•••• {item.last4}</Text>
              <Text style={styles.expiryDate}>Expira em {item.expiryMonth}/{item.expiryYear}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  listContent: {
    padding: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: theme.colors.primary + '10',
    borderRadius: 12,
    marginBottom: 16,
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.primary,
    marginLeft: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardDetails: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardBrand: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: theme.colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: theme.colors.primary,
  },
  cardNumber: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  expiryDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
});
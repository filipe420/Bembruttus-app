import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PageHeader from '@/components/common/PageHeader';
import { theme } from '@/constants/theme';
import { orderHistory } from '@/data/profileData';

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <PageHeader title="Histórico de Pedidos" showBackButton />
      </View>

      <FlatList
        data={orderHistory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderDate}>{item.date}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: item.status === 'Entregue' ? theme.colors.success + '20' : theme.colors.warning + '20' }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: item.status === 'Entregue' ? theme.colors.success : theme.colors.warning }
                ]}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.orderItems}>
              {item.items.map((orderItem, index) => (
                <Text key={index} style={styles.itemText}>
                  {orderItem.quantity}x {orderItem.name}
                </Text>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.totalText}>
                Total: R$ {item.total.toFixed(2).replace('.', ',')}
              </Text>
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
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  orderItems: {
    marginBottom: 12,
  },
  itemText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    paddingTop: 12,
  },
  totalText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
});
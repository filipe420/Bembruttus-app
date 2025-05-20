import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, CreditCard, SignalLow as PaypalLogo } from 'lucide-react-native';

export default function PaymentMethodsScreen() {
  const paymentMethods = [
    {
      id: '1',
      type: 'credit',
      cardNumber: '**** **** **** 1234',
      expiryDate: '12/25',
      isDefault: true,
    },
    {
      id: '2',
      type: 'paypal',
      email: 'john.doe@example.com',
      isDefault: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FF0000" />
          <Text style={styles.addButtonText}>Add New Payment Method</Text>
        </TouchableOpacity>

        {paymentMethods.map((method) => (
          <View key={method.id} style={styles.paymentCard}>
            <View style={styles.paymentInfo}>
              {method.type === 'credit' ? (
                <CreditCard size={24} color="#333" />
              ) : (
                <PaypalLogo size={24} color="#00457C" />
              )}
              <View style={styles.paymentDetails}>
                {method.type === 'credit' ? (
                  <>
                    <Text style={styles.cardNumber}>{method.cardNumber}</Text>
                    <Text style={styles.expiryDate}>Expires {method.expiryDate}</Text>
                  </>
                ) : (
                  <Text style={styles.cardNumber}>{method.email}</Text>
                )}
                {method.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  addButtonText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#FF0000',
    fontWeight: '500',
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentDetails: {
    marginLeft: 15,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  expiryDate: {
    fontSize: 14,
    color: '#666',
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 5,
  },
  defaultText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
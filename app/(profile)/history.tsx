import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react-native';

export default function OrderHistoryScreen() {
  const orders = [
    {
      id: '1',
      orderNumber: '#MD-5432',
      date: 'May 20, 2025',
      time: '7:15 PM',
      status: 'Completed',
      restaurant: "McDonald's Downtown",
      address: '123 Main St, City Center',
      items: [
        { name: 'Quarter Pounder', quantity: 1, price: 6.49 },
        { name: 'McChicken', quantity: 1, price: 4.99 },
        { name: 'French Fries (Medium)', quantity: 2, price: 2.99 },
        { name: 'Sprite (Large)', quantity: 2, price: 1.99 },
      ],
      total: 22.95,
    },
    {
      id: '2',
      orderNumber: '#MD-5123',
      date: 'May 15, 2025',
      time: '1:30 PM',
      status: 'Completed',
      restaurant: "McDonald's Plaza",
      address: '456 Market St, Shopping District',
      items: [
        { name: 'Happy Meal', quantity: 2, price: 5.99 },
        { name: 'Big Mac', quantity: 1, price: 5.99 },
        { name: 'McFlurry', quantity: 1, price: 3.49 },
      ],
      total: 18.75,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <ScrollView style={styles.content}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderNumber}>{order.orderNumber}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{order.status}</Text>
              </View>
            </View>

            <View style={styles.orderInfo}>
              <View style={styles.infoRow}>
                <Calendar size={16} color="#666" />
                <Text style={styles.infoText}>{order.date}</Text>
              </View>
              <View style={styles.infoRow}>
                <Clock size={16} color="#666" />
                <Text style={styles.infoText}>{order.time}</Text>
              </View>
              <View style={styles.infoRow}>
                <MapPin size={16} color="#666" />
                <View style={styles.locationInfo}>
                  <Text style={styles.restaurantName}>{order.restaurant}</Text>
                  <Text style={styles.address}>{order.address}</Text>
                </View>
              </View>
            </View>

            <View style={styles.itemsList}>
              {order.items.map((item, index) => (
                <View key={index} style={styles.orderItem}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.quantity}>{item.quantity}x</Text>
                    <Text style={styles.itemName}>{item.name}</Text>
                  </View>
                  <Text style={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.reorderButton}>
                <Text style={styles.reorderText}>Reorder</Text>
              </TouchableOpacity>
            </View>
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
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  orderInfo: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 15,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  locationInfo: {
    marginLeft: 10,
  },
  restaurantName: {
    fontSize: 14,
    fontWeight: '500',
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
  itemsList: {
    marginBottom: 15,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 10,
    color: '#666',
  },
  itemName: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 14,
    color: '#666',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reorderButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  reorderText: {
    color: 'white',
    fontWeight: '500',
  },
});
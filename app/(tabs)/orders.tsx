import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('active');

  const activeOrders = [
    {
      id: '1',
      orderNumber: '#MD-5678',
      date: 'Today, 12:30 PM',
      status: 'preparing' as const,
      items: [
        { name: 'Big Mac', quantity: 1 },
        { name: 'French Fries (Large)', quantity: 1 },
        { name: 'Coca-Cola (Medium)', quantity: 1 }
      ],
      total: 12.47,
      estimatedDelivery: '12:50 PM',
    }
  ];

  const pastOrders = [
    {
      id: '2',
      orderNumber: '#MD-5432',
      date: 'Yesterday, 7:15 PM',
      status: 'completed' as const,
      items: [
        { name: 'Quarter Pounder', quantity: 1 },
        { name: 'McChicken', quantity: 1 },
        { name: 'French Fries (Medium)', quantity: 2 },
        { name: 'Sprite (Large)', quantity: 2 }
      ],
      total: 22.95,
    },
    {
      id: '3',
      orderNumber: '#MD-5123',
      date: 'May 15, 2025, 1:30 PM',
      status: 'completed' as const,
      items: [
        { name: 'Happy Meal', quantity: 2 },
        { name: 'Big Mac', quantity: 1 },
        { name: 'McFlurry', quantity: 1 }
      ],
      total: 18.75,
    },
    {
      id: '4',
      orderNumber: '#MD-4987',
      date: 'May 10, 2025, 6:45 PM',
      status: 'completed' as const,
      items: [
        { name: 'Egg McMuffin', quantity: 2 },
        { name: 'Hash Browns', quantity: 2 },
        { name: 'Coffee (Medium)', quantity: 2 }
      ],
      total: 15.36,
    }
  ];

  const renderOrderStatus = (status: 'preparing' | 'completed' | 'cancelled') => {
    switch (status) {
      case 'preparing':
        return (
          <View style={[styles.statusBadge, styles.preparingBadge]}>
            <Clock size={14} color="#FF8C00" />
            <Text style={styles.preparingText}>Preparing</Text>
          </View>
        );
      case 'completed':
        return (
          <View style={[styles.statusBadge, styles.completedBadge]}>
            <CheckCircle size={14} color="#4CAF50" />
            <Text style={styles.completedText}>Completed</Text>
          </View>
        );
      case 'cancelled':
        return (
          <View style={[styles.statusBadge, styles.cancelledBadge]}>
            <AlertCircle size={14} color="#F44336" />
            <Text style={styles.cancelledText}>Cancelled</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderOrderItems = (items: { name: string; quantity: number }[]) => {
    return items.map((item, index) => (
      <Text key={index} style={styles.orderItem}>
        {item.quantity}x {item.name}
      </Text>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past Orders
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.ordersList}>
        {activeTab === 'active' ? (
          activeOrders.length > 0 ? (
            activeOrders.map(order => (
              <TouchableOpacity key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                  {renderOrderStatus(order.status)}
                </View>
                <View style={styles.orderDetails}>
                  <Text style={styles.orderDate}>{order.date}</Text>
                  <View style={styles.orderItemsList}>
                    {renderOrderItems(order.items)}
                  </View>
                  <View style={styles.orderFooter}>
                    <View>
                      <Text style={styles.estimatedLabel}>Estimated delivery</Text>
                      <Text style={styles.estimatedTime}>{order.estimatedDelivery}</Text>
                    </View>
                    <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.trackButton}>
                  <Text style={styles.trackButtonText}>Track Order</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/4040542/pexels-photo-4040542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} 
                style={styles.emptyStateImage} 
              />
              <Text style={styles.emptyStateTitle}>No Active Orders</Text>
              <Text style={styles.emptyStateText}>
                You don't have any active orders at the moment.
              </Text>
              <TouchableOpacity style={styles.orderNowButton}>
                <Text style={styles.orderNowButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          pastOrders.map(order => (
            <TouchableOpacity key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                {renderOrderStatus(order.status)}
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderDate}>{order.date}</Text>
                <View style={styles.orderItemsList}>
                  {renderOrderItems(order.items)}
                </View>
                <View style={styles.orderFooter}>
                  <TouchableOpacity>
                    <Text style={styles.reorderText}>Reorder</Text>
                  </TouchableOpacity>
                  <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  tab: {
    paddingVertical: 10,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FF0000',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#777',
  },
  activeTabText: {
    color: '#FF0000',
  },
  ordersList: {
    flex: 1,
    padding: 15,
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  preparingBadge: {
    backgroundColor: '#FFF3E0',
  },
  completedBadge: {
    backgroundColor: '#E8F5E9',
  },
  cancelledBadge: {
    backgroundColor: '#FFEBEE',
  },
  preparingText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#FF8C00',
    fontWeight: '500',
  },
  completedText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  cancelledText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#F44336',
    fontWeight: '500',
  },
  orderDetails: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 10,
  },
  orderDate: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  orderItemsList: {
    marginBottom: 10,
  },
  orderItem: {
    fontSize: 14,
    marginBottom: 5,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  estimatedLabel: {
    fontSize: 12,
    color: '#777',
  },
  estimatedTime: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  reorderText: {
    color: '#FF0000',
    fontWeight: '500',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackButton: {
    backgroundColor: '#FF0000',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  trackButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 50,
  },
  emptyStateImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 75,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderNowButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  orderNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
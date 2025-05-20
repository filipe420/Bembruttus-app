import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, MapPin, Chrome as Home, Briefcase } from 'lucide-react-native';

export default function AddressesScreen() {
  const addresses = [
    {
      id: '1',
      type: 'home',
      name: 'Home',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      isDefault: true,
    },
    {
      id: '2',
      type: 'work',
      name: 'Office',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zip: '10002',
      isDefault: false,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved Addresses</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#FF0000" />
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>

        {addresses.map((address) => (
          <View key={address.id} style={styles.addressCard}>
            <View style={styles.addressInfo}>
              {address.type === 'home' ? (
                <Home size={24} color="#333" />
              ) : (
                <Briefcase size={24} color="#333" />
              )}
              <View style={styles.addressDetails}>
                <View style={styles.addressHeader}>
                  <Text style={styles.addressName}>{address.name}</Text>
                  {address.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.addressLine}>{address.address}</Text>
                <Text style={styles.addressLine}>
                  {address.city}, {address.state} {address.zip}
                </Text>
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
  addressCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
  },
  addressInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  addressDetails: {
    marginLeft: 15,
    flex: 1,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
  },
  defaultBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  addressLine: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
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
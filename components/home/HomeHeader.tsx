import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Bell, ChevronDown } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { theme } from '@/constants/theme';

export default function HomeHeader() {
  const { user } = useAuth();
  
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.locationSelector}>
          <Text style={styles.locationLabel}>Entrega em</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Rua das Flores, 123</Text>
            <ChevronDown size={16} color={theme.colors.primary} />
          </View>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.notificationButton}>
        <Bell size={24} color={theme.colors.text.primary} />
        {user && <View style={styles.notificationBadge} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftContainer: {
    flex: 1,
  },
  locationSelector: {
    
  },
  locationLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.primary,
    marginRight: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 8 : 10,
    right: Platform.OS === 'ios' ? 10 : 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Link, router } from 'expo-router';
import { 
  CreditCard, 
  MapPin, 
  Bell, 
  Settings, 
  CircleHelp as HelpCircle, 
  LogOut,
  Gift,
  Shield,
  Clock,
  Star
} from 'lucide-react-native';

export default function ProfileScreen() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    points: 235,
    memberSince: 'March 2024',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  };

  const rewardTiers = [
    { name: 'Bronze', points: 0, current: false },
    { name: 'Silver', points: 100, current: false },
    { name: 'Gold', points: 200, current: true },
    { name: 'Platinum', points: 500, current: false },
  ];

  const menuItems = [
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={22} color="#333" />,
      route: '/payment-methods',
    },
    {
      id: 'addresses',
      title: 'Saved Addresses',
      icon: <MapPin size={22} color="#333" />,
      route: '/addresses',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={22} color="#333" />,
      route: '/notifications',
      hasSwitch: true,
    },
    {
      id: 'rewards',
      title: 'My Rewards',
      icon: <Gift size={22} color="#333" />,
      route: '/rewards',
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: <Shield size={22} color="#333" />,
      route: '/privacy',
    },
    {
      id: 'history',
      title: 'Order History',
      icon: <Clock size={22} color="#333" />,
      route: '/history',
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Settings size={22} color="#333" />,
      route: '/settings',
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={22} color="#333" />,
      route: '/help',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.profileCard}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
          <Text style={styles.memberSince}>Member since {user.memberSince}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rewardsSection}>
        <View style={styles.rewardsHeader}>
          <Star size={24} color="#FFC72C" />
          <Text style={styles.rewardsTitle}>Rewards Status</Text>
        </View>
        <View style={styles.tierProgress}>
          {rewardTiers.map((tier, index) => (
            <View key={tier.name} style={styles.tierItem}>
              <View 
                style={[
                  styles.tierDot,
                  tier.current && styles.currentTierDot,
                  user.points >= tier.points && styles.completedTierDot
                ]} 
              />
              <Text style={[
                styles.tierName,
                tier.current && styles.currentTierName
              ]}>
                {tier.name}
              </Text>
              {index < rewardTiers.length - 1 && (
                <View style={[
                  styles.tierLine,
                  user.points >= rewardTiers[index + 1].points && styles.completedTierLine
                ]} />
              )}
            </View>
          ))}
        </View>
        <Text style={styles.pointsText}>
          {user.points} points to next tier
        </Text>
      </View>

      <View style={styles.menuSection}>
        {menuItems.map(item => (
          <Link key={item.id} href={item.route as any} asChild>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              {item.hasSwitch ? (
                <Switch 
                  value={true}
                  onValueChange={() => {}}
                  trackColor={{ false: '#767577', true: '#FF0000' }}
                  thumbColor={'#f4f3f4'}
                />
              ) : (
                <Text style={styles.menuItemArrow}>›</Text>
              )}
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <Link href="/(auth)/login" asChild>
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#FF0000" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.footer}>
        <Text style={styles.footerText}>App Version 1.0.0</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.footerDivider}>•</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  memberSince: {
    fontSize: 12,
    color: '#888',
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
  rewardsSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 20,
  },
  rewardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  tierProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tierItem: {
    alignItems: 'center',
    flex: 1,
  },
  tierDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },
  currentTierDot: {
    backgroundColor: '#FFC72C',
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  completedTierDot: {
    backgroundColor: '#4CAF50',
  },
  tierName: {
    fontSize: 12,
    color: '#666',
  },
  currentTierName: {
    color: '#000',
    fontWeight: '500',
  },
  tierLine: {
    position: 'absolute',
    top: 6,
    right: -50,
    width: 100,
    height: 2,
    backgroundColor: '#E0E0E0',
    zIndex: -1,
  },
  completedTierLine: {
    backgroundColor: '#4CAF50',
  },
  pointsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    marginLeft: 15,
  },
  menuItemArrow: {
    fontSize: 24,
    color: '#999',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 15,
    marginBottom: 30,
    paddingVertical: 15,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF0000',
    marginLeft: 10,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 12,
    color: '#666',
  },
  footerDivider: {
    fontSize: 12,
    color: '#999',
    marginHorizontal: 5,
  },
});
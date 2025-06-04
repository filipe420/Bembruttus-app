import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Switch
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  LogOut, 
  ChevronRight, 
  CreditCard, 
  MapPin, 
  Gift, 
  Bell, 
  HelpCircle, 
  Settings, 
  Lock,
  Clock,
  Shield
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { theme } from '@/constants/theme';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleSignOut = () => {
    signOut();
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <ProfileHeader />
        </View>
        
        <View style={styles.notLoggedInContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/5474272/pexels-photo-5474272.jpeg' }} 
            style={styles.notLoggedInImage}
          />
          <Text style={styles.notLoggedInTitle}>Entre para aproveitar todos os benefícios</Text>
          <Text style={styles.notLoggedInText}>
            Faça login para acompanhar seus pedidos, acessar promoções exclusivas e muito mais
          </Text>
          
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <ProfileHeader />
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.userInfoContainer}>
          <Image 
            source={{ uri: user.photoURL || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg' }} 
            style={styles.userAvatar} 
          />
          <View style={styles.userTextInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Editar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rewardsCard}>
          <Text style={styles.rewardsTitle}>Rewards Status</Text>
          <View style={styles.rewardsProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '60%' }]} />
            </View>
            <View style={styles.rewardsLabels}>
              <Text style={styles.rewardLabel}>Bronze</Text>
              <Text style={styles.rewardLabel}>Silver</Text>
              <Text style={styles.rewardLabel}>Gold</Text>
              <Text style={styles.rewardLabel}>Platinum</Text>
            </View>
          </View>
          <Text style={styles.pointsText}>235 points to next tier</Text>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <CreditCard size={24} color={theme.colors.text.primary} />
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <MapPin size={24} color={theme.colors.text.primary} />
              <Text style={styles.menuItemText}>Saved Addresses</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Bell size={24} color={theme.colors.text.primary} />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary }}
              thumbColor={Platform.OS === 'ios' ? '#fff' : notificationsEnabled ? '#fff' : '#f4f3f4'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Gift size={24} color={theme.colors.text.primary} />
              <Text style={styles.menuItemText}>My Rewards</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Clock size={24} color={theme.colors.text.primary} />
              <Text style={styles.menuItemText}>Order History</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Shield size={24} color={theme.colors.text.primary} />
              <Text style={styles.menuItemText}>Privacy & Security</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Settings size={24} color={theme.colors.text.primary} />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <HelpCircle size={24} color={theme.colors.text.primary} />
              <Text style={styles.menuItemText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={theme.colors.gray[400]} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleSignOut}
        >
          <LogOut size={20} color={theme.colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={{ height: 100 }} />
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  notLoggedInContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  notLoggedInImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 24,
  },
  notLoggedInTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: 12,
  },
  notLoggedInText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 30,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userTextInfo: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
  },
  userEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  editProfileButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  editProfileText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: theme.colors.primary,
  },
  rewardsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardsTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  rewardsProgress: {
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.gray[200],
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  rewardsLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  pointsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 8,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.error,
    marginLeft: 8,
  },
});
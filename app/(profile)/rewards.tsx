import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Gift, Star, Trophy, ChevronRight } from 'lucide-react-native';

export default function RewardsScreen() {
  const rewards = [
    {
      id: '1',
      title: 'Free Big Mac',
      points: 500,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      expiresIn: '30 days',
    },
    {
      id: '2',
      title: 'Free Medium Fries',
      points: 300,
      image: 'https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      expiresIn: '15 days',
    },
    {
      id: '3',
      title: 'Free McFlurry',
      points: 400,
      image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      expiresIn: '45 days',
    },
  ];

  const userPoints = 750;
  const nextTierPoints = 1000;
  const currentTier = 'Gold';
  const nextTier = 'Platinum';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Rewards</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Star size={24} color="#FFC72C" />
            <Text style={styles.pointsTitle}>Rewards Points</Text>
          </View>
          <Text style={styles.pointsAmount}>{userPoints}</Text>
          <View style={styles.tierProgress}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(userPoints / nextTierPoints) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.tierText}>
              {nextTierPoints - userPoints} points to {nextTier}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          {rewards.map((reward) => (
            <TouchableOpacity key={reward.id} style={styles.rewardCard}>
              <Image source={{ uri: reward.image }} style={styles.rewardImage} />
              <View style={styles.rewardInfo}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <View style={styles.rewardPoints}>
                  <Trophy size={16} color="#FFC72C" />
                  <Text style={styles.pointsText}>{reward.points} points</Text>
                </View>
                <Text style={styles.expiryText}>Expires in {reward.expiresIn}</Text>
              </View>
              <ChevronRight size={24} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>Gold Member Benefits</Text>
          <View style={styles.benefitsList}>
            <View style={styles.benefitItem}>
              <Gift size={24} color="#FFC72C" />
              <View style={styles.benefitInfo}>
                <Text style={styles.benefitTitle}>Birthday Reward</Text>
                <Text style={styles.benefitDescription}>
                  Get a free menu item on your birthday
                </Text>
              </View>
            </View>
            <View style={styles.benefitItem}>
              <Star size={24} color="#FFC72C" />
              <View style={styles.benefitInfo}>
                <Text style={styles.benefitTitle}>2x Points on Orders</Text>
                <Text style={styles.benefitDescription}>
                  Earn double points on all orders
                </Text>
              </View>
            </View>
          </View>
        </View>
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
  pointsCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  pointsAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFC72C',
    marginBottom: 15,
  },
  tierProgress: {
    marginTop: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFC72C',
    borderRadius: 4,
  },
  tierText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  rewardImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  rewardInfo: {
    flex: 1,
    marginLeft: 15,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  rewardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  pointsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  expiryText: {
    fontSize: 12,
    color: '#999',
  },
  benefitsSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  benefitsList: {
    marginTop: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  benefitInfo: {
    marginLeft: 15,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
    color: '#666',
  },
});
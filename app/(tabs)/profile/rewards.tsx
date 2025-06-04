import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gift } from 'lucide-react-native';
import PageHeader from '@/components/common/PageHeader';
import { theme } from '@/constants/theme';

const rewards = [
  {
    id: '1',
    points: 50,
    reward: 'Batata Frita Média',
    description: 'Uma porção média de batatas fritas crocantes',
  },
  {
    id: '2',
    points: 100,
    reward: 'Hambúrguer Clássico',
    description: 'Nosso hambúrguer tradicional com queijo e salada',
  },
  {
    id: '3',
    points: 150,
    reward: 'Milk Shake',
    description: 'Milk shake de chocolate, morango ou baunilha',
  },
  {
    id: '4',
    points: 200,
    reward: 'Combo Completo',
    description: 'Hambúrguer + Batata + Refrigerante',
  },
];

export default function RewardsScreen() {
  const insets = useSafeAreaInsets();
  const userPoints = 120;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <PageHeader title="Programa de Recompensas" showBackButton />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsTitle}>Seus Pontos</Text>
          <Text style={styles.pointsValue}>{userPoints}</Text>
          <Text style={styles.pointsSubtitle}>pontos disponíveis</Text>
        </View>

        <Text style={styles.sectionTitle}>Recompensas Disponíveis</Text>

        {rewards.map((reward) => (
          <View 
            key={reward.id} 
            style={[
              styles.rewardCard,
              userPoints >= reward.points ? styles.rewardAvailable : styles.rewardLocked
            ]}
          >
            <View style={styles.rewardIcon}>
              <Gift size={24} color={userPoints >= reward.points ? theme.colors.primary : theme.colors.gray[400]} />
            </View>
            <View style={styles.rewardInfo}>
              <Text style={styles.rewardTitle}>{reward.reward}</Text>
              <Text style={styles.rewardDescription}>{reward.description}</Text>
              <Text style={styles.pointsRequired}>{reward.points} pontos necessários</Text>
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
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  content: {
    flex: 1,
    padding: 16,
  },
  pointsCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  pointsTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  pointsValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
    color: '#fff',
  },
  pointsSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  rewardCard: {
    flexDirection: 'row',
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
  rewardAvailable: {
    opacity: 1,
  },
  rewardLocked: {
    opacity: 0.6,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  rewardDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  pointsRequired: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: theme.colors.primary,
  },
});
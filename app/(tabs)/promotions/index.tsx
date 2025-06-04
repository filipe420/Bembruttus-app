import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';
import PageHeader from '@/components/common/PageHeader';

const promotions = [
  {
    id: '1',
    title: 'Combo Família',
    description: '4 hambúrgueres, 4 batatas e 4 refrigerantes',
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg',
    price: 109.90,
    originalPrice: 149.90,
    validUntil: '2024-03-31',
  },
  {
    id: '2',
    title: 'Terça de Descontos',
    description: '30% OFF em todos os hambúrgueres',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg',
    price: 27.90,
    originalPrice: 39.90,
    validUntil: '2024-03-31',
  },
  {
    id: '3',
    title: 'Frete Grátis',
    description: 'Nas compras acima de R$ 50',
    image: 'https://images.pexels.com/photos/2454533/pexels-photo-2454533.jpeg',
    validUntil: '2024-03-31',
  },
];

const { width } = Dimensions.get('window');
const CARD_MARGIN = 16;
const CARD_WIDTH = width - (CARD_MARGIN * 2);

export default function PromotionsScreen() {
  const insets = useSafeAreaInsets();

  const handlePromotionPress = (id: string) => {
    router.push(`/promotions/${id}`);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <PageHeader title="Promoções" />
      </View>

      <FlatList
        data={promotions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePromotionPress(item.id)}
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.overlay} />
            <View style={styles.content}>
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              
              {item.price && (
                <View style={styles.priceContainer}>
                  <Text style={styles.originalPrice}>
                    De R$ {item.originalPrice.toFixed(2).replace('.', ',')}
                  </Text>
                  <Text style={styles.price}>
                    Por R$ {item.price.toFixed(2).replace('.', ',')}
                  </Text>
                </View>
              )}
              
              <View style={styles.validUntil}>
                <Text style={styles.validUntilText}>
                  Válido até {new Date(item.validUntil).toLocaleDateString('pt-BR')}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
  list: {
    padding: CARD_MARGIN,
  },
  card: {
    width: CARD_WIDTH,
    height: 250,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  priceContainer: {
    marginBottom: 8,
  },
  originalPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textDecorationLine: 'line-through',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  validUntil: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  validUntilText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
  },
});
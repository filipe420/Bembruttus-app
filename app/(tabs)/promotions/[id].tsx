import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, Clock, Tag, ShoppingBag } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useCart } from '@/contexts/CartContext';

export default function PromotionDetailsScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { addItem } = useCart();

  // In a real app, fetch this data from an API
  const promotion = {
    id: '1',
    title: 'Combo Família',
    description: '4 hambúrgueres, 4 batatas e 4 refrigerantes',
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg',
    price: 109.90,
    originalPrice: 149.90,
    validUntil: '2024-03-31',
    details: [
      '4 Hambúrgueres artesanais (180g)',
      '4 Porções de batata frita grande',
      '4 Refrigerantes 350ml',
      'Válido todos os dias',
      'Não acumulativo com outras promoções',
    ],
  };

  const handleAddToCart = () => {
    addItem({
      id: promotion.id,
      name: promotion.title,
      price: promotion.price,
      image: promotion.image,
      quantity: 1,
    });
    router.push('/(tabs)/cart');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image source={{ uri: promotion.image }} style={styles.image} />
        
        <TouchableOpacity 
          style={[styles.backButton, { top: insets.top + 10 }]}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>{promotion.title}</Text>
          <Text style={styles.description}>{promotion.description}</Text>

          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.originalPrice}>
                De R$ {promotion.originalPrice.toFixed(2).replace('.', ',')}
              </Text>
              <Text style={styles.price}>
                Por R$ {promotion.price.toFixed(2).replace('.', ',')}
              </Text>
            </View>
            <View style={styles.discount}>
              <Text style={styles.discountText}>
                {Math.round((1 - promotion.price / promotion.originalPrice) * 100)}% OFF
              </Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Clock size={20} color={theme.colors.primary} />
              <Text style={styles.infoText}>
                Válido até {new Date(promotion.validUntil).toLocaleDateString('pt-BR')}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Tag size={20} color={theme.colors.primary} />
              <Text style={styles.infoText}>Promoção Especial</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>O que está incluso:</Text>
            {promotion.details.map((detail, index) => (
              <View key={index} style={styles.detailItem}>
                <View style={styles.bullet} />
                <Text style={styles.detailText}>{detail}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }]}>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <ShoppingBag size={20} color="#fff" />
          <Text style={styles.addToCartText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  originalPrice: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.primary,
  },
  discount: {
    backgroundColor: theme.colors.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  discountText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: theme.colors.primary,
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.primary,
    marginLeft: 8,
  },
  detailsContainer: {
    backgroundColor: theme.colors.gray[50],
    padding: 16,
    borderRadius: 12,
  },
  detailsTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginRight: 8,
  },
  detailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
  },
  addToCartButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 30,
  },
  addToCartText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
});
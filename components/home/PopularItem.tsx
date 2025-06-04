import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { useCart } from '@/contexts/CartContext';
import { Plus } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface PopularItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2; // 2 items per row with padding

export default function PopularItem({ id, name, image, price, description }: PopularItemProps) {
  const { addItem } = useCart();
  
  const handlePress = () => {
    router.push(`/menu/item/${id}`);
  };
  
  const handleAddToCart = () => {
    addItem({
      id,
      name,
      image,
      price,
      quantity: 1,
    });
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>R$ {price.toFixed(2).replace('.', ',')}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Plus size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 8,
    height: 36,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: theme.colors.primary,
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
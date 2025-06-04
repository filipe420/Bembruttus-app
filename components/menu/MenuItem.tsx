import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import { theme } from '@/constants/theme';

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
}

export default function MenuItem({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  category,
  isNew,
  isPopular
}: MenuItemProps) {
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
        <View style={styles.contentHeader}>
          <Text style={styles.name}>{name}</Text>
          {isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>Novo</Text></View>}
          {isPopular && <View style={styles.popularBadge}><Text style={styles.popularBadgeText}>Popular</Text></View>}
        </View>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>R$ {price.toFixed(2).replace('.', ',')}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Plus size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  contentHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginRight: 8,
  },
  newBadge: {
    backgroundColor: theme.colors.primary + '15',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  newBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: theme.colors.primary,
  },
  popularBadge: {
    backgroundColor: theme.colors.warning + '15',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  popularBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: theme.colors.warning,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.primary,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
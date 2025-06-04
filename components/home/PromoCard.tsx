import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';

interface PromoCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

export default function PromoCard({ id, image, title, description }: PromoCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const handlePress = () => {
    router.push(`/promotion/${id}`);
  };
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image 
        source={{ 
          uri: imageError 
            ? 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg'
            : image 
        }}
        style={styles.image}
        onError={() => setImageError(true)}
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Aproveite</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 180,
    borderRadius: 16,
    marginRight: 16,
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
    fontSize: 18,
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#fff',
  },
});
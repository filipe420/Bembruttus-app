import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MapPin, Clock, Phone, Navigation, Star } from 'lucide-react-native';
import PageHeader from '@/components/common/PageHeader';
import { locations } from '@/data/locationsData';
import { theme } from '@/constants/theme';

export default function LocationsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const openMaps = (address: string) => {
    const query = encodeURIComponent(address);
    const url = Platform.select({
      ios: `maps:0,0?q=${query}`,
      android: `geo:0,0?q=${query}`,
      web: `https://maps.google.com/?q=${query}`
    });
    
    if (url) {
      Linking.openURL(url);
    }
  };

  const callLocation = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <PageHeader title="Nossas Lojas" />
      </View>

      <View style={styles.featuredLocation}>
        <Image 
          source={{ uri: selectedLocation.image }} 
          style={styles.featuredImage}
        />
        <View style={styles.locationDetailsContainer}>
          <View style={styles.locationNameContainer}>
            <Text style={styles.locationName}>{selectedLocation.name}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.ratingText}>{selectedLocation.rating}</Text>
            </View>
          </View>
          
          <View style={styles.locationDetail}>
            <MapPin size={16} color={theme.colors.primary} />
            <Text style={styles.locationDetailText}>{selectedLocation.address}</Text>
          </View>
          
          <View style={styles.locationDetail}>
            <Clock size={16} color={theme.colors.primary} />
            <Text style={styles.locationDetailText}>{selectedLocation.hours}</Text>
          </View>
          
          <View style={styles.locationDetail}>
            <Phone size={16} color={theme.colors.primary} />
            <Text style={styles.locationDetailText}>{selectedLocation.phone}</Text>
          </View>
          
          <View style={styles.locationActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => openMaps(selectedLocation.address)}
            >
              <Navigation size={16} color="#fff" />
              <Text style={styles.actionButtonText}>Como Chegar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => callLocation(selectedLocation.phone)}
            >
              <Phone size={16} color={theme.colors.primary} />
              <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Ligar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Todas as Lojas</Text>
      
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[
              styles.locationCard, 
              selectedLocation.id === item.id && styles.selectedLocationCard
            ]}
            onPress={() => setSelectedLocation(item)}
          >
            <Image source={{ uri: item.image }} style={styles.locationImage} />
            <View style={styles.locationCardContent}>
              <View style={styles.locationCardHeader}>
                <Text style={styles.locationCardName}>{item.name}</Text>
                <View style={styles.locationCardRating}>
                  <Star size={14} color="#FFD700" fill="#FFD700" />
                  <Text style={styles.locationCardRatingText}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.locationCardAddress}>{item.address}</Text>
              <Text style={styles.locationCardHours}>{item.hours}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.locationsList}
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
  featuredLocation: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  locationDetailsContainer: {
    padding: 16,
  },
  locationNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  ratingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#B07F00',
    marginLeft: 4,
  },
  locationDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationDetailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginLeft: 8,
    flex: 1,
  },
  locationActions: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  actionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
    marginLeft: 6,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginRight: 0,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  locationsList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  selectedLocationCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  locationImage: {
    width: 80,
    height: 80,
  },
  locationCardContent: {
    flex: 1,
    padding: 12,
  },
  locationCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationCardName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  locationCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationCardRatingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#B07F00',
    marginLeft: 2,
  },
  locationCardAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginBottom: 2,
  },
  locationCardHours: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: theme.colors.success,
  },
});
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useState, useCallback } from 'react';
import { Link } from 'expo-router';
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react-native';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const promotions = [
    {
      id: '1',
      title: 'Big Mac Meal Deal',
      description: 'Get a Big Mac, fries and drink for only $7.99',
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      endDate: '2025-04-30',
    },
    {
      id: '2',
      title: 'Breakfast Special',
      description: 'Egg McMuffin and coffee for $4.99',
      image: 'https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      endDate: '2025-04-25',
    },
    {
      id: '3',
      title: 'Happy Meal',
      description: 'Kids meal with toy for $5.99',
      image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      endDate: '2025-04-28',
    },
  ];

  const featuredItems = [
    {
      id: '1',
      name: 'Big Mac',
      price: 5.99,
      rating: 4.8,
      reviews: 2453,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '2',
      name: 'Quarter Pounder',
      price: 6.49,
      rating: 4.6,
      reviews: 1897,
      image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '3',
      name: 'McFlurry',
      price: 3.49,
      rating: 4.7,
      reviews: 2187,
      image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const categories = [
    {
      id: '1',
      name: 'Burgers',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '2',
      name: 'Chicken',
      image: 'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '3',
      name: 'Sides',
      image: 'https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '4',
      name: 'Desserts',
      image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const nearbyRestaurants = [
    {
      id: '1',
      name: "McDonald's Downtown",
      address: '123 Main St, City Center',
      distance: '0.5 mi',
      status: 'Open',
      closingTime: '11:00 PM',
      image: 'https://images.pexels.com/photos/2882603/pexels-photo-2882603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      id: '2',
      name: "McDonald's Plaza",
      address: '456 Market St, Shopping District',
      distance: '1.2 mi',
      status: 'Open',
      closingTime: '12:00 AM',
      image: 'https://images.pexels.com/photos/2882603/pexels-photo-2882603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/2882603/pexels-photo-2882603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }} 
          style={styles.headerImage} 
        />
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>Bembruttus</Text>
          <Link href="/menu" asChild>
            <TouchableOpacity style={styles.orderButton}>
              <Text style={styles.orderButtonText}>Order Now</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <Link href="/menu" asChild>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ArrowRight size={16} color="#FF0000" />
            </TouchableOpacity>
          </Link>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promotionsScroll}>
          {promotions.map((promo) => (
            <TouchableOpacity key={promo.id} style={styles.promotionCard}>
              <Image source={{ uri: promo.image }} style={styles.promotionImage} />
              <View style={styles.promotionContent}>
                <Text style={styles.promotionTitle}>{promo.title}</Text>
                <Text style={styles.promotionDescription}>{promo.description}</Text>
                <Text style={styles.promotionDate}>Valid until {new Date(promo.endDate).toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Items</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          {featuredItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.featuredCard}>
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              <View style={styles.featuredContent}>
                <Text style={styles.featuredName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#FFC72C" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Text style={styles.reviewCount}>({item.reviews})</Text>
                </View>
                <Text style={styles.featuredPrice}>${item.price.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <Image source={{ uri: category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <ArrowRight size={16} color="#FF0000" />
          </TouchableOpacity>
        </View>
        {nearbyRestaurants.map((restaurant) => (
          <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
            <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
            <View style={styles.restaurantContent}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <View style={styles.restaurantInfo}>
                <MapPin size={14} color="#666" />
                <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
                <Text style={styles.restaurantDistance}>({restaurant.distance})</Text>
              </View>
              <View style={styles.restaurantStatus}>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: restaurant.status === 'Open' ? '#4CAF50' : '#FF0000' }
                ]} />
                <Text style={styles.statusText}>{restaurant.status}</Text>
                <Clock size={14} color="#666" style={styles.clockIcon} />
                <Text style={styles.closingTime}>Closes at {restaurant.closingTime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.rewardsCard}>
        <View style={styles.rewardsContent}>
          <Text style={styles.rewardsTitle}>Join MyMcDonald's Rewards</Text>
          <Text style={styles.rewardsDescription}>
            Earn points on every order and get free food
          </Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Now</Text>
          </TouchableOpacity>
        </View>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
          style={styles.rewardsImage}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    position: 'relative',
    height: 250,
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  welcomeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  brandText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#FF0000',
    marginRight: 5,
    fontWeight: '500',
  },
  promotionsScroll: {
    marginLeft: -15,
    paddingLeft: 15,
  },
  promotionCard: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promotionImage: {
    width: '100%',
    height: 150,
  },
  promotionContent: {
    padding: 12,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promotionDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  promotionDate: {
    fontSize: 11,
    color: '#999',
  },
  featuredScroll: {
    marginLeft: -15,
    paddingLeft: 15,
  },
  featuredCard: {
    width: 160,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 120,
  },
  featuredContent: {
    padding: 12,
  },
  featuredName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  featuredPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: 100,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '500',
    padding: 12,
    textAlign: 'center',
  },
  restaurantCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  restaurantContent: {
    flex: 1,
    padding: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  restaurantDistance: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  restaurantStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  clockIcon: {
    marginRight: 4,
  },
  closingTime: {
    fontSize: 12,
    color: '#666',
  },
  rewardsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFC72C',
    borderRadius: 15,
    margin: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardsContent: {
    flex: 1,
    padding: 20,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rewardsDescription: {
    fontSize: 14,
    marginBottom: 15,
  },
  joinButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  rewardsImage: {
    width: 120,
    height: '100%',
  },
});
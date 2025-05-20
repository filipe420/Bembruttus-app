import { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';
import { Search, Filter, Star } from 'lucide-react-native';
import CartButton from '@/components/CartButton';

export default function MenuScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [cartItems, setCartItems] = useState<{id: string, quantity: number}[]>([]);

  const categories = [
    'All',
    'Featured',
    'Burgers',
    'Chicken',
    'Sides',
    'Desserts',
    'Drinks',
    'Breakfast',
    'Value Meals',
    'Happy Meals'
  ];

  const menuItems = [
    {
      id: '1',
      name: 'Big Mac',
      price: 5.99,
      category: 'Burgers',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Two 100% beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun.',
      rating: 4.8,
      reviews: 2453,
      calories: 563,
      featured: true,
    },
    {
      id: '2',
      name: 'Quarter Pounder',
      price: 6.49,
      category: 'Burgers',
      image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Quarter pound of 100% beef with cheese, onions, pickles, mustard and ketchup on a sesame seed bun.',
      rating: 4.6,
      reviews: 1897,
      calories: 520,
      featured: true,
    },
    {
      id: '3',
      name: 'McChicken',
      price: 4.99,
      category: 'Chicken',
      image: 'https://images.pexels.com/photos/1352270/pexels-photo-1352270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Crispy chicken patty with lettuce and mayo on a toasted bun.',
      rating: 4.5,
      reviews: 1256,
      calories: 400,
      featured: false,
    },
    {
      id: '4',
      name: 'French Fries',
      price: 2.99,
      category: 'Sides',
      image: 'https://images.pexels.com/photos/115740/pexels-photo-115740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Golden, crispy french fries made with premium potatoes.',
      rating: 4.9,
      reviews: 3421,
      calories: 320,
      featured: true,
    },
    {
      id: '5',
      name: 'McFlurry',
      price: 3.49,
      category: 'Desserts',
      image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Creamy vanilla soft serve with your choice of mix-ins.',
      rating: 4.7,
      reviews: 2187,
      calories: 510,
      featured: false,
    },
    {
      id: '6',
      name: 'Coca-Cola',
      price: 1.99,
      category: 'Drinks',
      image: 'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Refreshing Coca-Cola served with ice.',
      rating: 4.5,
      reviews: 1543,
      calories: 140,
      featured: false,
    },
    {
      id: '7',
      name: 'Egg McMuffin',
      price: 3.99,
      category: 'Breakfast',
      image: 'https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Canadian bacon, egg, and American cheese on a toasted English muffin.',
      rating: 4.6,
      reviews: 1876,
      calories: 300,
      featured: true,
    },
    {
      id: '8',
      name: 'Happy Meal',
      price: 5.99,
      category: 'Happy Meals',
      image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      description: 'Kids meal with choice of main item, side, drink, and toy.',
      rating: 4.8,
      reviews: 2341,
      calories: 475,
      featured: false,
    },
  ];

  const filteredItems = menuItems.filter(item => 
    (activeCategory === 'All' || 
     (activeCategory === 'Featured' && item.featured) || 
     item.category === activeCategory) &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const addToCart = (itemId: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === itemId);
      if (existingItem) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: itemId, quantity: 1 }];
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const menuItem = menuItems.find(mi => mi.id === item.id);
      return total + (menuItem?.price ?? 0) * item.quantity;
    }, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(category => (
          <TouchableOpacity 
            key={category} 
            style={[
              styles.categoryButton, 
              activeCategory === category && styles.activeCategoryButton
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text 
              style={[
                styles.categoryText, 
                activeCategory === category && styles.activeCategoryText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.menuList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredItems.map(item => (
          <TouchableOpacity key={item.id} style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.menuItemImage} />
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemHeader}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                {item.featured && (
                  <View style={styles.featuredBadge}>
                    <Star size={12} color="#FFC72C" />
                    <Text style={styles.featuredText}>Featured</Text>
                  </View>
                )}
              </View>
              <Text style={styles.menuItemDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.menuItemStats}>
                <View style={styles.ratingContainer}>
                  <Star size={14} color="#FFC72C" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Text style={styles.reviewCount}>({item.reviews})</Text>
                </View>
                <Text style={styles.calories}>{item.calories} cal</Text>
              </View>
              <View style={styles.menuItemFooter}>
                <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => addToCart(item.id)}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <CartButton
        itemCount={getTotalItems()}
        totalPrice={getTotalPrice()}
        onPress={() => {/* Navigate to cart */}}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
  },
  categoriesContent: {
    paddingHorizontal: 15,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F0F0F0',
  },
  activeCategoryButton: {
    backgroundColor: '#FF0000',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  activeCategoryText: {
    color: 'white',
  },
  menuList: {
    flex: 1,
    padding: 15,
  },
  menuItem: {
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
  menuItemImage: {
    width: 120,
    height: 120,
  },
  menuItemContent: {
    flex: 1,
    padding: 12,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  featuredText: {
    fontSize: 12,
    color: '#FF8C00',
    marginLeft: 4,
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  menuItemStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  calories: {
    fontSize: 12,
    color: '#666',
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 12,
  },
});
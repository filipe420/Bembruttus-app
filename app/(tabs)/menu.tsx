import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
  Platform
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import MenuItem from '@/components/menu/MenuItem';
import MenuHeader from '@/components/menu/MenuHeader';
import FilterModal from '@/components/menu/FilterModal';
import CategoryTabs from '@/components/menu/CategoryTabs';
import { menuItems, menuCategories } from '@/data/menuData';
import { theme } from '@/constants/theme';

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;

  // Filter menu items based on search query and active category
  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Animation for header shadow
  const headerShadowOpacity = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [0, 0.15],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* Header with Search */}
      <Animated.View 
        style={[
          styles.header, 
          { 
            paddingTop: insets.top + 10,
            shadowOpacity: headerShadowOpacity 
          }
        ]}
      >
        <MenuHeader title="Cardápio" />
        
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Search size={20} color={theme.colors.gray[500]} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar no cardápio"
              placeholderTextColor={theme.colors.gray[400]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setFilterModalVisible(true)}
          >
            <SlidersHorizontal size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Category Tabs */}
        <CategoryTabs 
          categories={menuCategories}
          activeCategory={activeCategory}
          onCategoryPress={setActiveCategory}
        />
      </Animated.View>

      {/* Menu Items */}
      <Animated.FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.menuList,
          { paddingTop: 170, paddingBottom: 100 + insets.bottom }
        ]}
        renderItem={({ item }) => (
          <MenuItem
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            category={item.category}
            isNew={item.isNew}
            isPopular={item.isPopular}
          />
        )}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />

      {/* Filter Modal */}
      <FilterModal 
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
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
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 10,
    paddingHorizontal: 16,
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.primary,
    paddingVertical: 10,
    height: Platform.OS === 'ios' ? 36 : 40,
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuList: {
    paddingHorizontal: 16,
  },
});
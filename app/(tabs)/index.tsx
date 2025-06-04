import { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  ScrollView,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, Bell } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import HomeHeader from '@/components/home/HomeHeader';
import PromoCard from '@/components/home/PromoCard';
import CategoryButton from '@/components/home/CategoryButton';
import PopularItem from '@/components/home/PopularItem';
import { promotions, categories, popularItems } from '@/data/homeData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [activeCategory, setActiveCategory] = useState('burgers');
  
  // Animation for header opacity
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Animated Header Background */}
      <Animated.View 
        style={[
          styles.headerBackground, 
          { 
            opacity: headerOpacity,
            height: 60 + insets.top 
          }
        ]}
      />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <HomeHeader />
      </View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        {/* Hero Section with Gradient */}
        <View style={styles.heroContainer}>
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.heroGradient}
          />
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg' }} 
            style={styles.heroImage}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Bem-vindo ao{'\n'}Bembruttus</Text>
            <Text style={styles.heroSubtitle}>Hambúrgueres artesanais feitos com amor</Text>
            <TouchableOpacity style={styles.heroButton}>
              <Text style={styles.heroButtonText}>Peça Agora</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Promotions Carousel */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Promoções</Text>
            <Link href="/promotions" asChild>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>Ver Todas</Text>
                <ChevronRight size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </Link>
          </View>
          
          <FlatList
            data={promotions}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoList}
            renderItem={({ item }) => (
              <PromoCard 
                id={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
              />
            )}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                title={category.title}
                icon={category.icon}
                isActive={activeCategory === category.id}
                onPress={() => setActiveCategory(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Popular Items */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mais Populares</Text>
            <Link href="/menu" asChild>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>Ver Menu</Text>
                <ChevronRight size={16} color={theme.colors.primary} />
              </TouchableOpacity>
            </Link>
          </View>
          
          <View style={styles.popularGrid}>
            {popularItems.map((item) => (
              <PopularItem
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                description={item.description}
              />
            ))}
          </View>
        </View>
        
        {/* Bottom spacing for tab bar */}
        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: 16,
  },
  heroContainer: {
    height: 450,
    position: 'relative',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 150,
    zIndex: 1,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  heroTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  heroSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  heroButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: theme.colors.text.primary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.primary,
    marginRight: 4,
  },
  promoList: {
    paddingRight: 16,
  },
  categoriesContainer: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  popularGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
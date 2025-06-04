import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

interface Category {
  id: string;
  name: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryPress: (categoryId: string) => void;
}

export default function CategoryTabs({ categories, activeCategory, onCategoryPress }: CategoryTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.tabButton,
            activeCategory === category.id && styles.activeTabButton,
          ]}
          onPress={() => onCategoryPress(category.id)}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeCategory === category.id && styles.activeTabButtonText,
            ]}
          >
            {category.name}
          </Text>
          {activeCategory === category.id && (
            <View style={styles.activeIndicator} />
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: theme.colors.primary + '10',
    borderRadius: 16,
  },
  tabButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  activeTabButtonText: {
    color: theme.colors.primary,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.colors.primary,
    borderRadius: 1,
  },
});
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { IconNames } from '@/types/icons';

// Import icons differently for web and native platforms
let IconMap: Record<IconNames, any> = {};

if (Platform.OS === 'web') {
  // Use lucide-react for web
  const { Burger, Coffee, Pizza, IceCream, Salad } = require('lucide-react');
  IconMap = {
    Burger,
    Pizza,
    Coffee,
    IceCream,
    Salad,
  };
} else {
  // Use lucide-react-native for native platforms
  const { Merge: Burger, Coffee, Pizza, IceCreamBowl: IceCream, Salad } = require('lucide-react-native');
  IconMap = {
    Burger,
    Pizza,
    Coffee,
    IceCream,
    Salad,
  };
}

interface CategoryButtonProps {
  title: string;
  icon: IconNames;
  color: string;
  onPress: () => void;
}

export default function CategoryButton({ title, icon, color, onPress }: CategoryButtonProps) {
  const IconComponent = IconMap[icon];

  if (!IconComponent) {
    console.warn(`Icon "${icon}" not found in IconMap`);
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <IconComponent size={24} color={color} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
});
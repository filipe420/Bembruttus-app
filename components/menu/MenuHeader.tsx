import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '@/constants/theme';

interface MenuHeaderProps {
  title: string;
}

export default function MenuHeader({ title }: MenuHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.text.primary,
  },
});
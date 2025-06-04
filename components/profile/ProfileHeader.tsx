import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

export default function ProfileHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
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
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export default function PageHeader({ title, showBackButton = false }: PageHeaderProps) {
  const handleBack = () => {
    router.back();
  };
  
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.text.primary,
  },
});
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle, Clock, MapPin } from 'lucide-react-native';
import { theme } from '@/constants/theme';

export default function OrderConfirmationScreen() {
  const insets = useSafeAreaInsets();
  
  const handleGoHome = () => {
    router.replace('/(tabs)');
  };
  
  const handleTrackOrder = () => {
    router.push('/order-tracking');
  };
  
  // Generate a random order number
  const orderNumber = Math.floor(1000 + Math.random() * 9000);
  
  // Calculate estimated delivery time (30-45 min from now)
  const now = new Date();
  const minTime = new Date(now.getTime() + 30 * 60000);
  const maxTime = new Date(now.getTime() + 45 * 60000);
  
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }
      ]}
    >
      <View style={styles.successIconContainer}>
        <CheckCircle size={60} color="#fff" />
      </View>
      
      <Text style={styles.title}>Pedido Confirmado!</Text>
      <Text style={styles.subtitle}>Seu pedido foi recebido e está sendo preparado</Text>
      
      <View style={styles.orderInfoCard}>
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Número do Pedido</Text>
          <Text style={styles.orderInfoValue}>#{orderNumber}</Text>
        </View>
        
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Data</Text>
          <Text style={styles.orderInfoValue}>
            {now.toLocaleDateString('pt-BR')}
          </Text>
        </View>
        
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Valor Total</Text>
          <Text style={styles.orderInfoValue}>R$ 42,80</Text>
        </View>
        
        <View style={styles.orderInfoRow}>
          <Text style={styles.orderInfoLabel}>Pagamento</Text>
          <Text style={styles.orderInfoValue}>Cartão de Crédito</Text>
        </View>
      </View>
      
      <View style={styles.deliveryInfoContainer}>
        <View style={styles.deliveryTimeContainer}>
          <Clock size={24} color={theme.colors.primary} />
          <View style={styles.deliveryTimeTextContainer}>
            <Text style={styles.deliveryTimeLabel}>Tempo Estimado</Text>
            <Text style={styles.deliveryTimeValue}>
              {formatTime(minTime)} - {formatTime(maxTime)}
            </Text>
          </View>
        </View>
        
        <View style={styles.deliveryAddressContainer}>
          <MapPin size={24} color={theme.colors.primary} />
          <View style={styles.deliveryAddressTextContainer}>
            <Text style={styles.deliveryAddressLabel}>Endereço de Entrega</Text>
            <Text style={styles.deliveryAddressValue}>
              Rua das Flores, 123, Apto 101, Centro
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.trackingImageContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg' }}
          style={styles.trackingImage}
        />
      </View>
      
      <View style={styles.stepsContainer}>
        <View style={styles.stepItem}>
          <View style={[styles.stepIndicator, styles.activeStepIndicator]}>
            <View style={styles.stepIndicatorInner} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Pedido Recebido</Text>
            <Text style={styles.stepTime}>{formatTime(now)}</Text>
          </View>
        </View>
        
        <View style={[styles.stepConnector, styles.activeStepConnector]} />
        
        <View style={styles.stepItem}>
          <View style={styles.stepIndicator}>
            <View style={styles.stepIndicatorInner} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Em Preparação</Text>
            <Text style={styles.stepTime}>Em breve</Text>
          </View>
        </View>
        
        <View style={styles.stepConnector} />
        
        <View style={styles.stepItem}>
          <View style={styles.stepIndicator}>
            <View style={styles.stepIndicatorInner} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>A Caminho</Text>
            <Text style={styles.stepTime}>-</Text>
          </View>
        </View>
        
        <View style={styles.stepConnector} />
        
        <View style={styles.stepItem}>
          <View style={styles.stepIndicator}>
            <View style={styles.stepIndicatorInner} />
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Entregue</Text>
            <Text style={styles.stepTime}>-</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.trackOrderButton}
        onPress={handleTrackOrder}
      >
        <Text style={styles.trackOrderButtonText}>Acompanhar Pedido</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.homeButton}
        onPress={handleGoHome}
      >
        <Text style={styles.homeButtonText}>Voltar para o Início</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: theme.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  orderInfoCard: {
    width: '100%',
    backgroundColor: theme.colors.gray[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  orderInfoLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  orderInfoValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  deliveryInfoContainer: {
    width: '100%',
    marginBottom: 32,
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  deliveryTimeTextContainer: {
    marginLeft: 12,
  },
  deliveryTimeLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  deliveryTimeValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  deliveryAddressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  deliveryAddressTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  deliveryAddressLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  deliveryAddressValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  trackingImageContainer: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 32,
  },
  trackingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  stepsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStepIndicator: {
    borderColor: theme.colors.primary,
  },
  stepIndicatorInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.gray[300],
  },
  activeStepIndicatorInner: {
    backgroundColor: theme.colors.primary,
  },
  stepContent: {
    marginLeft: 12,
    paddingVertical: 8,
  },
  stepTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  stepTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  stepConnector: {
    width: 2,
    height: 20,
    backgroundColor: theme.colors.gray[300],
    marginLeft: 11,
  },
  activeStepConnector: {
    backgroundColor: theme.colors.primary,
  },
  trackOrderButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  trackOrderButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
  },
  homeButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.primary,
  },
});
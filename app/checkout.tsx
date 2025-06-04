import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, CreditCard, Smartphone, Wallet, DollarSign, CheckCircle2 } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import CheckoutHeader from '@/components/checkout/CheckoutHeader';
import { theme } from '@/constants/theme';

const PAYMENT_METHODS = [
  { id: 'credit', name: 'Cartão de Crédito', icon: <CreditCard size={24} color={theme.colors.text.primary} /> },
  { id: 'pix', name: 'Pix', icon: <Smartphone size={24} color={theme.colors.text.primary} /> },
  { id: 'wallet', name: 'Carteira Digital', icon: <Wallet size={24} color={theme.colors.text.primary} /> },
  { id: 'cash', name: 'Dinheiro', icon: <DollarSign size={24} color={theme.colors.text.primary} /> },
];

export default function CheckoutScreen() {
  const insets = useSafeAreaInsets();
  const { items, getSubtotal, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('credit');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: 'Rua das Flores',
    number: '123',
    complement: 'Apto 101',
    neighborhood: 'Centro',
    city: 'São Paulo',
    state: 'SP',
  });
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const subtotal = getSubtotal();
  const deliveryFee = 6.90;
  const discount = 0;
  const total = subtotal + deliveryFee - discount;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      router.replace('/order-confirmation');
    }, 1500);
  };

  const navigateBack = () => {
    router.back();
  };

  if (isProcessing) {
    return (
      <View style={styles.processingContainer}>
        <View style={styles.processingContent}>
          <View style={styles.loadingIndicator}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg' }}
              style={styles.loadingLogo}
            />
          </View>
          <Text style={styles.processingTitle}>Processando seu pedido</Text>
          <Text style={styles.processingText}>Estamos confirmando seu pedido com o restaurante. Isso pode levar alguns segundos.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <CheckoutHeader onBack={navigateBack} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Endereço de Entrega</Text>
          
          <TouchableOpacity style={styles.addressCard}>
            <View style={styles.addressIconContainer}>
              <MapPin size={24} color="#fff" />
            </View>
            
            <View style={styles.addressDetails}>
              <Text style={styles.addressTitle}>Casa</Text>
              <Text style={styles.addressText}>
                {deliveryAddress.street}, {deliveryAddress.number}
              </Text>
              <Text style={styles.addressText}>
                {deliveryAddress.complement}, {deliveryAddress.neighborhood}
              </Text>
              <Text style={styles.addressText}>
                {deliveryAddress.city} - {deliveryAddress.state}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Trocar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
        
        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Método de Pagamento</Text>
          
          <View style={styles.paymentOptions}>
            {PAYMENT_METHODS.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentOption,
                  selectedPayment === method.id && styles.selectedPaymentOption
                ]}
                onPress={() => setSelectedPayment(method.id)}
              >
                <View style={styles.paymentIconContainer}>
                  {method.icon}
                </View>
                <Text style={[
                  styles.paymentOptionText,
                  selectedPayment === method.id && styles.selectedPaymentOptionText
                ]}>
                  {method.name}
                </Text>
                
                {selectedPayment === method.id && (
                  <View style={styles.checkIcon}>
                    <CheckCircle2 size={16} color={theme.colors.primary} fill="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          
          <View style={styles.orderItems}>
            {items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <View style={styles.orderItemQuantity}>
                  <Text style={styles.orderItemQuantityText}>{item.quantity}x</Text>
                </View>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <Text style={styles.orderItemPrice}>
                  R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                </Text>
              </View>
            ))}
          </View>
          
          <View style={styles.orderSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Taxa de entrega</Text>
              <Text style={styles.summaryValue}>R$ {deliveryFee.toFixed(2).replace('.', ',')}</Text>
            </View>
            
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Desconto</Text>
                <Text style={[styles.summaryValue, styles.discountValue]}>
                  -R$ {discount.toFixed(2).replace('.', ',')}
                </Text>
              </View>
            )}
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>R$ {total.toFixed(2).replace('.', ',')}</Text>
            </View>
          </View>
        </View>
        
        {/* Additional Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observações</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Alguma instrução especial para o seu pedido?"
            value={notes}
            onChangeText={setNotes}
            multiline
            placeholderTextColor={theme.colors.gray[400]}
          />
        </View>
        
        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }]}>
        <TouchableOpacity 
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderButtonText}>
            Confirmar Pedido • R$ {total.toFixed(2).replace('.', ',')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
  },
  addressIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressDetails: {
    flex: 1,
  },
  addressTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  addressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  changeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  changeButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: theme.colors.primary,
  },
  paymentOptions: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[200],
  },
  selectedPaymentOption: {
    backgroundColor: theme.colors.primary + '10',
  },
  paymentIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentOptionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
    flex: 1,
  },
  selectedPaymentOptionText: {
    color: theme.colors.primary,
  },
  checkIcon: {
    marginLeft: 8,
  },
  orderItems: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderItemQuantity: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderItemQuantityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.primary,
  },
  orderItemName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: theme.colors.text.primary,
    flex: 1,
  },
  orderItemPrice: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  orderSummary: {
    backgroundColor: theme.colors.gray[50],
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  summaryValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  discountValue: {
    color: theme.colors.success,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray[200],
    paddingTop: 12,
    marginBottom: 0,
  },
  totalLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  totalValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.primary,
  },
  notesInput: {
    backgroundColor: theme.colors.gray[100],
    borderRadius: 12,
    padding: 16,
    height: 100,
    textAlignVertical: 'top',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  placeOrderButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
  },
  processingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  processingContent: {
    alignItems: 'center',
  },
  loadingIndicator: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  loadingLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  processingTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: theme.colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  processingText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
});
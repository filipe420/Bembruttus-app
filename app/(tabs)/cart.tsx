import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Trash2, MinusCircle, PlusCircle, ChevronRight } from 'lucide-react-native';
import { useCart } from '@/contexts/CartContext';
import CartHeader from '@/components/cart/CartHeader';
import EmptyCart from '@/components/cart/EmptyCart';
import PriceBreakdown from '@/components/cart/PriceBreakdown';
import { theme } from '@/constants/theme';

export default function CartScreen() {
  const insets = useSafeAreaInsets();
  const { items, updateItemQuantity, removeItem, getSubtotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  
  const subtotal = getSubtotal();
  const deliveryFee = subtotal > 0 ? 6.90 : 0;
  const discount = 0; // Would be calculated based on applied coupons
  const total = subtotal + deliveryFee - discount;

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push('/checkout');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <CartHeader />
      </View>

      {items.length > 0 ? (
        <>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cartItemsContainer}>
              <Text style={styles.sectionTitle}>Seu Pedido</Text>
              
              {items.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </Text>
                    
                    <View style={styles.quantityControls}>
                      <TouchableOpacity 
                        onPress={() => updateItemQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <MinusCircle 
                          size={22} 
                          color={item.quantity <= 1 ? theme.colors.gray[300] : theme.colors.primary} 
                        />
                      </TouchableOpacity>
                      
                      <Text style={styles.quantity}>{item.quantity}</Text>
                      
                      <TouchableOpacity 
                        onPress={() => updateItemQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusCircle size={22} color={theme.colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeItem(item.id)}
                  >
                    <Trash2 size={20} color={theme.colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            
            {/* Coupon Section */}
            <View style={styles.couponContainer}>
              <Text style={styles.sectionTitle}>Cupom de Desconto</Text>
              <View style={styles.couponInputContainer}>
                <TextInput
                  style={styles.couponInput}
                  placeholder="Digite seu cupom"
                  value={couponCode}
                  onChangeText={setCouponCode}
                  placeholderTextColor={theme.colors.gray[400]}
                />
                <TouchableOpacity 
                  style={[
                    styles.couponButton,
                    { opacity: couponCode.length > 0 ? 1 : 0.5 }
                  ]}
                  disabled={couponCode.length === 0}
                >
                  <Text style={styles.couponButtonText}>Aplicar</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Price Breakdown */}
            <PriceBreakdown
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              discount={discount}
              total={total}
            />
            
            <View style={styles.deliverySection}>
              <Text style={styles.sectionTitle}>Entrega</Text>
              <TouchableOpacity style={styles.addressSelector}>
                <View>
                  <Text style={styles.addressTitle}>Casa</Text>
                  <Text style={styles.addressText}>Rua das Flores, 123</Text>
                </View>
                <ChevronRight size={20} color={theme.colors.gray[500]} />
              </TouchableOpacity>
            </View>
            
            {/* Bottom spacing for fixed button */}
            <View style={{ height: 90 }} />
          </ScrollView>
          
          <View style={[styles.checkoutContainer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 16 }]}>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Finalizar Pedido • R$ {total.toFixed(2).replace('.', ',')}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <EmptyCart />
      )}
    </KeyboardAvoidingView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  cartItemsContainer: {
    marginBottom: 24,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  itemPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: theme.colors.primary,
    marginVertical: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 6,
    alignSelf: 'flex-start',
  },
  couponContainer: {
    marginBottom: 24,
  },
  couponInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponInput: {
    flex: 1,
    backgroundColor: theme.colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  couponButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 8,
  },
  couponButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#fff',
  },
  deliverySection: {
    marginTop: 12,
  },
  addressSelector: {
    backgroundColor: theme.colors.gray[100],
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  addressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  checkoutContainer: {
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
  checkoutButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#fff',
  },
});
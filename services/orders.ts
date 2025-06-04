import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'delivered';
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  paymentMethod: string;
  createdAt: Date;
}

export async function createOrder(orderData: Order) {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: new Date(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getUserOrders(userId: string) {
  try {
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
}
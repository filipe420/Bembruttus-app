import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, MessageCircle, Phone, Mail } from 'lucide-react-native';
import PageHeader from '@/components/common/PageHeader';
import { theme } from '@/constants/theme';

const faqItems = [
  {
    id: '1',
    question: 'Como faço para acompanhar meu pedido?',
    answer: 'Você pode acompanhar seu pedido em tempo real através da aba "Pedidos" no menu principal do aplicativo.',
  },
  {
    id: '2',
    question: 'Qual o prazo de entrega?',
    answer: 'O prazo médio de entrega é de 30 a 45 minutos, podendo variar de acordo com a sua localização e o movimento do restaurante.',
  },
  {
    id: '3',
    question: 'Como funciona o programa de pontos?',
    answer: 'A cada R$ 1 gasto, você acumula 1 ponto. Os pontos podem ser trocados por produtos e descontos exclusivos.',
  },
];

export default function HelpScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <PageHeader title="Ajuda e Suporte" showBackButton />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Fale Conosco</Text>
          
          <View style={styles.contactOptions}>
            <TouchableOpacity style={styles.contactOption}>
              <View style={[styles.contactIcon, { backgroundColor: '#E3F2FD' }]}>
                <MessageCircle size={24} color="#2196F3" />
              </View>
              <Text style={styles.contactText}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactOption}>
              <View style={[styles.contactIcon, { backgroundColor: '#E8F5E9' }]}>
                <Phone size={24} color="#4CAF50" />
              </View>
              <Text style={styles.contactText}>Telefone</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactOption}>
              <View style={[styles.contactIcon, { backgroundColor: '#FFF3E0' }]}>
                <Mail size={24} color="#FF9800" />
              </View>
              <Text style={styles.contactText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Perguntas Frequentes</Text>
          
          {faqItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.faqItem}>
              <View style={styles.faqContent}>
                <Text style={styles.question}>{item.question}</Text>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.gray[400]} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  contactSection: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  contactOption: {
    alignItems: 'center',
    flex: 1,
  },
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.primary,
  },
  faqSection: {
    padding: 16,
    borderTopWidth: 8,
    borderTopColor: theme.colors.gray[100],
  },
  faqItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  faqContent: {
    flex: 1,
    marginRight: 16,
  },
  question: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  answer: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
});
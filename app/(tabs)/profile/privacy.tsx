import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PageHeader from '@/components/common/PageHeader';
import { theme } from '@/constants/theme';

export default function PrivacyScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <PageHeader title="Política de Privacidade" showBackButton />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Coleta de Dados</Text>
          <Text style={styles.text}>
            Coletamos informações necessárias para proporcionar a melhor experiência possível em nosso aplicativo. Isso inclui:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Dados de cadastro (nome, email, telefone)</Text>
            <Text style={styles.bulletPoint}>• Endereços de entrega</Text>
            <Text style={styles.bulletPoint}>• Histórico de pedidos</Text>
            <Text style={styles.bulletPoint}>• Preferências de consumo</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Uso das Informações</Text>
          <Text style={styles.text}>
            Utilizamos suas informações para:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Processar seus pedidos</Text>
            <Text style={styles.bulletPoint}>• Melhorar nossos serviços</Text>
            <Text style={styles.bulletPoint}>• Enviar atualizações sobre pedidos</Text>
            <Text style={styles.bulletPoint}>• Comunicar promoções e novidades</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Proteção de Dados</Text>
          <Text style={styles.text}>
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Compartilhamento</Text>
          <Text style={styles.text}>
            Não vendemos ou compartilhamos seus dados pessoais com terceiros, exceto quando necessário para:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Realizar entregas</Text>
            <Text style={styles.bulletPoint}>• Processar pagamentos</Text>
            <Text style={styles.bulletPoint}>• Cumprir obrigações legais</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Seus Direitos</Text>
          <Text style={styles.text}>
            Você tem direito a:
          </Text>
          <View style={styles.bulletPoints}>
            <Text style={styles.bulletPoint}>• Acessar seus dados</Text>
            <Text style={styles.bulletPoint}>• Corrigir informações incorretas</Text>
            <Text style={styles.bulletPoint}>• Solicitar exclusão de dados</Text>
            <Text style={styles.bulletPoint}>• Revogar consentimento</Text>
          </View>
        </View>

        <View style={[styles.section, { marginBottom: 40 }]}>
          <Text style={styles.sectionTitle}>6. Contato</Text>
          <Text style={styles.text}>
            Para questões relacionadas à privacidade, entre em contato através do email: privacy@bembruttus.com
          </Text>
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
    marginBottom: 12,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  bulletPoints: {
    marginTop: 8,
  },
  bulletPoint: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 24,
    marginLeft: 8,
  },
});
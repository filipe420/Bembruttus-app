import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PageHeader from '@/components/common/PageHeader';
import { theme } from '@/constants/theme';
import { useState } from 'react';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    orderUpdates: true,
    promotions: true,
    locationServices: true,
    darkMode: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <PageHeader title="Configurações" showBackButton />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Notificações Push</Text>
              <Text style={styles.settingDescription}>Receber notificações no celular</Text>
            </View>
            <Switch
              value={settings.pushNotifications}
              onValueChange={() => toggleSetting('pushNotifications')}
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary + '80' }}
              thumbColor={settings.pushNotifications ? theme.colors.primary : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Notificações por Email</Text>
              <Text style={styles.settingDescription}>Receber atualizações por email</Text>
            </View>
            <Switch
              value={settings.emailNotifications}
              onValueChange={() => toggleSetting('emailNotifications')}
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary + '80' }}
              thumbColor={settings.emailNotifications ? theme.colors.primary : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Atualizações de Pedidos</Text>
              <Text style={styles.settingDescription}>Status e confirmações de pedidos</Text>
            </View>
            <Switch
              value={settings.orderUpdates}
              onValueChange={() => toggleSetting('orderUpdates')}
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary + '80' }}
              thumbColor={settings.orderUpdates ? theme.colors.primary : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Promoções</Text>
              <Text style={styles.settingDescription}>Ofertas e novidades exclusivas</Text>
            </View>
            <Switch
              value={settings.promotions}
              onValueChange={() => toggleSetting('promotions')}
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary + '80' }}
              thumbColor={settings.promotions ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacidade</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Serviços de Localização</Text>
              <Text style={styles.settingDescription}>Permitir acesso à localização</Text>
            </View>
            <Switch
              value={settings.locationServices}
              onValueChange={() => toggleSetting('locationServices')}
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary + '80' }}
              thumbColor={settings.locationServices ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aparência</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Modo Escuro</Text>
              <Text style={styles.settingDescription}>Alterar tema do aplicativo</Text>
            </View>
            <Switch
              value={settings.darkMode}
              onValueChange={() => toggleSetting('darkMode')}
              trackColor={{ false: theme.colors.gray[300], true: theme.colors.primary + '80' }}
              thumbColor={settings.darkMode ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do App</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Versão</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Última Atualização</Text>
            <Text style={styles.infoValue}>15/03/2024</Text>
          </View>
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
  section: {
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: theme.colors.gray[100],
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  infoValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: theme.colors.text.primary,
  },
});
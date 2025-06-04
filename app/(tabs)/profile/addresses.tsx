import { View, Text, StyleSheet } from 'react-native';

export default function Addresses() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Addresses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
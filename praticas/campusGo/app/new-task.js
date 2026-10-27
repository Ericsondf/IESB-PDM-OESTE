import { Button, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function NewTask() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nova tarefa</Text>
      <Button title="Fechar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  text: { fontSize: 22, fontWeight: '700' },
});

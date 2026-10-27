import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useNotices from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';
import { api } from '../../services/api';

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  async function handleCreate() {
    try {
      const created = await api.create('posts', {
        title: 'Novo aviso do CampusGo',
        body: 'Aviso criado pelo app.',
        userId: 1,
      });
      Alert.alert('Aviso criado', `id devolvido: ${created.id}`);
    } catch (err) {
      Alert.alert('Erro', err.message);
    }
  }

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.muted}>Carregando avisos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      ListHeaderComponent={<Button title="Criar aviso" onPress={handleCreate} />}
      ListEmptyComponent={
        <Text style={styles.muted}>Nenhum aviso por enquanto.</Text>
      }
      renderItem={({ item }) => (
        <FadeIn>
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: '#f3f4f6' },
  content: { padding: 16, gap: 12 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  body: { fontSize: 14, color: '#374151' },
  muted: { color: '#6b7280', textAlign: 'center' },
  error: { color: '#b91c1c', textAlign: 'center', fontSize: 16 },
});

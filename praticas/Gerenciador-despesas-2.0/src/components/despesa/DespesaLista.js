import { FlatList, StyleSheet, Text, View, useColorScheme, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTheme } from '../../constants/theme';
import DespesaItem from './DespesaItem';

export default function DespesaLista({
  expenses,
  ListHeaderComponent,
  emptyMessage = 'Nenhuma despesa.',
  emptyHint = 'Toque em + para adicionar.',
}) {
  const theme = getTheme(useColorScheme());
  const { width } = useWindowDimensions();
  const numColumns = width > 600 ? 2 : 1;

  function renderEmpty() {
    return (
      <View style={styles.empty}>
        <Ionicons name="wallet-outline" size={64} color={theme.textMuted} />
        <Text style={[styles.emptyTitle, { color: theme.text }]}>{emptyMessage}</Text>
        <Text style={[styles.emptyHint, { color: theme.textMuted }]}>{emptyHint}</Text>
      </View>
    );
  }

  return (
    <FlatList
      key={numColumns}
      data={expenses}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View style={numColumns > 1 ? styles.column : null}>
          <DespesaItem expense={item} />
        </View>
      )}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 12, flexGrow: 1 },
  column: { width: '50%' },
  empty: { alignItems: 'center', justifyContent: 'center', paddingTop: 48 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 12 },
  emptyHint: { fontSize: 14, marginTop: 4, textAlign: 'center' },
});

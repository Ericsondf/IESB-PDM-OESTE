import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

// Sub-componente de cada linha da lista (mantém o MetaList mais limpo)
function MetaItem({ item, onDelete, onToggle }) {
  return (
    <View style={styles.item}>
      <Pressable style={styles.textArea} onPress={() => onToggle(item.id)}>
        <Text style={[styles.texto, item.concluida && styles.textoConcluido]}>
          {item.texto}
        </Text>
        <Text style={styles.data}>
          {new Date(item.criadaEm).toLocaleDateString('pt-BR')}
        </Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
        android_ripple={{ color: '#ffffff55' }}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteText}>Excluir</Text>
      </Pressable>
    </View>
  );
}

// props: metas (array), onDelete (fn), onToggle (fn)
export default function MetaList({ metas, onDelete, onToggle }) {
  if (metas.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id} // id único, nunca o index!
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <MetaItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  textArea: { flex: 1 },
  texto: { fontSize: 16, color: '#111827' },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  data: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  deleteButton: {
    backgroundColor: '#dc2626',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
  },
  deleteButtonPressed: { opacity: 0.8 },
  deleteText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  empty: { padding: 24, alignItems: 'center' },
  emptyText: { color: '#6b7280', fontSize: 15 },
});

// components/CompromissoList.js
// Aula 05 - Componentização e props
// Aula 06 - Pressable para remoção + key estável baseada no id

import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

// Props recebidas do componente pai (App.js):
// itens       -> array de compromissos [{ id, texto, criadoEm }]
// onDelete    -> função chamada ao pressionar "remover" em um item (recebe o id)
// tituloLista -> texto do cabeçalho da lista
// listaVazia  -> texto exibido quando não há compromissos
export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id} // key estável baseada no id, nunca no index
        contentContainerStyle={itens.length === 0 && styles.listaVaziaContainer}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>{listaVazia}</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTexto}>{item.texto}</Text>
              <Text style={styles.itemData}>{item.criadoEm}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.botaoRemover,
                pressed && styles.botaoRemoverPressed,
              ]}
              android_ripple={{ color: '#fecaca' }}
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.botaoRemoverTexto}>Remover</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Aula 04 - lista ocupa o restante da tela
    marginTop: 20,
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  listaVaziaContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoVazio: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row', // Aula 04 - linha: informações + botão remover
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemTexto: {
    fontSize: 15,
    color: '#0f172a',
  },
  itemData: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  botaoRemover: {
    backgroundColor: '#fee2e2',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  botaoRemoverPressed: {
    backgroundColor: '#fecaca',
  },
  botaoRemoverTexto: {
    color: '#b91c1c',
    fontSize: 12,
    fontWeight: '600',
  },
});

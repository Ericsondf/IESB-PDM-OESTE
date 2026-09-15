// components/CompromissoInput.js
// Aula 05 - Componentização e props
// Aula 04 - Layout em linha (Flexbox) para o formulário

import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

// Props recebidas do componente pai (App.js):
// value        -> texto atual digitado no input
// onChangeText -> função chamada a cada alteração do texto
// onAdd        -> função chamada ao pressionar o botão de adicionar
// labels       -> objeto com os textos (placeholder, botão) vindos de labels.js
export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="done"
        onSubmitEditing={onAdd}
      />

      <Pressable
        style={({ pressed }) => [
          styles.botao,
          pressed && styles.botaoPressed,
        ]}
        android_ripple={{ color: '#1d4ed8' }}
        onPress={onAdd}
      >
        <Text style={styles.botaoTexto}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Aula 04 - linha: input + botão lado a lado
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  input: {
    width: '68%', // Aula 04 - uso de largura percentual
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 12,
    fontSize: 15,
  },
  botao: {
    flex: 1, // Aula 04 - uso de flex para ocupar o espaço restante
    height: 46,
    marginLeft: 8,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPressed: {
    backgroundColor: '#1d4ed8',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

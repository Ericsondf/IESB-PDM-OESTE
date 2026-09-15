// App.js
// Atividade Integradora - RotinaIESB
// Consolida: Aula 02 (estrutura), Aula 03 (import/export, estilos),
// Aula 04 (Flexbox), Aula 05 (useState, props, componentização)
// e Aula 06 (Pressable, useEffect, AsyncStorage, JSON)

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as labels from './labels';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

// Aula 06 - chave usada no AsyncStorage
const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  // Aula 05 - useState para o texto digitado e para a lista de compromissos
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Aula 06 - useEffect de MONTAGEM: carrega os dados salvos no AsyncStorage
  useEffect(() => {
    async function carregarCompromissos() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (erro) {
        console.log('Erro ao carregar compromissos:', erro);
        Alert.alert('Ops', labels.mensagemErroStorage);
      } finally {
        // só passa a salvar depois que a primeira carga terminar
        setCarregado(true);
      }
    }

    carregarCompromissos();
  }, []);

  // Aula 06 - useEffect que SALVA sempre que a lista de compromissos muda
  useEffect(() => {
    // evita sobrescrever o storage com [] antes da carga inicial terminar
    if (!carregado) return;

    async function salvarCompromissos() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (erro) {
        console.log('Erro ao salvar compromissos:', erro);
        Alert.alert('Ops', labels.mensagemErroStorage);
      }
    }

    salvarCompromissos();
  }, [compromissos, carregado]);

  // Aula 06 - adicionar compromisso (com validação de texto vazio)
  function handleAdicionar() {
    const textoLimpo = texto.trim();

    if (textoLimpo.length === 0) {
      Alert.alert('Atenção', labels.mensagemErroVazio);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(), // id único e estável
      texto: textoLimpo,
      criadoEm: new Date().toLocaleString('pt-BR'),
    };

    // nunca mutar o array: cria um novo array com o spread
    setCompromissos((listaAtual) => [novoCompromisso, ...listaAtual]);
    setTexto('');
  }

  // Aula 06 - remover compromisso por id, usando filter
  function handleRemover(id) {
    setCompromissos((listaAtual) => listaAtual.filter((item) => item.id !== id));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Cabeçalho - Aula 04: linha com imagem + título */}
        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={styles.tituloApp}>{labels.tituloApp}</Text>
        </View>

        {/* Formulário - componente filho com props */}
        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdicionar}
          labels={labels}
        />

        {/* Lista - componente filho com props, ocupa o restante da tela (flex: 1) */}
        <CompromissoList
          itens={compromissos}
          onDelete={handleRemover}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    flexDirection: 'row', // Aula 04 - cabeçalho em linha
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  tituloApp: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
});

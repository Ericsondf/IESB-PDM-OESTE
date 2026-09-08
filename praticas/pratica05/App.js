import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregado, setCarregado] = useState(false); // evita salvar antes de carregar

  // ---------- useEffect Nº1: CARREGAR do AsyncStorage na montagem ----------
  useEffect(() => {
    async function carregarMetas() {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) {
          setMetas(JSON.parse(json));
        }
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível carregar suas metas salvas.');
      } finally {
        setCarregado(true);
      }
    }
    carregarMetas();
  }, []); // [] = roda só uma vez, quando o app monta

  // ---------- useEffect Nº2: SALVAR sempre que "metas" mudar ----------
  useEffect(() => {
    if (!carregado) return; // não salva antes do carregamento inicial terminar
    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (erro) {
        Alert.alert('Erro', 'Não foi possível salvar suas metas.');
      }
    }
    salvarMetas();
  }, [metas, carregado]); // roda toda vez que a lista de metas mudar

  function handleAdd() {
    const textoLimpo = texto.trim();
    if (textoLimpo.length === 0) {
      Alert.alert('Atenção', 'Digite uma meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(), // id único e estável
      texto: textoLimpo,
      criadaEm: new Date().toISOString(),
      concluida: false, // desafio opcional
    };

    // nunca usar push() direto no state -> sempre criar um array novo
    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTexto('');
  }

  function handleDelete(id) {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  }

  function handleToggle(id) {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  }

  const pendentes = metas.filter((m) => !m.concluida).length;
  const concluidas = metas.filter((m) => m.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./assets/icon.png')} style={styles.logo} />
          <View>
            <Text style={styles.titulo}>Metas do Semestre</Text>
            <Text style={styles.contador}>
              {pendentes} pendentes / {concluidas} concluídas
            </Text>
          </View>
        </View>

        <MetaInput value={texto} onChangeText={setTexto} onAdd={handleAdd} />

        <MetaList metas={metas} onDelete={handleDelete} onToggle={handleToggle} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  logo: { width: 40, height: 40, borderRadius: 8 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  contador: { fontSize: 13, color: '#6b7280', marginTop: 2 },
});

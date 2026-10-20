import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { CATEGORIES } from '../constants/categories';
import { getTheme } from '../constants/theme';
import useDebounce from '../hooks/useDebounce';
import { useExpenses } from '../store/expenses-context';

export default function TodasDespesas() {
  const { expenses, clearExpenses } = useExpenses();
  const theme = getTheme(useColorScheme());
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const debouncedSearch = useDebounce(search, 300);

  const filteredExpenses = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return expenses
      .filter(
        (e) =>
          e.description.toLowerCase().includes(term) &&
          (!selectedCategory || e.category === selectedCategory)
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses, debouncedSearch, selectedCategory]);

  const isFiltering = debouncedSearch.trim() !== '' || selectedCategory !== null;

  function handleClearAll() {
    Alert.alert('Limpar tudo', 'Deseja apagar todas as despesas?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Apagar tudo', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.toolbar}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por descrição"
          placeholderTextColor={theme.textMuted}
          style={[
            styles.search,
            { backgroundColor: theme.input, borderColor: theme.border, color: theme.text },
          ]}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(active ? null : category)}
                style={[
                  styles.chip,
                  { backgroundColor: active ? theme.primary : theme.chip },
                ]}
              >
                <Text style={{ color: active ? theme.onPrimary : theme.text }}>{category}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        {expenses.length > 0 && (
          <Pressable onPress={handleClearAll} style={styles.clear}>
            <Text style={{ color: theme.error }}>Limpar tudo</Text>
          </Pressable>
        )}
      </View>
      <DespesaSaida
        expenses={filteredExpenses}
        periodName={isFiltering ? 'Resultado da busca' : 'Total'}
        emptyMessage={isFiltering ? 'Nenhuma despesa encontrada.' : 'Nenhuma despesa.'}
        emptyHint={
          isFiltering ? 'Tente outro termo ou categoria.' : 'Toque em + para adicionar.'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: { paddingHorizontal: 16, paddingTop: 12 },
  search: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  chips: { marginTop: 8, flexGrow: 0 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8 },
  clear: { alignSelf: 'flex-end', marginTop: 8 },
});

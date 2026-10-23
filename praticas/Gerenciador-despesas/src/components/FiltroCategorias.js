import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { CATEGORIAS } from '../data/despesas';

// Barra de filtro por categoria. "Todas" = sem filtro (categoria '').
function FiltroCategorias({ categoriaSelecionada, onSelecionar }) {
  const opcoes = ['', ...CATEGORIAS];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.barra}
      contentContainerStyle={styles.barraConteudo}
    >
      {opcoes.map((opcao) => {
        const selecionada = opcao === categoriaSelecionada;

        return (
          <Pressable
            key={opcao || 'todas'}
            onPress={() => onSelecionar(opcao)}
            style={[styles.chip, selecionada && styles.chipSelecionado]}
          >
            <Text
              style={[styles.chipTexto, selecionada && styles.chipTextoSelecionado]}
            >
              {opcao || 'Todas'}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

export default FiltroCategorias;

const styles = StyleSheet.create({
  barra: {
    flexGrow: 0,
    marginVertical: 8,
  },
  barraConteudo: {
    paddingHorizontal: 5,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginHorizontal: 3,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff',
  },
  chipSelecionado: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  chipTexto: {
    fontSize: 14,
    color: '#333',
  },
  chipTextoSelecionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

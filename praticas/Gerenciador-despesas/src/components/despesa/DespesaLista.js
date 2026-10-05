import { FlatList, Text, StyleSheet } from 'react-native';
import DespesaItem from './DespesaItem';

function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      renderItem={DespesaItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text style={styles.vazio}>Nenhuma despesa encontrada.</Text>
      }
    />
  );
}

export default DespesaLista;

const styles = StyleSheet.create({
  vazio: {
    textAlign: 'center',
    marginTop: 24,
    color: '#666',
  },
});

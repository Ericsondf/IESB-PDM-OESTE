import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function getDataFormatada(data) {
  return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear();
}

function DespesaItem({ item }) {
  const navigation = useNavigation();

  function abrirDespesa() {
    navigation.navigate('GerenciarDespesa', { despesaId: item.id });
  }

  return (
    <Pressable onPress={abrirDespesa} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.itemContainer}>
        <View style={styles.itemText}>
          <Text>{getDataFormatada(item.data)}</Text>
          <View style={styles.categoriaTag}>
            <Text style={styles.categoriaTexto}>{item.categoria}</Text>
          </View>
        </View>
        <View style={styles.itemText}>
          <Text>{item.descricao}</Text>
        </View>
        <View style={styles.itemText}>
          <Text>R$ {item.valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default DespesaItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  itemContainer: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
  },
  itemText: {
    flex: 1,
    padding: 2,
    marginVertical: 2,
    marginHorizontal: 2,
    alignContent: 'flex-start',
  },
  categoriaTag: {
    alignSelf: 'flex-start',
    marginTop: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
    backgroundColor: '#f2f2f2',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 12,
  },
  categoriaTexto: {
    fontSize: 11,
    color: '#444',
  },
});

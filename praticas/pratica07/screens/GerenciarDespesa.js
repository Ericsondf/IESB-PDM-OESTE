import { View, Text, StyleSheet } from 'react-native';

function GerenciarDespesa() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gerenciar Despesa</Text>
    </View>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
});

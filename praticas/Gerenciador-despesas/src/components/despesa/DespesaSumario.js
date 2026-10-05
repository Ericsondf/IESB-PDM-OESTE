import { View, Text, StyleSheet } from 'react-native';

const LIMITE_ALERTA = 200;

function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + despesa.valor;
  }, 0);

  // Desafio extra: acima de R$ 200,00 o valor fica vermelho
  const ultrapassouLimite = somaDespesas > LIMITE_ALERTA;

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, ultrapassouLimite && styles.somaAlerta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

export default DespesaSumario;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: 'darkgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  periodo: {
    fontSize: 14,
    color: '#fff',
  },
  soma: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  somaAlerta: {
    color: 'red',
  },
});

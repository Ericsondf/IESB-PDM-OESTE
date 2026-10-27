import { Button, Share, StyleSheet, Text, View } from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses } = useExpenses();
  const list = expenses ?? [];
  const total = list.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalText = total.toFixed(2);

  async function handleShare() {
    try {
      await Share.share({ message: `Gastei R$ ${totalText} neste semestre.` });
    } catch (err) {
      // usuário cancelou ou o menu não abriu
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total gasto</Text>
      <Text style={styles.total}>R$ {totalText}</Text>
      <Button title="Compartilhar resumo" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  label: { fontSize: 16, color: '#6b7280' },
  total: { fontSize: 36, fontWeight: '700', marginBottom: 12 },
});

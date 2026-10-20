import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { cardShadow, getTheme } from '../../constants/theme';
import { formatCurrency } from '../../util/format';

export default function DespesaSumario({ expenses, periodName }) {
  const theme = getTheme(useColorScheme());
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <View style={[styles.container, cardShadow, { backgroundColor: theme.card }]}>
      <View>
        <Text style={[styles.period, { color: theme.textMuted }]}>{periodName}</Text>
        <Text style={[styles.count, { color: theme.text }]}>
        {`${expenses.length} ${expenses.length === 1 ? 'despesa' : 'despesas'}`}
</Text>
      </View>
      <Text style={[styles.total, { color: theme.primary }]}>{formatCurrency(total)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 4,
    marginBottom: 8,
    borderRadius: 8,
  },
  period: { fontSize: 12 },
  count: { fontSize: 14, fontWeight: '600' },
  total: { fontSize: 20, fontWeight: 'bold' },
});

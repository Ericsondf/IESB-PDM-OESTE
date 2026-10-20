import { useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getTheme } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import { daysAgo, endOfToday } from '../util/format';

export default function DespesasRecentes() {
  const { expenses } = useExpenses();
  const theme = getTheme(useColorScheme());

  const recentExpenses = useMemo(() => {
    const start = daysAgo(7);
    const end = endOfToday();
    return expenses
      .filter((e) => {
        const date = new Date(e.date);
        return date >= start && date <= end;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <DespesaSaida
        expenses={recentExpenses}
        periodName="Últimos 7 dias"
        emptyMessage="Nenhuma despesa nos últimos 7 dias."
      />
    </View>
  );
}

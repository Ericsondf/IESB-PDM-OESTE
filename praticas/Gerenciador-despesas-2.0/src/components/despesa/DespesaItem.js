import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { cardShadow, getTheme } from '../../constants/theme';
import { formatCurrency, formatDate } from '../../util/format';

export default function DespesaItem({ expense }) {
  const navigation = useNavigation();
  const theme = getTheme(useColorScheme());

  function handlePress() {
    navigation.navigate('GerenciarDespesa', { expenseId: expense.id });
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        cardShadow,
        { backgroundColor: theme.card },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.description, { color: theme.text }]} numberOfLines={1}>
          {expense.description}
        </Text>
        <Text style={[styles.meta, { color: theme.textMuted }]}>
          {formatDate(expense.date)} · {expense.category}
        </Text>
      </View>
      <View style={[styles.amountBox, { backgroundColor: theme.primary }]}>
        <Text style={[styles.amount, { color: theme.onPrimary }]}>
          {formatCurrency(expense.amount)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  pressed: { opacity: 0.7 },
  info: { flex: 1, marginRight: 8 },
  description: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  meta: { fontSize: 12 },
  amountBox: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  amount: { fontWeight: 'bold' },
});

import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

// Saída das despesas: cabeçalho com quantidade/total + lista (FlatList).
export default function DespesaSaida({ expenses, periodName, emptyMessage, emptyHint }) {
  return (
    <DespesaLista
      expenses={expenses}
      emptyMessage={emptyMessage}
      emptyHint={emptyHint}
      ListHeaderComponent={<DespesaSumario expenses={expenses} periodName={periodName} />}
    />
  );
}

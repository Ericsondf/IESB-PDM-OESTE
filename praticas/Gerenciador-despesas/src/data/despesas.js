// Dados de exemplo (DUMMY) compartilhados pelas telas.
// Agora cada despesa possui o atributo "categoria".

export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

// Retorna uma data "n" dias antes de hoje (n negativo = data futura).
function diasAtras(n) {
  const data = new Date();
  data.setDate(data.getDate() - n);
  return data;
}

export const DUMMY_DESPESAS = [
  {
    id: '1',
    descricao: 'Conta de luz',
    valor: 100.99,
    data: diasAtras(20),
    categoria: 'Contas',
  },
  {
    id: '2',
    descricao: 'Conta de Agua',
    valor: 40.99,
    data: diasAtras(3),
    categoria: 'Contas',
  },
  {
    id: '3',
    descricao: 'Almoço',
    valor: 32.5,
    data: diasAtras(1),
    categoria: 'Alimentação',
  },
  {
    id: '4',
    descricao: 'Uber',
    valor: 27.9,
    data: diasAtras(2),
    categoria: 'Transporte',
  },
  {
    id: '5',
    descricao: 'Cinema',
    valor: 48,
    data: diasAtras(15),
    categoria: 'Lazer',
  },
  {
    id: '6',
    descricao: 'Supermercado',
    valor: 187.35,
    data: diasAtras(6),
    categoria: 'Alimentação',
  },
  {
    // Despesa futura: não deve aparecer em "Despesas Recentes"
    id: '7',
    descricao: 'Show (ingresso)',
    valor: 150,
    data: diasAtras(-10),
    categoria: 'Lazer',
  },
];

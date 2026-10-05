// Filtra o array de despesas pela categoria selecionada.
// Se nenhuma categoria estiver selecionada (''), devolve todas as despesas.
export function filtrarPorCategoria(despesas, categoria) {
  if (!categoria) {
    return despesas;
  }

  return despesas.filter((despesa) => despesa.categoria === categoria);
}

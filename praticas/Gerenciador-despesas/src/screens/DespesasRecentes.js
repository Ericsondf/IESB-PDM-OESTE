import { useState } from 'react';
import { View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategorias from '../components/FiltroCategorias';
import { DUMMY_DESPESAS } from '../data/despesas';
import { filtrarPorCategoria } from '../utils/filtros';

function DespesasRecentes() {
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  // Mantém apenas as despesas dos últimos 7 dias (sem despesas futuras)
  function filtrarUltimos7Dias(despesas) {
    const hoje = new Date();
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(hoje.getDate() - 7);

    return despesas.filter((despesa) => {
      return despesa.data >= seteDiasAtras && despesa.data <= hoje;
    });
  }

  const despesasRecentes = filtrarUltimos7Dias(DUMMY_DESPESAS);
  const despesasFiltradas = filtrarPorCategoria(despesasRecentes, categoriaFiltro);
  const periodo = categoriaFiltro
    ? 'Últimos 7 dias - ' + categoriaFiltro
    : 'Últimos 7 dias';

  return (
    <View style={{ flex: 1 }}>
      <FiltroCategorias
        categoriaSelecionada={categoriaFiltro}
        onSelecionar={setCategoriaFiltro}
      />
      <DespesaSaida despesas={despesasFiltradas} periodo={periodo} />
    </View>
  );
}

export default DespesasRecentes;

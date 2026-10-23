import { useState } from 'react';
import { View } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategorias from '../components/FiltroCategorias';
import { DUMMY_DESPESAS } from '../data/despesas';
import { filtrarPorCategoria } from '../utils/filtros';

function TodasDespesas() {
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  // Lista filtrada pela categoria selecionada (.filter())
  const despesasFiltradas = filtrarPorCategoria(DUMMY_DESPESAS, categoriaFiltro);
  const periodo = categoriaFiltro ? 'Total - ' + categoriaFiltro : 'Total';

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

export default TodasDespesas;

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIAS, DUMMY_DESPESAS } from '../data/despesas';

function GerenciarDespesa({ route, navigation }) {
  // Se vier um id pela navegação, a tela abre em modo de edição
  const despesaId = route.params?.despesaId;
  const despesaEditada = DUMMY_DESPESAS.find((despesa) => despesa.id === despesaId);

  const [data, setData] = useState(despesaEditada ? despesaEditada.data : new Date());
  const [valor, setValor] = useState(despesaEditada ? despesaEditada.valor.toFixed(2) : '');
  const [descricao, setDescricao] = useState(despesaEditada ? despesaEditada.descricao : '');
  const [categoria, setCategoria] = useState(despesaEditada ? despesaEditada.categoria : '');

  const [showPicker, setShowPicker] = useState(false);
  const [erro, setErro] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
  };

  // Aceita vírgula ou ponto e limita a 2 casas decimais
  const handleChangeValor = (text) => {
    const cleanText = text.replace(',', '.');

    // Expressão para capturar apenas números com até 2 casas decimais
    const match = cleanText.match(/^\d*\.?\d{0,2}$/);

    if (match) {
      setValor(cleanText);
    }
  };

  // Valida descrição, valor e categoria antes de enviar
  function validarFormulario() {
    if (descricao.trim() === '') {
      return 'Informe a descrição da despesa.';
    }
    if (valor === '' || isNaN(parseFloat(valor)) || parseFloat(valor) <= 0) {
      return 'Informe um valor maior que zero.';
    }
    if (categoria === '') {
      return 'Selecione uma categoria.';
    }
    return '';
  }

  function handleSalvar() {
    const mensagem = validarFormulario();
    setErro(mensagem);

    if (mensagem !== '') {
      return;
    }

    const despesa = {
      id: despesaId || String(new Date().getTime()),
      descricao: descricao.trim(),
      valor: parseFloat(valor),
      data,
      categoria,
    };

    console.log('Despesa pronta para ser salva:', despesa);

    Alert.alert(
      despesaEditada ? 'Despesa atualizada' : 'Despesa cadastrada',
      despesa.descricao + ' - R$ ' + despesa.valor.toFixed(2) + ' (' + despesa.categoria + ')',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  }

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          maxLength={20}
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Valor da Despesa</Text>
        <TextInput
          style={styles.input}
          keyboardType={'decimal-pad'}
          maxLength={10}
          value={valor}
          onChangeText={handleChangeValor}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data da Despesa</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
          <Text>{data.toLocaleDateString('pt-BR')}</Text>
        </Pressable>
        {showPicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categorias}>
          {CATEGORIAS.map((item) => {
            const selecionada = item === categoria;

            return (
              <Pressable
                key={item}
                onPress={() => setCategoria(item)}
                style={[styles.categoriaBotao, selecionada && styles.categoriaSelecionada]}
              >
                <Text
                  style={[
                    styles.categoriaTexto,
                    selecionada && styles.categoriaTextoSelecionado,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <View style={styles.botoes}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={[styles.botao, styles.botaoCancelar]}
        >
          <Text style={styles.botaoTextoCancelar}>Cancelar</Text>
        </Pressable>
        <Pressable onPress={handleSalvar} style={[styles.botao, styles.botaoSalvar]}>
          <Text style={styles.botaoTextoSalvar}>
            {despesaEditada ? 'Atualizar' : 'Salvar'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default GerenciarDespesa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoriaBotao: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  categoriaSelecionada: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  categoriaTexto: {
    color: '#333',
  },
  categoriaTextoSelecionado: {
    color: '#fff',
    fontWeight: 'bold',
  },
  erro: {
    color: 'red',
    marginHorizontal: 4,
    marginBottom: 8,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginHorizontal: 4,
    marginBottom: 24,
  },
  botao: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 8,
    borderRadius: 4,
  },
  botaoCancelar: {
    borderWidth: 1,
    borderColor: '#999',
  },
  botaoSalvar: {
    backgroundColor: '#1976d2',
  },
  botaoTextoCancelar: {
    color: '#333',
  },
  botaoTextoSalvar: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

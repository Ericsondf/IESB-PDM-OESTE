import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { rotulo_btn_cadastro_meta, rotulo_input_meta, rotulo_lista_metas } from './mensagens';

export default function App() {
  return (
    <View style={styles.mainContainer}>

      <TextInput
        style={styles.inputText}
        placeholder={rotulo_input_meta}
      />

      <Button
        title={rotulo_btn_cadastro_meta}
      />

      <Text>
        {rotulo_lista_metas}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
  },

  inputText: {
    borderColor: '#8f0d0d',
    borderWidth: 1,
    width: 150,
    height: 40,
    marginBottom: 10,
  },
});
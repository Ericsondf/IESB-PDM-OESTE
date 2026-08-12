import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { titulo } from './util';
import titulo_padrao from './util.js';

  export default function App(){
   return (
    <View style={styles.container}>
      <Text style={{margin:20}}>{titulo_padrao}</Text>
      <text style={styles.text}>{titulo_padrao}</text>
      <Button title="Clique aqui" />
      <StatusBar style="auto" />
    </View>
  ); 
  }  
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    margin: 20,
    fontSize:26,
    color: "red"
  }
});

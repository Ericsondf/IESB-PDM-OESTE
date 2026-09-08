import { StyleSheet,View} from "react-native";
import { useState } from "react";
import MetaList from "./components/MetaList";
import MetaInput from "./components/MetaImput";

export default function App() {

  const [metas, setMetas] = useState([]);



  function adicioarMetaHandler(inputMeta) {
    setMetas([...metas, inputMeta]);
  }

  return (
    <View style={styles.mainContainer}>
      <MetaInput onAddMeta={adicioarMetaHandler} />


      <View style={styles.metaContainer}>
        <MetaList array={metas} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    flexDirection: "column",
  },

  metaContainer: {
    flex: 10,
  },

});
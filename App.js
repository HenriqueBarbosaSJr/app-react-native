import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';

import styles from './src/styles/styles';
import api from './src/services/api';

export default function App() {
  const [prodsDados, setprodsDados] = useState([]);
  async function consulta(){
     const response = await api.get('produtos');
     console.log(response);
  }

  async function loadDados(){
    const response = await api.get('produtos');
    setprodsDados(response.data);
  };

  useEffect(()=>{
    loadDados();
  },[ ]);

  return (
    <View style={styles.container}>
      <Text> Teste de APP!</Text>
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={ ()=>{
          consulta();
        }
        }
      >
        <Text>Consultar</Text>
      </TouchableOpacity>
     
      <FlatList 
          data={prodsDados}
          keyExtractor={prodsDados => String(prodsDados.cod)}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          renderItem={( { item: prodsDados })=>(
            <View style={styles.itenList}>
              <Text style={styles.title}>Código</Text>
              <Text style={styles.dados}>{prodsDados.cod}</Text>

              <Text style={styles.title}>nome:</Text>
              <Text style={styles.dados}>{prodsDados.nome}</Text>

              <Text  style={styles.title}>Descrição</Text>
              <Text style={styles.dados}>{prodsDados.descri}</Text>

              <Text  style={styles.title}>Fabricante</Text>
              <Text style={styles.dados}>{prodsDados.fabricante}</Text>

              <Text  style={styles.title}>Quantidade</Text>
              <Text style={styles.dados}>{prodsDados.qtda}</Text>
            </View>
          )}
        />

    </View>
  );
}



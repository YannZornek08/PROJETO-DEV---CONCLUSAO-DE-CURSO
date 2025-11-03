import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function Cadastro() {
  
  return (
    <View>
    <Text style={styles.container}>Cadastro</Text>
    <Div />
    </View>
  );
}

function Div() {
  return (
    <View>
      <View style={styles.div}>
    <Text style={styles.text_title}>Email:</Text>
    <TextInput placeholder="Exemplo: exemplo@gmail.com" style={styles.text_placeholder}/>
    <Text style={styles.text_title}>Senha:</Text>
    <TextInput placeholder="Senha@Secreta2" style={styles.text_placeholder} secureTextEntry={true}/>
    <Text style={styles.text_title}>Nome:</Text>
    <TextInput placeholder="Wagner Jr" style={styles.text_placeholder} secureTextEntry={true}/>
    
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text_button}> Cadastrar </Text>
    </TouchableOpacity>
      </View>
        <Text style={styles.cadastro}> Já tem conta?</ Text>
      <TouchableOpacity> 
          <Text style={styles.link}>Faça Login!</Text> 
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      fontSize: 32,
      fontWeight: 'bold',
      marginTop: 75,
      marginBottom: 25,
      textAlign: 'center',
    },
    div: {
      backgroundColor: '#f7f3ee',
      borderRadius: 10,
      margin: 20,
      padding: 20,
      borderColor: '#D6C4AA',
      borderWidth: 2,
    },
    text_title: {
      fontSize: 22,
      marginBottom: 20,
    },
    text_placeholder: {
      fontSize: 14,
      backgroundColor: '#e6dccc',
      marginBottom: 35,
      borderBottomColor: '#423828',
      borderBottomWidth: 1,
    },
    space_google: {
      backgroundColor: '#FFFFFF',
      padding: 30,
      fontSize: 22,
      textAlign: 'center',
      borderRadius: 25,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    button: {
      marginLeft: '70%',
      marginTop: '10%',
      marginBottom: '5%',
      width: '30%',
      height: 40,
      backgroundColor: '#5F4100',
      borderRadius: 10,
      justifyContent:'center',
      alignItems:'center'
    },
    text_button: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    cadastro: {
      textAlign: 'center',
      fontSize: 16,
      marginRight: '28%',
      fontWeight: 'bold',
      color: '#5F4100',
    },
    link: {
      textAlign: 'center',
      // backgroundColor: '#f7f3ee',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: '48%',
      textDecorationLine: 'underline',
      color: '#5F4100',
      width: '25%',
      bottom: 22,
    }
});
import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SignIn from "../SignIn";

export default function Cadastro() {
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("Navegando para Login...");
    navigation.navigate(SignIn as never);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.container}>Cadastro</Text>
      
      <View style={styles.div}>
        <Text style={styles.text_title}>Nome:</Text>
        <TextInput placeholder="Wagner Jr" style={styles.text_placeholder}/>
        
        <Text style={styles.text_title}>Email:</Text>
        <TextInput placeholder="Exemplo: exemplo@gmail.com" style={styles.text_placeholder}/>
        
        <Text style={styles.text_title}>Senha:</Text>
        <TextInput placeholder="Senha@Secreta2" style={styles.text_placeholder} secureTextEntry={true}/>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text_button}> Cadastrar </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.loginContainer}>
        <Text style={styles.cadastro}> Já tem conta?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.link}>Faça Login!</Text> 
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
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
    marginBottom: 10,
  },
  text_placeholder: {
    fontSize: 14,
    backgroundColor: '#e6dccc',
    marginBottom: 20,
    padding: 10,
    borderBottomColor: '#423828',
    borderBottomWidth: 1,
  },
  button: {
    marginLeft: '70%',
    marginTop: '10%',
    marginBottom: '5%',
    width: '30%',
    height: 40,
    backgroundColor: '#5F4100',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text_button: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cadastro: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5F4100',
  },
  link: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#5F4100',
    marginLeft: 5,
  }
});
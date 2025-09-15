import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Cadastro from "../Cadastro";

export default function SignIn() {
  const navigation = useNavigation();

  const handleCadastro = () => {
    console.log("Navegando para Cadastro...");
    navigation.navigate('Cadastro' as never);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.container}>Login</Text>
      
      <View style={styles.div}>
        <Text style={styles.text_title}>Email:</Text>
        <TextInput placeholder="Exemplo: exemplo@gmail.com" style={styles.text_placeholder}/>
        <Text style={styles.text_title}>Senha:</Text>
        <TextInput placeholder="Senha@Secreta2" style={styles.text_placeholder} secureTextEntry={true}/>
        <Text style={styles.space_google}> Entrar Com Google</Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text_button}> Entrar </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.registerContainer}>
        <Text style={styles.login}> Não possui conta? </Text>
        <TouchableOpacity onPress={handleCadastro}>
          <Text style={styles.link}>Cadastre-se!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
  },
  div: {
    backgroundColor: '#F1E0CA',
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
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    padding: 10,
    borderBottomColor: '#423828',
    borderBottomWidth: 1,
  },
  space_google: {
    backgroundColor: '#FFFFFF',
    marginTop: 25,
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 25,
  },
  button: {
    marginLeft: '80%',
    marginTop: '10%',
    marginBottom: '5%',
    width: '20%',
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  login: {
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
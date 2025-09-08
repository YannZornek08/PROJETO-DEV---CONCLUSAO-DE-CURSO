import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function SignIn() {
  return (
    <View>
    <Text style={styles.container}>Login</Text>
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
    <Text style={styles.space_google}> Entrar Com Google</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text_button}> Entrar </Text>
    </TouchableOpacity>
      </View>
      <Text> Não possui conta? Cadastre-se!</Text>
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
      backgroundColor: '#F1E0CA',
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
      backgroundColor: '#FFFFFF',
      marginBottom: 35,
      borderBottomColor: '#423828',
      borderBottomWidth: 1,
    },
    space_google: {
      backgroundColor: '#FFFFFF',
      marginTop: 25,
      padding: 20,
      fontSize: 24,
      textAlign: 'center',
      borderRadius: 25,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    button: {
      marginLeft: '80%',
      marginTop: '10%',
      marginBottom: '5%',
      width: '20%',
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
    }
});
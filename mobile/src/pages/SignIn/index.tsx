import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

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
    <Text style={styles.text_title}>Email</Text>
    <TextInput placeholder="Exemplo: exemplo@gmail.com" style={styles.text_placeholder}/>
    <Text style={styles.text_title}>Senha:</Text>
    <TextInput placeholder="Senha@Secreta2" style={styles.text_placeholder} secureTextEntry={true}/>
      </View>
    <Text style={styles.space_google}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        fontSize: 32,
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
      marginBottom: 10,
    },
    text_placeholder: {
      fontSize: 14,
      backgroundColor: '#FFFFFF',
      marginBottom: 15,
      borderBottomColor: '#423828',
      borderBottomWidth: 1,
    },
    space_google: {
      backgroundColor: '#FFFFFF',
      
    }
});
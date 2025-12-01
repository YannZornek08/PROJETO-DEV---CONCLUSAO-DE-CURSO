import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Cadastro from "../Cadastro";

import { AuthContext } from "../../contexts/AuthContext";
import { useCostumer } from "../../contexts/CostumerContext";
import { useOrder } from "../../contexts/OrderContext";
import { api } from "../../services/api";
import { Alert } from "react-native"; // adicione este import no topo

export default function SignIn() {
    const { signIn, loadingAuth } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


const { setCostumerId } = useCostumer();
const { resetOrder } = useOrder();


async function handleLogin() {
  if (!email || !password) {
    Alert.alert("Atenção", "Por favor, preencha email e senha.");
    return;
  }

  try {
    const response = await api.post("/session/costumers", {
      email,
      password,
    });

  // supondo que o backend retorne o ID do cliente
  setCostumerId(response.data.id);
  console.log("Costumer ID salvo:", response.data.id);

  // Limpa comanda anterior ao trocar/entrar com novo usuário
  try { resetOrder(); } catch (e) { /* ignore if not mounted */ }

  await signIn({ email, password });
  } catch (err: any) {
    console.log("Erro ao fazer login:", err.response?.data || err.message);

    // Mostra alerta amigável ao usuário
    if (err.response?.data?.error) {
      Alert.alert("Erro", err.response.data.error);
    } else if (err.response?.data?.message) {
      Alert.alert("Erro", err.response.data.message);
    } else {
      Alert.alert("Erro", "Email ou senha incorretos!");
    }
  }
}
    
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
        <TextInput 
          placeholder="Exemplo: exemplo@gmail.com" 
          style={styles.text_placeholder} 
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.text_title}>Senha:</Text>
        <TextInput 
          placeholder="Senha@Secreta2" 
          style={styles.text_placeholder} 
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        {/* <Text style={styles.space_google}> Entrar Com Google</Text> */}
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center',
    fontFamily: "BesleyBold",
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
    fontFamily: "BesleyRegular",
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
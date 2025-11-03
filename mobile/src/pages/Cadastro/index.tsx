import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker"; // ✅ importa o calendário
import { api } from "../../services/api";

export default function Cadastro() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dtNasc, setDtNasc] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para abrir o calendário
  const handleOpenDatePicker = () => {
    setShowDatePicker(true);
  };

  // Captura da data selecionada
  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDtNasc(selectedDate);
  };

  // Formata a data para o formato brasileiro (dd/mm/yyyy)
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Função para enviar dados pro backend
  async function handleRegister() {
    if (!name || !email || !password || !dtNasc) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);

      const formattedDate = dtNasc.toISOString().split("T")[0]; // envia em formato ISO (YYYY-MM-DD)

      const response = await api.post("/costumers", {
        name,
        email,
        password,
        dt_nasc: formattedDate,
      });

      console.log("Usuário criado:", response.data);
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      navigation.navigate("SignIn" as never);
    } catch (err: any) {
      console.log("Erro ao cadastrar:", err.response?.data || err);
      Alert.alert("Erro", "Não foi possível cadastrar. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = () => {
    navigation.navigate("SignIn" as never);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.container}>Cadastro</Text>
      
      <View style={styles.div}>
        <Text style={styles.text_title}>Nome:</Text>
        <TextInput 
          placeholder="Wagner Jr" 
          style={styles.text_placeholder}
          value={name}
          onChangeText={setName}
        />
        
        <Text style={styles.text_title}>Email:</Text>
        <TextInput 
          placeholder="exemplo@gmail.com" 
          style={styles.text_placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text style={styles.text_title}>Senha:</Text>
        <TextInput 
          placeholder="Senha@Secreta2" 
          style={styles.text_placeholder} 
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.text_title}>Data de Nascimento:</Text>
        <TouchableOpacity onPress={handleOpenDatePicker}>
          <TextInput
            placeholder="Selecione a data"
            style={styles.text_placeholder}
            editable={false}
            value={dtNasc ? formatDate(dtNasc) : ""}
          />
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={dtNasc || new Date()}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
            maximumDate={new Date()} // impede selecionar data futura
          />
        )}
        
        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.text_button}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.loginContainer}>
        <Text style={styles.cadastro}>Já tem conta?</Text>
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
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  container: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 25,
    textAlign: "center",
  },
  div: {
    backgroundColor: "#f7f3ee",
    borderRadius: 10,
    margin: 20,
    padding: 20,
    borderColor: "#D6C4AA",
    borderWidth: 2,
  },
  text_title: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily: "BesleyRegular",
  },
  text_placeholder: {
    fontSize: 14,
    backgroundColor: "#e6dccc",
    marginBottom: 20,
    padding: 10,
    borderBottomColor: "#423828",
    borderBottomWidth: 1,
  },
  button: {
    marginLeft: "70%",
    marginTop: "10%",
    marginBottom: "5%",
    width: "30%",
    height: 40,
    backgroundColor: "#5F4100",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text_button: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  cadastro: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5F4100",
  },
  link: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "#5F4100",
    marginLeft: 5,
  },
});

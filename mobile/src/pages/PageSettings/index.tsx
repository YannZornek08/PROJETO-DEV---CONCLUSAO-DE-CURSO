import React, { useContext } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { useOrder } from "../../contexts/OrderContext";
import { useCostumer } from "../../contexts/CostumerContext";
import { api } from "../../services/api";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from "../../routes/app.routes";
import { Alert } from "react-native";

export default function Settings() {
  const { signOut } = useContext(AuthContext);
  const { orderId, resetOrder } = useOrder();
  const { setCostumerId } = useCostumer();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const handleDeleteAndSignOut = async () => {
    const signOutFlow = async () => {
      try { setCostumerId(null); } catch (e) { /* ignore */ }
      try { resetOrder(); } catch (e) { /* ignore */ }
      try { await signOut(); } catch (e) { /* ignore */ }
    };

    try {
      if (orderId) {
        await api.delete('/order', { params: { order_id: orderId } });
        console.log('Comanda excluída ao sair (settings):', orderId);

        Alert.alert('Sucesso', 'Comanda excluída com sucesso.', [
          { text: 'OK', onPress: () => { void signOutFlow(); } }
        ]);
        return;
      }

      await signOutFlow();
      return;
    } catch (err) {
      console.log('Erro ao excluir comanda no logout (settings):', err);
      Alert.alert('Erro', 'Não foi possível excluir a comanda. Deseja sair mesmo assim?', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => { void signOutFlow(); } }
      ]);
      return;
    }
  };

  const confirmAndSignOut = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja excluir a comanda atual e sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir e Sair', style: 'destructive', onPress: () => { void handleDeleteAndSignOut(); } },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Funcionando Settings</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={confirmAndSignOut}>
        <Text style={styles.signOutText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // centraliza verticalmente
    alignItems: "center", // centraliza horizontalmente
    backgroundColor: "#fff",
  },
  signOutButton: {
    backgroundColor: "#5F4100",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  signOutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});

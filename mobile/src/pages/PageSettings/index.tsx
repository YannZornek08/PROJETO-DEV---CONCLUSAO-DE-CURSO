import React, { useContext, useState } from "react";
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

export default function Settings() {
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Funcionando Settings</Text>
      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
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

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

export default function Favoritos() {
    return (
        <View>
            <Text style={styles.texto}>Status Do Pedido:</Text>
            
        </View>
    )

}
    const styles = StyleSheet.create({
        texto: {
            fontSize: 24,
            textAlign: "center",
            marginTop: "50%"
        }
    })
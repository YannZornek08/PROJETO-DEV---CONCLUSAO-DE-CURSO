
import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../routes/app.routes";

export const SettingsButton: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <Image
        source={require('../assets/Configuracoes.png')}
        resizeMode="stretch"
        style={styles.iconRight}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconRight: {
    width: 48,
    height: 48,
  },
});

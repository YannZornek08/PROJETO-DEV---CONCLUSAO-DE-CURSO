import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity, // <─ importado aqui
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

const Pagamento: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  
  const DadosPagamento = () => {
    navigation.navigate("DadosPagamento");
  };

  const Carrinho = () => {
    navigation.navigate("Carrinho");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity onPress={Carrinho}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/ivq4y5g2_expires_30_days.png",
            }}
            resizeMode="stretch"
            style={styles.image}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Pagamento</Text>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardText} onPress={DadosPagamento}>
              Crédito
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText} onPress={DadosPagamento}>
              Débito
            </Text>
          </View>
        </View>

        <View style={[styles.card, styles.fullWidthCard]}>
          <Text style={styles.cardText} onPress={DadosPagamento}>
            Pix
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pagamento;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  image: {
    width: 48,
    height: 48,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  title: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: "#FDD5BF",
    borderRadius: 16,
    paddingVertical: 48,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  fullWidthCard: {
    marginTop: 0,
    alignSelf: "stretch",
  },
  cardText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
  },
});

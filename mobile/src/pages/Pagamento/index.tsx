import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert, 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import BackButton from "../../components/cart";

const Pagamento: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const DadosPagamento = () => {
    navigation.navigate("DadosPagamento");
  };

  const Carrinho = () => {
    navigation.navigate("Carrinho");
  };

  const chamarGarcom = () => {
    Alert.alert('Atenção', 'Um garçom foi chamado para sua mesa.', [{ text: 'OK' }]);
    navigation.navigate("StatusPedido");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* usando o componente BackButton */}
        <BackButton to="Menu" />

        <Text style={styles.title}>Pagamento</Text>

        <View style={styles.row}>
          <TouchableOpacity style={styles.card} onPress={DadosPagamento}>
            <Text style={styles.cardText}>
              Crédito
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={DadosPagamento}>
            <Text style={styles.cardText}>
              Débito
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.card, styles.fullWidthCard]} onPress={DadosPagamento}>
          <Text style={styles.cardText}>
            Pix
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <TouchableOpacity style={styles.rowCard} onPress={chamarGarcom}>
            <View style={styles.rowContent}>
              <Image
                source={require('../../assets/person_alert_24dp_8D4E27_FILL0_wght400_GRAD0_opsz24.png')}
                resizeMode="stretch"
                style={styles.icon}
              />
              <Text style={styles.textPrimary}>Chamar um garçom</Text>
            </View>
            <Image
              source={require('../../assets/faz03frq_expires_30_days.png')}
              resizeMode="stretch"
              style={styles.iconSmall}
            />
          </TouchableOpacity>
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
  title: {
    color: "#000000",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8F5",
    borderColor: "#D7C2B8",
    borderWidth: 1,
    borderRadius: 12,
    paddingRight: 12,
    marginBottom: 12,
    marginTop: 16,
    paddingVertical: 24,
  },
  subtitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  rowContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  iconSmall: {
    width: 24,
    height: 24,
  },
  textPrimary: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#52443C",
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

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes"
import BottomNavBar from "../../components/navButton";
import { SettingsButton } from "../../components/SettingsButton";

export default function Cupons() {
  const [textInput1, setTextInput1] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  function Carrinho () {
    navigation.navigate("Carrinho");
  }
  
  function Menu() {
    navigation.navigate("Menu");
  }

  function Cupons() {
    navigation.navigate("Cupons");
  }

  function Status1() {
    navigation.navigate("Status1");
  }

  function LerQR() {
    navigation.navigate("LerQR");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
  
        <View style={styles.header}>
          <Text style={styles.greeting}>Bom dia, João.</Text>

          <View style={styles.searchContainer}>
            <Image
              source={require('../../assets/Search.png')}
              resizeMode="stretch"
              style={styles.searchIcon}
            />
         
            <TextInput
              placeholder="O que busca?"
              value={textInput1}
              onChangeText={(text: string) => setTextInput1(text)}
              style={styles.searchInput}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={Carrinho}>
                <Image
                  source={require('../../assets/Carrinho.png')}
                  resizeMode="stretch"
                  style={styles.actionIcon}
                />
              </TouchableOpacity>

              <TouchableOpacity>
              <SettingsButton/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.couponTitle}>Seus cupons:</Text>
        <View style={styles.couponRow}>
        
          <View style={[styles.couponCard, { marginRight: 12 }]}>
            <Image
              source={require('../../assets/ticket.png')}
              style={styles.couponIcon}
            />
            <Text style={styles.couponText}>50% OFF</Text>
            <Text style={styles.couponDescription}>Desconto no App</Text>
            <TouchableOpacity
              style={styles.addCouponButton}
              onPress={(e: GestureResponderEvent) => alert("Cupom 1 adicionado!")}
            >
              <Text style={styles.addCouponText}>Adicionar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.couponCard}>
            <Image
               source={require('../../assets/ticket.png')}
              style={styles.couponIcon}
            />
            <Text style={styles.couponText}>30% OFF</Text>
            <Text style={styles.couponDescription}>Desconto no App</Text>
            <TouchableOpacity
              style={styles.addCouponButton}
              onPress={(e: GestureResponderEvent) => alert("Cupom 2 adicionado!")}
            >
              <Text style={styles.addCouponText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
           <BottomNavBar activeRoute="Cupons" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { backgroundColor: "#FFFFFF", paddingTop: 86, paddingBottom: 7 },
  greeting: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 26,
    fontFamily: "BesleyBold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6E5DD",
    borderRadius: 28,
    padding: 4,
    marginBottom: 10,
    marginHorizontal: 26,
  },
  searchIcon: { width: 48, height: 48, marginRight: 4 },
  searchInput: { color: "#52443C", fontSize: 16, flex: 1, paddingVertical: 12 },
  actionIcon: { width: 48, height: 48 },
  couponTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 19,
    marginLeft: 26,
  },
  couponRow: { flexDirection: "row", marginBottom: 200, marginHorizontal: 26 },
  couponCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FDF8F5",
    borderStyle: "dashed",
    borderColor: "#8D4F28",
    borderRadius: 18,
    borderWidth: 2,
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  couponIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    tintColor: "#8D4F28",
  },
  couponText: { color: "#000000", fontSize: 24, fontFamily: "BesleyBold",},
  couponDescription: {
    fontSize: 14,
    color: "#52443C",
    marginBottom: 12,
    textAlign: "center",
  },
  addCouponButton: {
    flexDirection: "row",
    backgroundColor: "#8D4F28",
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  addCouponText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

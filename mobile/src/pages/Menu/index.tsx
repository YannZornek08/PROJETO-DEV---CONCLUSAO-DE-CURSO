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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

export default function HomeScreen() {
  const [textInput1, onChangeTextInput1] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  function Menu() {
    navigation.navigate("Menu");
  }

  function Cupons() {
    navigation.navigate("Cupons");
  }

  function Favoritos() {
    navigation.navigate("Favoritos");
  }

  function LerQR() {
    navigation.navigate("LerQR");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bom dia, João.</Text>

          {/* Barra de busca */}
          <View style={styles.searchBar}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/m1yrb272_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="O que busca?"
              value={textInput1}
              onChangeText={onChangeTextInput1}
              style={styles.searchInput}
            />
            <View style={styles.searchIconsRight}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/tmmocg1t_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.iconRight}
              />
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/bjnemhbr_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.iconRight}
              />
            </View>
          </View>

          {/* Botão filtros */}
          <View style={styles.filtersWrapper}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => alert("Pressed!")}
            >
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/uip8oeqk_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.filterIcon}
              />
              <Text style={styles.filterText}>Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.tableText}>Sua mesa: 05</Text>

        {/* Cards */}
        <View style={styles.cardsWrapper}>
          <View style={styles.row}>
            <PizzaCard
              title="Pizza de Pepperoni"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/ggqdmnfn_expires_30_days.png"
            />
            <PizzaCard
              title="Pizza de Abacaxi"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/02jqnrgo_expires_30_days.png"
            />
          </View>
          <View style={styles.row}>
            <PizzaCard
              title="Pizza de Pepperoni"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/sow9drm9_expires_30_days.png"
            />
            <PizzaCard
              title="Pizza de Abacaxi"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/50ff6gko_expires_30_days.png"
            />
          </View>
          <View style={styles.row}>
            <PizzaCard
              title="Pizza de Pepperoni"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/6zusf2rc_expires_30_days.png"
            />
            <PizzaCard
              title="Pizza de Abacaxi"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/ec18wgmn_expires_30_days.png"
            />
          </View>
        </View>

        <View style={styles.bottomMenu}>
          <TouchableOpacity onPress={Menu}>
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Favoritos}>
            <Text>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Cupons}>
            <Text>Cupons</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={LerQR}>
            <Text>Ler QR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
type PizzaCardProps = {
  title: string;
  price: string;
  image: string;
};

function PizzaCard({ title, price, image }: PizzaCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} resizeMode="stretch" style={styles.cardImage} />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardPrice}>{price}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => alert(`${title} adicionado!`)}
      >
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/mijsyyvb_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={styles.addIcon}
        />
        <Text style={styles.addText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 86,
    paddingBottom: 7,
    marginBottom: 2,
  },
  headerText: {
    color: "#000000",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 26,
  },
  searchBar: {
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
  searchIconsRight: { flexDirection: "row" },
  iconRight: { width: 48, height: 48 },
  filtersWrapper: { alignItems: "center", paddingVertical: 8 },
  filterButton: {
    flexDirection: "row",
    backgroundColor: "#8D4F28",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  filterIcon: { width: 20, height: 20, marginRight: 4 },
  filterText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  tableText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginHorizontal: 26,
  },
  cardsWrapper: { marginBottom: 44, marginHorizontal: 26 },
  row: { flexDirection: "row", marginBottom: 30 },
  card: { flex: 1, alignItems: "center" },
  cardImage: { height: 180, marginBottom: 8, width: "100%" },
  cardTitle: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  cardPrice: { color: "#000000", fontSize: 14, marginBottom: 7 },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#8D4F28",
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginHorizontal: 35,
  },
  addIcon: { width: 20, height: 20, marginRight: 4 },
  addText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold", flex: 1 },
  bottomMenu: {
    flexDirection: "row",
    backgroundColor: "#FCEAE2",
    borderRadius: 80,
    paddingHorizontal: 17,
    marginBottom: 42,
    marginHorizontal: 26,
    justifyContent: "space-between",
  },
});

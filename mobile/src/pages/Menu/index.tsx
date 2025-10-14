import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { formatarPreco } from "../../components/conversorDeMoeda/valoresEmReal";

import { api } from "../../services/api";
import { CategoryProps } from "../Order";
import { ModalPicker } from "../../components/ModalPicker";
import { SettingsButton } from "../../components/SettingsButton";
import BottomNavBar from "../../components/navButton";

import { AuthContext } from "../../contexts/AuthContext";

export type Produto = {
  id: string;
  name: string;
  description: string;
  price: number;
  banner: string;
};

type Order = {
  id: string;
  status: boolean;
};

export default function HomeScreen() {
  const [textInput1, onChangeTextInput1] = useState<string>("");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const { user, signOut } = useContext(AuthContext);

  function Settings() {
    navigation.navigate("Settings");
  }

  function Carrinho() {
    navigation.navigate("Carrinho");
  }

  async function Filtros() {
    alert("blablabla");
  }

  useEffect(() => {
    async function verProdutos() {
      try {
        const response = await api.get("/product/all");
        setProdutos(response.data);
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }
    verProdutos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerText}>Seja bem-vindo, João.</Text>

            <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
              <Text style={styles.signOutText}>Sair</Text>
            </TouchableOpacity>
          </View>

          {/* Barra de busca */}
          <View style={styles.searchBar}>
            <Image
              source={require("../../assets/Search.png")}
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
              <TouchableOpacity onPress={Carrinho}>
                <Image
                  source={require("../../assets/Carrinho.png")}
                  resizeMode="stretch"
                  style={styles.iconRight}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <SettingsButton />
              </TouchableOpacity>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </Modal>

          <View style={styles.filtersWrapper}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setModalVisible(true)}
            >
              <Image
                source={require("../../assets/abawhite.png")}
                resizeMode="stretch"
                style={styles.filterIcon}
              />
              <Text style={styles.filterText}>Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.tableText}>Sua mesa: 05</Text>

        {/* Cards dinâmicos */}
        <View style={styles.cardsWrapper}>
          {produtos
            .reduce((rows: Produto[][], produto, index) => {
              if (index % 2 === 0) {
                rows.push([produto]);
              } else {
                rows[rows.length - 1].push(produto);
              }
              return rows;
            }, [])
            .map((row, idx) => (
              <View style={styles.row} key={idx}>
                {row.map((prod) => (
                  <PizzaCard key={prod.id} product={prod} />
                ))}
              </View>
            ))}
        </View>
      </ScrollView>

      <BottomNavBar activeRoute="Menu" />
    </SafeAreaView>
  );
}

type PizzaCardProps = {
  product: Produto;
};

type CarrinhoRouteProp = RouteProp<StackParamsList, "Carrinho">;

function PizzaCard({ product }: PizzaCardProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route_car = useRoute<CarrinhoRouteProp>();

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: product.banner }}
        resizeMode="stretch"
        style={styles.cardImage}
      />
      <Text style={styles.cardTitle}>{product.name}</Text>
      <Text style={styles.cardPrice}>
        {formatarPreco(Number(product.price))}
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate("DetalhesProdutos", { product });
        }}
      >
        <Image
          source={require("../../assets/Plus.png")}
          resizeMode="stretch"
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

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 26,
    marginBottom: 16,
  },

  headerText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
  },

  signOutButton: {
    backgroundColor: "#5F4100",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 12,
  },

  signOutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
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
  row: {
    flexDirection: "row",
    marginBottom: 30,
    gap: 10,
    alignItems: "stretch",
  },
  card: { flex: 1, alignItems: "center", justifyContent: "space-between" },
  cardImage: {
    height: 180,
    marginBottom: 8,
    width: "100%",
    borderRadius: 90,
  },
  cardTitle: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 4,
  },
  cardPrice: { color: "#000000", fontSize: 16, marginBottom: 7 },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#8D4F28",
    borderRadius: 100,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 8,
    marginHorizontal: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
});

import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList
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
import { useOrder } from "../../contexts/OrderContext";

export type Produto = {
  id: string;
  name: string;
  description: string;
  price: number;
  banner: string;
  category_id: string;
};

type Order = {
  id: string;
  status: boolean;
};

type Category = {
  id: string;
  name: string;
};

export default function HomeScreen() {
  const [textInput1, onChangeTextInput1] = useState<string>("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("todas");

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const { orderId } = useOrder();
  const { user, signOut } = useContext(AuthContext);

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Função de busca dinâmica
  const handleSearch = useCallback(async (text: string) => {
    onChangeTextInput1(text);

    // limpa timeout anterior (debounce)
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(async () => {
      try {
        if (text.trim() === "") {
          const response = await api.get("/product/all");
          setProdutos(response.data);
        } else {
          const response = await api.get("/product/search", {
            params: { name: text },
          });
          setProdutos(response.data);
        }
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }, 300); // atraso de 300 ms
  }, []);

  // Buscar categorias (mantém igual)
  useEffect(() => {
    async function carregarCategorias() {
      try {
        const response = await api.get("/category");
        setCategorias(response.data);
      } catch (err) {
        console.log("Erro ao buscar categorias:", err);
      }
    }
    carregarCategorias();
  }, []);

  // Buscar produtos inicialmente
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

  // Filtrar produtos por categoria
  const produtosFiltrados = produtos.filter((produto) => {
    if (categoriaSelecionada === "todas") return true;
    return produto.category_id === categoriaSelecionada;
  });

  const renderChip = ({ item }: { item: Category | { id: string; name: string } }) => (
    <TouchableOpacity
      style={[
        styles.chip,
        categoriaSelecionada === item.id && styles.chipSelected,
      ]}
      onPress={() => setCategoriaSelecionada(item.id)}
    >
      <Text
        style={[
          styles.chipText,
          categoriaSelecionada === item.id && styles.chipTextSelected,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Adiciona "Todas" no início da lista de categorias
  const categoriasComTodas = [
    { id: "todas", name: "Todas" },
    ...categorias
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerText} numberOfLines={1} ellipsizeMode="tail">
              Seja bem-vindo{user?.name ? `, ${user.name}` : ""}.
            </Text>
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
                onChangeText={handleSearch}
                style={styles.searchInput}
              />
            <View style={styles.searchIconsRight}>
              <TouchableOpacity onPress={() => navigation.navigate("Carrinho")}>
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

          {/* Lista horizontal de chips de categorias */}
          <View style={styles.categoriesWrapper}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categoriasComTodas}
              renderItem={renderChip}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.categoriesList}
            />
          </View>
        </View>

        <Text style={styles.tableText}>Sua mesa: 05</Text>

        {/* Cards dinâmicos - produtos filtrados */}
        <View style={styles.cardsWrapper}>
          {produtosFiltrados.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum produto encontrado nesta categoria.</Text>
          ) : (
            produtosFiltrados
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
              ))
          )}
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
          style={{ width: 25, height: 25 }}
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
    fontFamily: "BesleyBold",
    textAlign: "center",
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
  
  categoriesWrapper: {
    paddingVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: 26,
    gap: 8,
  },
  chip: {
    backgroundColor: "#F6E5DD",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 2,
    borderColor: "transparent",
  },
  chipSelected: {
    backgroundColor: "#8D4F28",
    borderColor: "#8D4F28",
  },
  chipText: {
    color: "#52443C",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  chipTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  
  tableText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginHorizontal: 26,
  },
  emptyText: {
    color: "#52443C",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
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
    fontFamily: "BesleyRegular",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 4,
    textTransform: "capitalize",
    flexGrow: 1,
  },
  cardPrice: { color: "#000000", fontSize: 16, marginBottom: 7, fontFamily: "BesleyRegular", },
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
  addText: { color: "#FFFFFF", fontSize: 12, fontWeight: "bold" },
});
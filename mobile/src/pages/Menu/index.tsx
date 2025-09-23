import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

import { api } from "../../services/api";
import { CategoryProps } from "../Order";
import { ModalPicker } from "../../components/ModalPicker";

// IMAGENS DO NAV
const home = require('../../assets/nav-icons/home.png')
const fav = require('../../assets/nav-icons/star.png')
const cupom = require('../../assets/nav-icons/cupom.png')
const qrcode = require('../../assets/nav-icons/qrcode.png')

/////////////////

export type Produto = {
  id: string;
  name: string;
  description: string;
  price: number;
  banner: string;
}

type Order = {
  id: string;
  status: boolean
}

export default function HomeScreen() {
  const [textInput1, onChangeTextInput1] = useState<string>("");
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  // const [produtosPesquisados, setProdutosPesquisados] = useState<Produto[]>([])
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  function Settings() {
    navigation.navigate("Settings")
  }

  function Carrinho() {
    navigation.navigate("Carrinho")
  }

  function Cupons() {
    navigation.navigate("Cupons");
  }

  function StatusPedido() {
    navigation.navigate("StatusPedido");
  }

  function LerQR() {
    navigation.navigate("LerQR");
  }

  async function Filtros() {
    alert("blablabla")
  }

  useEffect(() => {
    async function verProdutos() {
      try {
        //Chama a rota que retorna TODOS os produtos
        const response = await api.get('/product/all');
        setProdutos(response.data);
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }
    // async function pesquisarProdutos() {
    //   if (textInput1.length == 0 ) {
    //     setProdutosPesquisados(produtos)
    //   } else {
    //     try {
    //       // 👉 Chama a rota que retorna TODOS os produtos pesquisados
    //       const response = await api.get('/product/search');
    //       setProdutosPesquisados(response.data);
    //     } catch (err) {
    //       console.log("Erro ao pesquisar produtos:", err);
    //     }
    //   }
    // }
    verProdutos();
    // pesquisarProdutos();
  }, []);

  // useEffect(() => {
  //   if (textInput1.trim() === "") {
  //     setProdutosFiltrados(produtos);
  //   } else {
  //     const termo = textInput1.toLowerCase();
  //     const filtrados = produtos.filter((p) =>
  //       p.name.toLowerCase().includes(termo));
  //     setProdutosFiltrados(filtrados);
  //   }
  // }, [textInput1, produtos]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Seja bem vindo, João.</Text>

          {/* Barra de busca */}
          <View style={styles.searchBar}>
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/m1yrb272_expires_30_days.png" }}
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
                  source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/tmmocg1t_expires_30_days.png" }}
                  resizeMode="stretch"
                  style={styles.iconRight}
                  />
              </TouchableOpacity>
              <TouchableOpacity onPress={Settings}>
                <Image
                  source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/bjnemhbr_expires_30_days.png" }}
                  resizeMode="stretch"
                  style={styles.iconRight}
                  />
              </TouchableOpacity>

            </View>
          </View>

          {/* Botão filtros */}
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
            <Button
              title="Fechar"
              onPress={() => setModalVisible(false)}
              />
      </Modal>
          <View style={styles.filtersWrapper}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setModalVisible(true)}
              >
              
              <Image
                source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/uip8oeqk_expires_30_days.png" }}
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
          {produtos.reduce((rows: Produto[][], produto, index) => {
            if (index % 2 === 0) {
              rows.push([produto]);
            } else {
              rows[rows.length - 1].push(produto);
            }
            return rows;
          }, []).map((row, idx) => (
            <View style={styles.row} key={idx}>
              {row.map(prod => (
                <PizzaCard
                key={prod.id}
                product={prod}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.fullNav}>
        <TouchableOpacity style={[styles.currentNav, styles.nav]}>
          <Image source={home} style={styles.imagesNav} />
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={StatusPedido} style={styles.nav}>
          <Image source={fav} style={styles.imagesNav} resizeMode="cover" />
          <Text>Meu Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={Cupons} style={styles.nav}>
          <Image source={cupom} style={styles.imagesNav} resizeMode="cover" />
          <Text>Cupons</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={LerQR} style={styles.nav}>
          <Image source={qrcode} style={styles.imagesNav} />
          <Text>Ler QR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

type PizzaCardProps = {
  product: Produto;
};

function PizzaCard({ product }: PizzaCardProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.banner }} resizeMode="stretch" style={styles.cardImage} />
      <Text style={styles.cardTitle}>{product.name}</Text>
      <Text style={styles.cardPrice}>R$ {product.price}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          console.log(product) 
          navigation.navigate("DetalhesProdutos", { product })}
        }
        >
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/mijsyyvb_expires_30_days.png",
          }}
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
  displayHidden: { display: "none" },
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
  searchIcon: { 
    width: 48, 
    height: 48, 
    marginRight: 4 
  },
  searchInput: { 
    color: "#52443C", 
    fontSize: 16, 
    flex: 1, 
    paddingVertical: 12 
  },
  searchIconsRight: { 
    flexDirection: "row" 
  },
  iconRight: { 
    width: 48, 
    height: 48 
  },
  filtersWrapper: { 
    alignItems: "center", paddingVertical: 8 },
  filterButton: { 
    flexDirection: "row", backgroundColor: "#8D4F28", borderRadius: 12, paddingVertical: 6, paddingHorizontal: 12 
  },
  filterIcon: { 
    width: 20, 
    height: 20, 
    marginRight: 4 },
  filterText: { 
    color: "#FFFFFF", 
    fontSize: 14, 
    fontWeight: "bold" },
  tableText: { 
    color: "#000000", 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 8, marginHorizontal: 26 
  },
  cardsWrapper: { 
    marginBottom: 44, marginHorizontal: 26 
  },
  row: { 
    flexDirection: "row", 
    marginBottom: 30, 
    gap: 10,
    alignItems: "stretch"
  },
  card: { 
    flex: 1, 
    alignItems: "center",
    justifyContent: "space-between"
  },
  cardImage: { 
    height: 180, 
    marginBottom: 8, 
    width: "100%",
    borderRadius: 90
  },
  cardTitle: { 
    color: "#000000",
    fontWeight: "bold", 
    fontSize: 18, 
    textAlign: "center", 
    marginBottom: 4,
  },
  cardPrice: { 
    color: "#000000", 
    fontSize: 16, 
    marginBottom: 7 
  },
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
  plus: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  addText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  fullNav: { 
    flexDirection: "row", 
    backgroundColor: "#FCEAE2", 
    borderRadius: 80, 
    paddingHorizontal: 17, 
    marginBottom: 42, 
    marginHorizontal: 26, 
    justifyContent: 'space-between' 
  },
  currentNav: { 
    backgroundColor: '#f3cdbdff', 
    borderRadius: 100 
  },
  nav: { 
    padding: 10 
  },
  imagesNav: { 
    margin: 'auto', 
    width: 30, 
    height: 30, 
    borderRadius: 8 
  },
});

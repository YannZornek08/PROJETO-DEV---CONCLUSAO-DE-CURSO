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
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type Produto = {
    id: string;
    name: string;
    price: number;
    banner: string;
}

export default function headerView() {
    const [textInput1, onChangeTextInput1] = useState<string>("");
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
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

    function Favoritos() {
        navigation.navigate("Favoritos");
    }

    function LerQR() {
        navigation.navigate("LerQR");
    }

    // Função de Ver Produtos
    useEffect(() => {
        async function verProdutos() {
            try {
                // 👉 Chama a rota que retorna TODOS os produtos
                const response = await api.get('/product/all');
                setProdutos(response.data);
            } catch (err) {
                console.log("Erro ao buscar produtos:", err);
            }

        }
        // botaoPesquisar.addEventListener('click', function() {
        //         const termoPesquisa = campoPesquisa.value.toLowerCase();
        //         const categoriasFiltradas = {};
        //         Object.keys(categorias).forEach(categoria => {
        //             categoriasFiltradas[categoria] = categorias[categoria].filter(produto => {
        //                 return produto.nome.toLowerCase().includes(termoPesquisa);
        //             });
        //         });
        //         atualizarExibicaoProdutos(categoriasFiltradas);
        //     });
        verProdutos();
    }, []);

    // Função de Pesquisa
    useEffect(() => {
        if (textInput1.trim() === "") {
            setProdutosFiltrados(produtos);
        } else {
            const termo = textInput1.toLowerCase();
            const filtrados = produtos.filter((p) =>
                p.name.toLowerCase().includes(termo)
            );
            setProdutosFiltrados(filtrados);
        }
    }, [textInput1, produtos]);

    return (

        /* Barra de busca */
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
    )
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
    filterButton: { flexDirection: "row", backgroundColor: "#8D4F28", borderRadius: 12, paddingVertical: 6, paddingHorizontal: 12 },
    filterIcon: { width: 20, height: 20, marginRight: 4 },
    filterText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
    tableText: { color: "#000000", fontSize: 16, fontWeight: "bold", marginBottom: 8, marginHorizontal: 26 },
    cardsWrapper: { marginBottom: 44, marginHorizontal: 26 },
    row: { flexDirection: "row", marginBottom: 30, gap: 10 },
    card: { flex: 1, alignItems: "center" },
    cardImage: { height: 180, marginBottom: 8, width: "100%" },
    cardTitle: { color: "#000000", fontSize: 16, textAlign: "center", marginBottom: 12 },
    cardPrice: { color: "#000000", fontSize: 14, marginBottom: 7 },
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
    fullNav: { flexDirection: "row", backgroundColor: "#FCEAE2", borderRadius: 80, paddingHorizontal: 17, marginBottom: 42, marginHorizontal: 26, justifyContent: 'space-between' },
    currentNav: { backgroundColor: '#f3cdbdff', borderRadius: 100 },
    nav: { padding: 10 },
    imagesNav: { margin: 'auto', width: 30, height: 30, borderRadius: 8 },
})


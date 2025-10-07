import React, { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { formatarPreco } from "../../components/conversorDeMoeda/valoresEmReal";
import { useOrder } from "../../contexts/OrderContext";

type DetalhesRouteProp = RouteProp<StackParamsList, "DetalhesProdutos">;

type Additional = {
  ingredient_product_id: string;
  product_id: string;
  ingredient_id: string;
  product: { name: string };
  ingredient: { name: string };
  adicionado: boolean;
};

export default function DetalhesProdutos() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route = useRoute<DetalhesRouteProp>();
  const [adicionais, setAdicionais] = useState<Additional[]>([]);

  const { product } = route.params;
  const tamanhos = ["P", "M", "G"];
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>("M");
  const [quantidade, setQuantidade] = useState<number>(1);
  const { orderId } = useOrder();

  useEffect(() => {
    async function verAdicionaisProduto() {
      try {
        const response = await api.get('/product/ingredients', { params: { product_id: product.id } });
        if (!response.data) return setAdicionais([]);

        const dataArray = Array.isArray(response.data) ? response.data : [response.data];
        const formatted: Additional[] = dataArray.map((item: any) => ({
          ingredient_product_id: item.ingredient_product_id ?? "",
          product_id: item.product_id ?? "",
          ingredient_id: item.ingredient_id ?? "",
          product: { name: item.product?.name ?? "" },
          ingredient: { name: item.ingredient?.name ?? "" },
          adicionado: false,
        }));
        setAdicionais(formatted);
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }
    verAdicionaisProduto();
  }, [product.id]);

  const toggleAdicional = (id: string) => {
    setAdicionais(prev =>
      prev.map(a => a.ingredient_product_id === id ? { ...a, adicionado: !a.adicionado } : a)
    );
  };

  async function adicionarItem() {
    try {
      const adicionaisSelecionados = adicionais
        .filter(a => a.adicionado)
        .map(a => a.ingredient_product_id);

      const payload = {
        order_id: orderId,
        product_id: product.id,
        amount: quantidade,
        adicionais: adicionaisSelecionados
      };

      console.log("Dados enviados ao /order/add:", payload);
      const response = await api.post('/order/add', payload);
      console.log("Item adicionado:", response.data);

      alert(`${product.name} adicionado!`);
      navigation.navigate("Carrinho");
    } catch (err: any) {
      console.log("❌ Erro ao adicionar item:", err.response?.data || err.message);
    }
  }

  const Menu = () => navigation.navigate("Menu");
  const aumentarQuantidade = () => setQuantidade(quantidade + 1);
  const diminuirQuantidade = () => { if (quantidade > 1) setQuantidade(quantidade - 1); };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={Menu}>
            <Image source={require('../../assets/Voltar.png')} style={styles.smallImage} resizeMode="stretch" />
          </TouchableOpacity>
          <Image source={{ uri: product.banner }} style={styles.largeImage} resizeMode="stretch" />
        </View>

        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatarPreco(Number(product.price))}</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.divider} />

        <View style={styles.adicionaisContainer}>
          {adicionais.length <= 0 ? (
            <Text style={styles.sectionTitle}>Nenhum adicional disponível.</Text>
          ) : (
            <>
              <Text style={styles.sectionTitle}>Adicionais:</Text>
              {adicionais.map((ingred) => (
                <TouchableOpacity
                  key={ingred.ingredient_product_id}
                  style={styles.adicionalItem}
                  onPress={() => toggleAdicional(ingred.ingredient_product_id)}
                >
                  <View style={[styles.checkbox, ingred.adicionado && styles.checkboxSelecionado]}>
                    {ingred.adicionado && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.adicionalText}>{ingred.ingredient?.name ?? "Sem adicional"}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>

        <Text style={styles.sectionTitle}>Tamanho:</Text>
        <View style={styles.sizeContainer}>
          {tamanhos.map((tamanho) => (
            <TouchableOpacity
              key={tamanho}
              onPress={() => setTamanhoSelecionado(tamanho)}
              style={[styles.sizeButton, tamanhoSelecionado === tamanho && styles.selectedSizeButton]}
            >
              <Text style={[styles.sizeButtonText, tamanhoSelecionado === tamanho && styles.selectedSizeButtonText]}>
                {tamanho}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantidade:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity onPress={diminuirQuantidade} style={[styles.quantityButton, quantidade <= 1 && styles.disabledButton]} disabled={quantidade <= 1}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantidade}</Text>
            <TouchableOpacity onPress={aumentarQuantidade} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={adicionarItem}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
  imageContainer: { marginTop: 65, marginBottom: 2, marginHorizontal: 26 },
  smallImage: { width: 32, height: 32, marginBottom: 16 },
  largeImage: { height: 360, borderRadius: 180 },
  productName: { color: "#000000", fontSize: 32, fontWeight: "bold", textAlign: "center", marginTop: 20 },
  priceContainer: { alignItems: "center", marginVertical: 10 },
  price: { color: "#000000", fontSize: 22, fontWeight: "bold" },
  description: { color: "#000000ab", fontSize: 18, marginTop: 8, marginHorizontal: 26, textAlign: "center", lineHeight: 22 },
  divider: { height: 1, backgroundColor: "#D7C2B8", marginVertical: 25, marginHorizontal: 46 },
  sectionTitle: { color: "#000000", fontSize: 18, fontWeight: "bold", marginBottom: 8, marginLeft: 23 },
  adicionaisContainer: { marginBottom: 25, marginLeft: 23 },
  adicionalItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: "#8D4F28", borderRadius: 6, marginRight: 12, justifyContent: "center", alignItems: "center" },
  checkboxSelecionado: { backgroundColor: "#8D4F28" },
  checkmark: { color: "#FFFFFF", fontWeight: "bold", fontSize: 16 },
  adicionalText: { color: "#000000", fontSize: 16, textTransform: "capitalize" },
  sizeContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 25 },
  sizeButton: { borderWidth: 2, borderColor: "#D7C2B8", backgroundColor: "#FFFFFF", paddingVertical: 12, paddingHorizontal: 24, borderRadius: 30, marginHorizontal: 8 },
  selectedSizeButton: { borderColor: "#8D4F28", backgroundColor: "#8D4F28" },
  sizeButtonText: { color: "#000000", fontSize: 16, fontWeight: "bold" },
  selectedSizeButtonText: { color: "#FFFFFF" },
  bottomContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", padding: 15, backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: "#EEEEEE" },
  quantityContainer: { flexDirection: "column" },
  quantityLabel: { color: "#000000", fontSize: 18, fontWeight: "bold", marginBottom: 8, marginLeft: 15 },
  quantitySelector: { flexDirection: "row", alignItems: "center", marginLeft: 15, marginBottom: 20 },
  quantityButton: { borderWidth: 1, borderColor: "#D7C2B8", backgroundColor: "#8D4F28", width: 36, height: 36, borderRadius: 18, justifyContent: "center", alignItems: "center" },
  disabledButton: { backgroundColor: "#D7C2B8" },
  quantityButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold", lineHeight: 36 },
  quantityText: { color: "#000000", fontSize: 18, fontWeight: "bold", minWidth: 30, textAlign: "center", marginHorizontal: 10 },
  addButton: { backgroundColor: "#8D4F28", paddingVertical: 21, paddingHorizontal: 30, borderRadius: 30, justifyContent: "center", alignItems: "center", marginBottom: 20, marginRight: 13 },
  addButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});

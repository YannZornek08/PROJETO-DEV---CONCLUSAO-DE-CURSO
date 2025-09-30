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
import { StackParamsList } from "../../routes/app.routes"; // ajuste o caminho
import { api } from "../../services/api";

type DetalhesRouteProp = RouteProp<StackParamsList, "DetalhesProdutos">;

type Additional = {
  ingredient_product_id: string;
  product_id: string;
  ingredient_id: string;
  product: {
    name: string;
  };
  ingredient: {
    name: string;
  };
  adicionado: boolean;
};

// const toggleAdicional = (adicional: string) => {
//   if (adicionais.includes(adicional)) {
//     setAdicionais(adicionais.filter((item) => item !== adicional));
//   } else {
//     setAdicionais([...adicionais, adicional]);
//   }
// };
export default function DetalhesProdutos() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route = useRoute<DetalhesRouteProp>();
  const [adicionais, setAdicionais] = useState<Additional[]>([]);

  // Imprime aqui os produtos clicados em adicionar
  const { product } = route.params;

  const tamanhos = ["P", "M", "G"];

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>("M");
  const [quantidade, setQuantidade] = useState<number>(1);


  useEffect(() => {
    async function verAdicionaisProduto() {
      try {
        //Chama a rota que retorna TODOS os ingredientes do produto
        const response = await api.get('/product/ingredients', {
          params: {
            product_id: product.id,
          }
        });
        console.log("API retornou:", response.data);
        setAdicionais(Array.isArray(response.data) ? response.data : [response.data]);
        const dataArray = Array.isArray(response.data) ? response.data : [response.data];
        const formattedAdicionais: Additional[] = dataArray.map((item: any) => ({
          ingredient_product_id: item.ingredient_product_id ?? "",
          product_id: item.product_id ?? "",
          ingredient_id: item.ingredient_id ?? "",
          product: {
            name: item.product?.name ?? "",
          },
          ingredient: {
            name: item.ingredient?.name ?? "",
          },
          adicionado: item.adicionado ?? false,
        }));
        setAdicionais(formattedAdicionais);
        console.log("É array?", Array.isArray(response.data));
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }
    verAdicionaisProduto();
  }, [product.id]);

  const Menu = () => {
    navigation.navigate("Menu");
  };

  const aumentarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cabeçalho e imagem do produto */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={Menu}>
            <Image
            source={require('../../assets/Voltar.png')}
              resizeMode="stretch"
              style={styles.smallImage}
            />
          </TouchableOpacity>
          <Image
            source={{
              uri: product.banner,
            }}
            resizeMode={"stretch"}
            style={styles.largeImage}
          />
        </View>

        {/* Nome e preço */}
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>R$ {product.price}</Text>
        </View>

        {/* Descrição */}
        <Text style={styles.description}>
          {product.description}
        </Text>

        {/* Divisória */}
        <View style={styles.divider} />

        {/* Adicionais */}
        <View style={styles.adicionaisContainer}>
          {adicionais.length > 0 && (
            <Text style={styles.sectionTitle}>Adicionais:</Text>
          )}
          {adicionais.map((ingred) => (
            <TouchableOpacity
              key={ingred.ingredient_product_id}
              style={styles.adicionalItem}
              onPress={async () => {
          // Atualiza localmente
          setAdicionais((prev) =>
            prev.map((item) =>
              item.ingredient_product_id === ingred.ingredient_product_id
                ? { ...item, adicionado: !item.adicionado }
                : item
            )
          );
          // Atualiza no banco via API
            try {
            await api.put(`/additional/update`, {
              product_id: ingred.product_id,
              ingredient_id: ingred.ingredient_id,
            });
            console.log("Adicional atualizado com sucesso", ingred, ingred.adicionado);
            } catch (err) {
            console.log("Erro ao atualizar adicional:", err);
            }
              }}
            >
              <View
          style={[
            styles.checkbox,
            ingred.adicionado && styles.checkboxSelecionado,
          ]}
              >
          {ingred.adicionado && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.adicionalText}>{ingred.ingredient?.name ?? "Sem adicional"}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Seletor de tamanho */}
        <Text style={styles.sectionTitle}>Tamanho:</Text>
        <View style={styles.sizeContainer}>
          {tamanhos.map((tamanho) => (
            <TouchableOpacity
              key={tamanho}
              onPress={() => setTamanhoSelecionado(tamanho)}
              style={[
                styles.sizeButton,
                tamanhoSelecionado === tamanho && styles.selectedSizeButton,
              ]}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  tamanhoSelecionado === tamanho &&
                  styles.selectedSizeButtonText,
                ]}
              >
                {tamanho}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Área fixa inferior com quantidade e botão de adicionar */}
      <View style={styles.bottomContainer}>
        {/* Seletor de quantidade */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Quantidade:</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              onPress={diminuirQuantidade}
              style={[
                styles.quantityButton,
                quantidade <= 1 && styles.disabledButton,
              ]}
              disabled={quantidade <= 1}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantidade}</Text>

            <TouchableOpacity
              onPress={aumentarQuantidade}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão de adicionar */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            alert(
              `Pizza adicionada! Tamanho: ${tamanhoSelecionado}, Quantidade: ${quantidade}, Adicionais: ${adicionais.join(
                ", "
              ) || "Nenhum"}`
            );
            navigation.navigate("Carrinho");
          }}
        >
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
  largeImage: { height: 360,
    borderRadius: 180,
  },
  productName: {
    color: "#000000",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  priceContainer: { alignItems: "center", marginVertical: 10 },
  price: { color: "#000000", fontSize: 22, fontWeight: "bold" },
  description: {
    color: "#000000ab",
    fontSize: 18,
    marginTop: 8,
    marginHorizontal: 26,
    textAlign: "center",
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: "#D7C2B8",
    marginVertical: 25,
    marginHorizontal: 46,
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 23,
  },
  adicionaisContainer: {
    marginBottom: 25,
    marginLeft: 23,
  },
  adicionalItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#8D4F28",
    borderRadius: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelecionado: {
    backgroundColor: "#8D4F28",
  },
  checkmark: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  adicionalText: { color: "#000000", fontSize: 16, textTransform: "capitalize" },
  sizeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  sizeButton: {
    borderWidth: 2,
    borderColor: "#D7C2B8",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginHorizontal: 8,
  },
  selectedSizeButton: {
    borderColor: "#8D4F28",
    backgroundColor: "#8D4F28",
  },
  sizeButtonText: { color: "#000000", fontSize: 16, fontWeight: "bold" },
  selectedSizeButtonText: { color: "#FFFFFF" },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  quantityContainer: { flexDirection: "column" },
  quantityLabel: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginLeft: 15,
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 20
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: "#D7C2B8",
    backgroundColor: "#8D4F28",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: { backgroundColor: "#D7C2B8" },
  quantityButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 36,
  },
  quantityText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 30,
    textAlign: "center",
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#8D4F28",
    paddingVertical: 21,
    paddingHorizontal: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginRight: 13,
  },
  addButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});

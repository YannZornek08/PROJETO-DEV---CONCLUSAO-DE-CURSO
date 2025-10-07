import React, { useEffect, useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type DetalhesRouteProp = RouteProp<StackParamsList, "DetalhesProdutos">;

type Ingredient = {
  id: string;
  ingredient_product_id: string;
  ingredient: {
    name: string;
  };
  product: {
    product_id: string;
    name: string;
  };
  adicionado: boolean;
  order_id: string;
}

type Additional = {
  id: string;
  additional: {
    name: string;
    price: number;
  };
}

export default function DetalhesProdutos() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route = useRoute<DetalhesRouteProp>();
  const [adicionais, setAdicionais] = useState<Additional[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const [mostrarIngredientes, setMostrarIngredientes] = useState(false);
  const [mostrarAdicionais, setMostrarAdicionais] = useState(false);

  const { product } = route.params;
  const order_id = "e7611b30-2756-4346-9305-2bf30495c238";

  //CODIGO DO COPILOT
  // const order_id = route.params?.order_id ?? null;
  // console.log("Produto selecionado:", product);
  // console.log("Order ID:", order_id);

  // const tamanhos = ["P", "M", "G"];
  // const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>("M");
  const [quantidade, setQuantidade] = useState<number>(1);


  const Menu = () => {
    navigation.navigate("Menu");
  };

  const aumentarQuantidade = () => setQuantidade(quantidade + 1);
  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  useEffect(() => {
    async function verIngredientesProduto() {
      try {
        //Chama a rota que retorna TODOS os ingredientes do produto
        console.log("Buscando ingredientes para o produto ID:", product);
        const response = await api.get('/product/all/ingredients', {
          params: {
            product_id: product.id,
            order_id: order_id
          }
        });
        console.log("API retornou:", response.data);
        setIngredients(Array.isArray(response.data) ? response.data : [response.data]);
        const dataArray = Array.isArray(response.data) ? response.data : [response.data];
        const formattedIngredients: Ingredient[] = dataArray.map((item: any) => ({
          id: item.id ?? "",
          ingredient_product_id: item.ingredient_product_id ?? "",
          ingredient: {
            name: item.ingredient_product.ingredient.name ?? "",
          },
          product: {
            name: item.ingredient_product.product.name ?? "",
            product_id: item.ingredient_product.product.id ?? "",
          },
          order_id: order_id,
          adicionado: item.adicionado ?? Error("Campo 'adicionado' não encontrado"),
        }));
        setIngredients(formattedIngredients);
        console.log("Ingredientes formatados:", ingredients)
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }
    async function verAdicionaisCategoria () {
      try {
        //Chama a rota que retorna TODOS os adicionais da categoria
        console.log("Buscando adicionais para a categoria:", product.category_id);
        const response = await api.get('/product/all/ingredients', {
          params: {
            category_id: product.category_id,
            order_id: order_id
          }
        });
        console.log("API retornou:", response.data);
        setIngredients(Array.isArray(response.data) ? response.data : [response.data]);
        const dataArray = Array.isArray(response.data) ? response.data : [response.data];
        const formattedIngredients: Ingredient[] = dataArray.map((item: any) => ({
          id: item.id ?? "",
          ingredient_product_id: item.ingredient_product_id ?? "",
          ingredient: {
            name: item.ingredient_product.ingredient.name ?? "",
          },
          product: {
            name: item.ingredient_product.product.name ?? "",
            product_id: item.ingredient_product.product.id ?? "",
          },
          order_id: order_id,
          adicionado: item.adicionado ?? Error("Campo 'adicionado' não encontrado"),
        }));
        setIngredients(formattedIngredients);
        console.log("Ingredientes formatados:", ingredients)
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }
    verIngredientesProduto();
  }, [product.id]);

  // async function criarItemIngrediente(id_ingredient_product: string) {
  //   try {
  //     await api.post('/item/ingredient/create', {
  //       ingredient_product_id: id_ingredient_product,
  //       order_id: order_id
  //     })
  //     console.log("Ingrediente dos itens criados com sucesso")
  //   } catch (err) {
  //     console.log("Não foi possível criar os ingredientes dos itens", err)
  //   }
  // }

  async function updateIngrediente(id_ingredient_product: string) {
    try {
      await api.put('/item/ingredient', {
        ingredient_product_id: id_ingredient_product,
        order_id: order_id
      });
    } catch (err) {
      console.log("Erro ao atualizar ingrediente:", err);
    }
  }

  async function updateAdicional(id_categories_additional: string) {
    try {
      await api.put('/item/additional', {
        categories_additionals_id: id_categories_additional,
        order_id: order_id
      });
    } catch (err) {
      console.log("Erro ao atualizar adicional:", err);
    }
  }

  async function adicionarItem() {
    try {
      const newItem = await api.post('/order/add', {
        order_id: order_id,
        items_ingredients_id: ingredients.map(ing => ing.id).join(", "), // Exemplo de como pegar os IDs dos ingredientes selecionados
        items_additionals_id: adicionais.map(add => add.id).join(",") ?? "", // Exemplo de como pegar os IDs dos adicionais selecionados
        amount: quantidade,
      });
      console.log("Item adicionado:", newItem.data);
      // setItems((prevItems) => [...prevItems, newItem.data]);
    } catch (err) {
      console.log("Erro ao adicionar item:", err,
        ingredients.map(ing => ing.id).join(","),
        adicionais.map(add => add.id).join(",") ?? "Não está enviando adicionais",
        quantidade);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cabeçalho e imagem */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={Menu}>
            <Image
              source={require('../../assets/Voltar.png')}
              resizeMode="stretch"
              style={styles.smallImage}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: product.banner }}
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
        <Text style={styles.description}>{product.description}</Text>

        {/* Divisória */}
        <View style={styles.divider} />

        {/* Ingredientes */}
        {/* <View style={styles.adicionaisContainer}>
          {ingredients.length > 0 && (
            <Text style={styles.sectionTitle}>Ingredientes:</Text>
          )}
          {ingredients.map((ingred) => (
            <TouchableOpacity
              key={ingred.id}
              style={styles.adicionalItem}
              onPress={async () => {
                alert("Adicional: " + (ingred.ingredient?.name ?? "Sem adicional"));

                // Atualiza localmente
                setIngredients((prev) =>
                  prev.map((item) =>
                    item.id === ingred.id
                      ? { ...item, adicionado: !item.adicionado }
                      : item
                  )
                );
                // Atualiza no banco via API
                console.log("Atualizando ingrediente ID:", ingred.ingredient_product_id);
                if (ingred.id) {
                  await updateIngrediente(ingred.ingredient_product_id);
                  console.log("Ingrediente atualizado com sucesso", ingred, ingred.adicionado);
                } else {
                  console.log("ID do ingrediente não encontrado, não foi possível atualizar");
                }

              }
              }
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
        </View> */}

        {/* // Mensagem caso nenhum ingrediente seja encontrado */}
        {ingredients.length === 0 && (
          <Text style={[styles.sectionTitle]}>
            Nenhum ingrediente encontrado.
          </Text>
        )}

        {/* Botão Ingredientes */}
        {ingredients.length > 0 && (
          <View style={styles.adicionaisContainer}>
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => setMostrarIngredientes(!mostrarIngredientes)}
            >
              <Text style={styles.toggleButtonText}>
                {mostrarIngredientes
                  ? "Ocultar Ingredientes ▲"
                  : "Ver Ingredientes ▼"}
              </Text>
            </TouchableOpacity>

            {mostrarIngredientes && (
              <View style={styles.optionsContainer}>
                {ingredients.map((ingred) => (
                  <TouchableOpacity
                    key={`ingred-${ingred.id}`}
                    style={styles.adicionalItem}
                    onPress={async () => {
                      setIngredients((prev) =>
                        prev.map((item) =>
                          item.id ===
                            ingred.id
                            ? { ...item, adicionado: !item.adicionado }
                            : item
                        )
                      );
                      console.log("Atualizando ingrediente ID:", ingred.ingredient_product_id);
                      if (ingred.id) {
                        await updateIngrediente(ingred.ingredient_product_id);
                        console.log("Ingrediente atualizado com sucesso", ingred, ingred.adicionado);
                      } else {
                        console.log("ID do ingrediente não encontrado, não foi possível atualizar");
                      }
                    }}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        ingred.adicionado && styles.checkboxSelecionado,
                      ]}
                    >
                      {ingred.adicionado && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text style={styles.adicionalText}>
                      {ingred.ingredient?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Botão Adicionais */}
        {/* {adicionais.length > 0 && (
        <View style={styles.adicionaisContainer}>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => setMostrarAdicionais(!mostrarAdicionais)}
          >
            <Text style={styles.toggleButtonText}>
              {mostrarAdicionais
                ? "Ocultar Adicionais ▲"
                : "Ver Adicionais ▼"}
            </Text>
          </TouchableOpacity>

          {mostrarAdicionais && (
            <View style={styles.optionsContainer}>
              {adicionais.map((ingred) => (
                <TouchableOpacity
                  key={`adicional-${ingred.ingredient_product_id}`}
                  style={styles.adicionalItem}
                  onPress={async () => {
                    setAdicionais((prev) =>
                      prev.map((item) =>
                        item.ingredient_product_id ===
                          ingred.ingredient_product_id
                          ? { ...item, adicionado: !item.adicionado }
                          : item
                      )
                    );
                    try {
                      await api.put(`/additional/update`, {
                        product_id: ingred.product_id,
                        ingredient_id: ingred.ingredient_id,
                      });
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
                    {ingred.adicionado && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.adicionalText}>
                    {ingred.ingredient?.name ?? "Sem adicional"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )
      } */}

        {/* Seletor de tamanho */}
        {/* <Text style={styles.sectionTitle}>Tamanho:</Text>
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
        </View> */}
      </ScrollView >

      {/* Área inferior */}
      < View style={styles.bottomContainer} >
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

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            adicionarItem();
            alert(
              `Pizza adicionada! Quantidade: ${quantidade}`
            );
            navigation.navigate("Carrinho");
          }}
        >
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View >
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
  imageContainer: { marginTop: 65, marginBottom: 2, marginHorizontal: 26 },
  smallImage: { width: 32, height: 32, marginBottom: 16 },
  largeImage: { height: 360, borderRadius: 180 },
  productName: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "BesleyBold",
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
    marginLeft: 0,
  },
  adicionalItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    marginLeft: 23,
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
  adicionalText: {
    color: "#000000",
    fontSize: 16,
    textTransform: "capitalize",
  },
  toggleButton: {
    backgroundColor: "#8D4F28",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 99,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  toggleButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  optionsContainer: {
    marginTop: 8,
  },
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
    marginBottom: 20,
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

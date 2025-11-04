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
  TextInput,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";
import { formatarPreco } from "../../components/conversorDeMoeda/valoresEmReal";
import { useOrder } from "../../contexts/OrderContext";

import Checkbox from "../../components/Checkbox"; // Certifique-se de que o caminho está correto


type DetalhesRouteProp = RouteProp<StackParamsList, "DetalhesProdutos">;

type Ingredient = {
  id: string;
  ingredient_product_id: string;
  ingredient: {
    name: string | null;
  };
  product: {
    product_id: string;
    name: string;
  };
  adicionado: boolean;
  order_id: string;
}

type Additional = {
  id: number;
  selected: boolean;
  name: string;
  price: number;
  // Adicionando as propriedades necessárias
  adicionado?: boolean;
}

type AdditionalAtt = {
  additional: Additional;
  adicionado: boolean;

}

export type OrderAtual = {
  id: string;
  draft: boolean;
}

export default function DetalhesProdutos() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route = useRoute<DetalhesRouteProp>();
  const [adicionais, setAdicionais] = useState<Additional[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [addAtt, setAddAtt] = useState<AdditionalAtt[]>([]);

  const [mostrarIngredientes, setMostrarIngredientes] = useState(false);
  const [mostrarAdicionais, setMostrarAdicionais] = useState(false);

  //REFATORAR DEPOIS PARA QUE AS VARIAVEIS SEJAM EXPORTADAS AO CARRINHO
  const [bloquearTela, setBloquearTela] = useState(false);
  const [orderAtual, setOrderAtual] = useState<OrderAtual | boolean>(Boolean);
  const [observacoes, setObservacoes] = useState<string>("");
  // const [items, setItems] = useState<Item[]>([]);

  const { product, item } = route.params;
  const [quantidade, setQuantidade] = useState<number>(1);
  const { orderId } = useOrder();

  const Menu = () => {
    navigation.navigate("Menu");
  };

  // async function formatarObservacoes() {
  //   try {
  //     await api.put('/item/notes', {
  //       item_id: item.id,
  //       notes: observacoes,
  //     });
  //   } catch (err) {
  //     console.log("Erro ao formatar observações:", err);
  //   }
  // }
  async function aumentarQuantidade() {
    const novaQuantidade = await api.put('/item/increase', {
      item_id: item.id,
      action: "increase",
    });
    setQuantidade(novaQuantidade.data.amount);
  }
  async function diminuirQuantidade() {
    const novaQuantidade = await api.put('/item/decrease', {
      item_id: item.id,
      action: "decrease",
    });
    setQuantidade(novaQuantidade.data.amount);
  }
  //REFATORAR DEPOIS PARA QUE A FUNÇÃO SEJA EXPORTADA AO CARRINHO
  async function bloquearPedidos() {
    if (!orderId) return;
    try {
      const response = await api.get("/order/detail", {
        params: { order_id: orderId },
      });
      console.log("O id do pedido atual é", orderId)
      // console.log("resposta da apiiiiiiii", response.data)
      setOrderAtual(response.data.order.draft);
      if (response.data.order.draft == false) {
        // console.log("DETALHES PRODUTOS Tem que bloquear a TELA!!")
        setBloquearTela(true);
      } else {
        // console.log("DETALHES PRODUTOS Não bloqueia a tela")
        setBloquearTela(false);
      }
    } catch (err) {
      console.log("Erro ao buscar detalhes do pedido:", err);
    }
  }

  useEffect(() => {
    async function verIngredientesProduto() {
      try {
        //Chama a rota que retorna TODOS os ingredientes do produto
        console.log()
        // console.log("Buscando ingredientes para o produto ID:", product);
        const response = await api.get('/product/all/ingredients', {
          params: {
            product_id: product.id,
            order_id: orderId
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
          order_id: orderId ?? "",
          adicionado: item.adicionado ?? Error("Campo 'adicionado' não encontrado"),
        }));
        setIngredients(formattedIngredients);
        console.log("Ingredientes formatados:", ingredients)
      } catch (err) {
        console.log("Erro ao buscar produtos:", err);
      }
    }
    // async function verAdicionaisCategoria() {

    //   try {
    //     //Chama a rota que retorna TODOS os adicionais da categoria
    //     console.log("Buscando adicionais para a categoria:", product.category_id);
    //     const response = await api.get('/category/all/additionals', {
    //       params: {
    //         category_id: product.category_id,
    //         order_id: orderId,
    //         item_id: item.id,
    //       }
    //     });
    //     console.log("API retornou:", response.data);
    //     setAdicionais(Array.isArray(response.data) ? response.data : [response.data]);
    //     const dataArray = Array.isArray(response.data) ? response.data : [response.data];
    //     const formattedAdditionals: Additional[] = dataArray.map((add: any) => ({
    //       id: add.id,
    //       selected: true, // Definindo um valor padrão para selected
    //       name: add.additional?.name,
    //       price: add.additional?.price,
    //       adicionado: add.adicionado,
    //       additional: add.additional
    //     }));
    //     setAdicionais(formattedAdditionals);
    //     console.log("Adicionais formatados:", adicionais)
    //   } catch (err) {
    //     console.log("Erro ao buscar categorias/adicionais:", err);
    //   }
    // }
    // verAdicionaisCategoria();
    async function verAdicionaisCategoria() {
      console.log("Adicionais ANTES DE TODO O PRCESSO", adicionais)
      try {
        // console.log("Buscando adicionais para a categoria:", product.category_id);
        // console.log("Id do ITEMIJDOIASDJIAS", item.id)
        const response = await api.get('/category/all/additionals', {
          params: {
            category_id: product.category_id,
            order_id: orderId,
            item_id: item.id,
          }
        });

        const dataArray = Array.isArray(response.data) ? response.data : [response.data];
        // console.log("API retornou:", dataArray);

        const formattedAdditionals: Additional[] = dataArray.map((add: any) => ({
          id: add.id,
          selected: add.adicionado, // ✅ Respeita o valor do DB
          name: add.categories_additionals.additionals.name,
          price: add.categories_additionals.additionals.price,
        }));

        setAdicionais(formattedAdditionals);
        console.log("Adicionais formatados:", formattedAdditionals);

      } catch (err) {
        console.log("Erro ao buscar categorias/adicionais:", err);
      }
    }

    async function loadingAdditionals() {
      setAdicionais([]);

      await verAdicionaisCategoria();
      console.log("Adicionais após todo o processo", adicionais)
    }
    // atualizarAdicionaisItem()
    bloquearPedidos();
    loadingAdditionals();
  }, [item.id, orderId, product.id]);

  async function updateIngrediente(id_ingredient_product: string) {
    try {
      await api.put('/item/ingredient', {
        ingredient_product_id: id_ingredient_product,
        order_id: orderId
      });
    } catch (err) {
      console.log("Erro ao atualizar ingrediente:", err);
    }
  }

  async function atualizarAdicionaisItem() {
    try {
      const addAtt = await api.get('/item/additionals', {
        params: {
          item_id: item.id
        }
      })

      // setAddAtt()
      console.log("Resposta da FUnçao dos adicionais", addAtt.data)
    } catch (err) {
      console.log("Erro ao selecionar adicionais atualizados", err)
    }
  }
  async function updateAdicional(id_categories_additional: string) {
    try {
      const aditResponse = await api.put('/item/additional', {
        categories_additionals_id: id_categories_additional,
        order_id: orderId,
        item_id: item.id,
      })
      return aditResponse.data
    } catch (err) {
      console.log("Erro ao atualizar adicional:", err);
    }
  }

  async function manterItem() {
    try {
      await api.put('/item/stay', {
        item_id: item.id,
      });
    } catch (err) {
      console.log("Erro ao manter item no pedido:", err);
    }
  }

  async function criarAdicionaisDoItem() {
    try {
      await api.post('/item/additional/create', {
        item_id: item.id,
        product_id: product.id,
        order_id: orderId,
      });
    } catch (err) {
      console.log("Erro ao criar adicionais do item:", err);
    }
  }

  async function removerAdicionaisDoItem() {
    try {
      await api.delete('/item/additional/delete', {
        data: {
          item_id: item.id,
          product_id: product.id,
          order_id: orderId,
        }
      });
    } catch (err) {
      console.log("Erro ao remover adicionais do item:", err);
    }
  }

  // useEffect(() => {
  //   const fetchAdditionals = async () => {
  //     const response = await api.get(`/additionals/${item.id}`);
  //     setAdditionals(response.data);
  //   };
  //   // fetchAdditionals();
  // }, [item.id]);

  // const handleToggle = async (additionalId: number) => {
  //   const updatedAdditionals = additionals.map((additional: Additional) => {
  //     if (additional.id === additionalId) {
  //       return { ...additional, selected: !additional.selected };
  //     }
  //     return additional;
  //   });
  //   setAdditionals(updatedAdditionals);
  //   const additional = updatedAdditionals.find(a => a.id === additionalId);
  //   await api.post(`/update-additional`, { additionalId, selected: additional?.selected });
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* //REFATORAR DEPOIS PARA QUE O BLOCO DE CÓDIGO SEJA EXPORTADO AO CARRINHO */}
      {bloquearTela && (
        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayText}>
              Este pedido já foi finalizado e não pode ser editado.
            </Text>

            <TouchableOpacity
              style={styles.overlayButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.overlayButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
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
          <Text style={styles.price}>{formatarPreco(Number(String(product.price).replace(',', '.')) || 0)}</Text>
        </View>

        {/* Descrição */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Divisória */}
        <View style={styles.divider} />

        {/* // Mensagem caso nenhum ingrediente seja encontrado */}
        {ingredients.length === 0 && (
          <Text style={[styles.sectionTitle]}>
            Nenhum ingrediente encontrado.
          </Text>
        )}

        {/* Botão Ingredientes */}
        {ingredients.length > 0 && (
          console.log("Existem tantos ingredientes: ", ingredients.length),
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
                    }}>
                    <View
                      style={[
                        styles.checkbox,
                        ingred.adicionado && styles.checkboxSelecionado,
                      ]}>
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

        {/* // Mensagem caso nenhum ingrediente seja encontrado */}
        {adicionais.length === 0 && (
          console.log("Existem tantos ingredientes: ", adicionais.length),
          <Text style={[styles.sectionTitle]}>
            Nenhum adicional encontrado.
          </Text>
        )}

        {/* Botão Adicionais */}
        {adicionais.length > 0 && (
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
                {adicionais.map((adit) => (
                  <TouchableOpacity
                    key={`adicional-${adit.id}`}
                    style={styles.adicionalItem}
                    onPress={async () => {
                      if (!adit.id) {
                        console.log("ID inválido, não é possível atualizar.");
                        return;
                      }

                      // Atualiza imediatamente no front para feedback visual rápido
                      setAdicionais(prev => {
                        const updated = prev.map(item =>
                          item.id === adit.id
                            ? { ...item, selected: !item.selected }
                            : item
                        );

                        console.log("NOVO ESTADO DE ADICIONAIS:", updated); // ✅ Aqui já está atualizado!
                        return updated;
                      });
                      // console.log("Estado do selected", item.selected)

                      // Chama backend para criar/remover no banco
                      // await atualizarAdicionaisItem()
                      await updateAdicional(adit.id.toString());

                      console.log("Adicional atualizado:", adit.id);
                    }}

                  >
                    <View style={[styles.checkbox, adit.selected && styles.checkboxSelecionado]}>
                      {adit.selected && <Text style={styles.checkmark}>✓</Text>}
                    </View>

                    <Text style={styles.adicionalText}>
                      {adit.id ? adit.name + " R$ " + formatarPreco(adit.price) : 'Adicional não disponível'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )
        }
      </ScrollView >

      {/* Área inferior */}
      <View style={styles.bottomContainer}>
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
            {/* Valor Somado do produto */}
            <Text style={styles.price}> R${(product.price * quantidade)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            // Lógica para adicionar ao carrinho
            // Aqui você pode enviar os dados para o backend ou atualizar o estado global
            if (!orderId) {
              alert("Erro: Nenhum pedido ativo. Por favor, inicie um pedido antes de adicionar itens.");
              return;
            } else {
              manterItem();
              alert(
                `${product.name} adicionado! Quantidade: ${quantidade}, Adicionais: ${adicionais.join(
                  ", "
                ) || "Nenhum"}`
              );
              navigation.navigate("Carrinho");
            }
          }
          }
        >
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999, // cobre tudo
  },
  overlayContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 30,
    width: "80%",
    alignItems: "center",
    elevation: 10,
  },
  overlayTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8D4F28",
    marginBottom: 10,
  },
  overlayText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  overlayButton: {
    backgroundColor: "#8D4F28",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  overlayButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
  imageContainer: { marginTop: 65, marginBottom: 2, marginHorizontal: 26 },
  smallImage: { width: 32, height: 32, marginBottom: 16 },
  largeImage: {
    height: 360,
    borderRadius: 180,
  },
  productName: {
    color: "#000000",
    fontSize: 32,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "BesleyBold",
  },
  priceContainer: { alignItems: "center", marginVertical: 4 },
  price: { color: "#000000", fontSize: 18, fontFamily: "BesleyRegular" },
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
    marginTop: -1,
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
  notesContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#52443C",
    borderRadius: 18,
    borderWidth: 4,
    padding: 12,
    marginBottom: 27,
    marginHorizontal: 26,
    minHeight: 120,
    justifyContent: "flex-start",
  },
  notesInput: {
    color: "#000000",
    fontSize: 14,
    flex: 1,
    padding: 6,
    textAlign: "center",
  },
  addButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});
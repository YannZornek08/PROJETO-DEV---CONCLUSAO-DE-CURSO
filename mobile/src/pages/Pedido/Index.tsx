import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default () => {
  const [qtdAbacaxi, setQtdAbacaxi] = useState(1);
  const [qtdPepperoni, setQtdPepperoni] = useState(1);
  const [obs, setObs] = useState("");

  const precoAbacaxi = 35;
  const precoPepperoni = 42;
  const total = qtdAbacaxi * precoAbacaxi + qtdPepperoni * precoPepperoni;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        {/* Ícone voltar */}
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ogwEx3xhdY/rco2jqx2_expires_30_days.png",
          }}
          resizeMode={"stretch"}
          style={{
            width: 32,
            height: 32,
            marginTop: 65,
            marginBottom: 5,
            marginLeft: 26,
          }}
        />

        {/* Título */}
        <Text
          style={{
            color: "#000000",
            fontSize: 32,
            textAlign: "center",
            marginBottom: 24,
            marginHorizontal: 26,
          }}
        >
          {"Pedido"}
        </Text>

        {/* Item 1 */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            marginHorizontal: 33,
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ogwEx3xhdY/qzmw1wml_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={{
              width: 90,
              height: 90,
              marginRight: 20,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#000000", fontSize: 14 }}>
              Pizza de Abacaxi{"\n"}Tamanho: S
            </Text>
            {/* Controle de quantidade */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
              <TouchableOpacity onPress={() => setQtdAbacaxi(Math.max(1, qtdAbacaxi - 1))}>
                <Text style={{ fontSize: 20 }}> - </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, marginHorizontal: 10 }}>{qtdAbacaxi}</Text>
              <TouchableOpacity onPress={() => setQtdAbacaxi(qtdAbacaxi + 1)}>
                <Text style={{ fontSize: 20 }}> + </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              textAlign: "right",
              width: 94,
            }}
          >
            R$ {precoAbacaxi * qtdAbacaxi},00
          </Text>
        </View>

        {/* Item 2 */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            marginHorizontal: 33,
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ogwEx3xhdY/egjzb6hm_expires_30_days.png",
            }}
            resizeMode={"stretch"}
            style={{
              width: 90,
              height: 90,
              marginRight: 20,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#000000", fontSize: 14 }}>
              Pizza de Pepperoni{"\n"}Tamanho: M
            </Text>
            {/* Controle de quantidade */}
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
              <TouchableOpacity onPress={() => setQtdPepperoni(Math.max(1, qtdPepperoni - 1))}>
                <Text style={{ fontSize: 20 }}> - </Text>
              </TouchableOpacity>
              <Text style={{ fontSize: 16, marginHorizontal: 10 }}>{qtdPepperoni}</Text>
              <TouchableOpacity onPress={() => setQtdPepperoni(qtdPepperoni + 1)}>
                <Text style={{ fontSize: 20 }}> + </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              textAlign: "right",
              width: 94,
            }}
          >
            R$ {precoPepperoni * qtdPepperoni},00
          </Text>
        </View>

        {/* Observações */}
        <TextInput
          placeholder="Toque para adicionar observações:"
          value={obs}
          onChangeText={setObs}
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#52443C",
            borderRadius: 18,
            borderWidth: 2,
            height: 100,
            marginBottom: 27,
            marginHorizontal: 26,
            padding: 10,
            textAlignVertical: "top",
          }}
          multiline={true}
        />

        {/* Total */}
        <Text
          style={{
            color: "#000000",
            fontSize: 20,
            textAlign: "right",
            marginBottom: 10,
            marginHorizontal: 26,
          }}
        >
          Total: R$ {total},00
        </Text>

        {/* Mesa e Nome */}
        <View style={{ marginHorizontal: 26, marginBottom: 37 }}>
          <Text style={{ fontSize: 16, color: "#000000" }}>Mesa: 05</Text>
          <Text style={{ fontSize: 16, color: "#000000" }}>Nome: João M.</Text>
        </View>

        {/* Botão Pagar */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#8D4F28",
            borderRadius: 100,
            paddingVertical: 24,
            marginBottom: 35,
            marginHorizontal: 26,
          }}
          onPress={() => alert("Pagamento processado!")}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 24,
            }}
          >
            {"Pagar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

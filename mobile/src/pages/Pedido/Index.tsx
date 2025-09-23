import React from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TouchableOpacity } from "react-native";

export default function Pedido() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        
        {/* Logo ou ícone da pizzaria */}
        <Image
         source={require('../../assets/Voltar.png')}
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
            fontWeight: "bold",
          }}
        >
          Pedido
        </Text>

        {/* Item 1 */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            marginHorizontal: 33,
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
              marginRight: 27,
            }}
          />
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              marginTop: 14,
              flex: 1,
            }}
          >
            Pizza de Abacaxi{"\n"}Tamanho: S
          </Text>
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              textAlign: "right",
              marginVertical: 6,
              width: 94,
            }}
          >
            R$ 35,00
          </Text>
        </View>

        {/* Item 2 */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: 85,
            marginHorizontal: 33,
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
              marginRight: 27,
            }}
          />
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              marginTop: 14,
              flex: 1,
            }}
          >
            Pizza de Pepperoni{"\n"}Tamanho: M
          </Text>
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              textAlign: "right",
              marginVertical: 6,
              width: 94,
            }}
          >
            R$ 42,00
          </Text>
        </View>

        {/* Observações */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderColor: "#52443C",
            borderRadius: 18,
            borderWidth: 4,
            paddingBottom: 101,
            marginBottom: 27,
            marginHorizontal: 26,
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            Toque para adicionar observações:
          </Text>
        </View>

        {/* Total */}
        <Text
          style={{
            color: "#000000",
            fontSize: 32,
            textAlign: "right",
            marginBottom: 21,
            marginHorizontal: 26,
          }}
        >
          R$ 77,00
        </Text>

        {/* Mesa + Nome do Cliente */}
        <Text
          style={{
            color: "#000000",
            fontSize: 16,
            textAlign: "right",
            marginBottom: 37,
            marginHorizontal: 26,
          }}
        >
          Mesa 05{"\n"}João M.
        </Text>

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
          onPress={() => alert("Pagamento realizado!")}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Pagar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

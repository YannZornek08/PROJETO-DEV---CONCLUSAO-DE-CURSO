import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

export default function HomeScreen() {
  const [textInput1, onChangeTextInput1] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  async function Menu() {
    navigation.navigate('Menu')
  }

  async function Cupons() {
    navigation.navigate('Cupons')
  }

  async function Favoritos() {
    navigation.navigate('Favoritos')
  }

  async function LerQR() {
    navigation.navigate('LerQR')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            paddingTop: 86,
            paddingBottom: 7,
            marginBottom: 2,
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 32,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 26,
            }}
          >
            {"Bom dia, João."}
          </Text>

          {/* Barra de busca */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F6E5DD",
              borderRadius: 28,
              padding: 4,
              marginBottom: 10,
              marginHorizontal: 26,
            }}
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/m1yrb272_expires_30_days.png",
              }}
              resizeMode={"stretch"}
              style={{ width: 48, height: 48, marginRight: 4 }}
            />
            <TextInput
              placeholder={"O que busca?"}
              value={textInput1}
              onChangeText={onChangeTextInput1}
              style={{
                color: "#52443C",
                fontSize: 16,
                flex: 1,
                paddingVertical: 12,
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/tmmocg1t_expires_30_days.png",
                }}
                resizeMode={"stretch"}
                style={{ width: 48, height: 48 }}
              />
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/bjnemhbr_expires_30_days.png",
                }}
                resizeMode={"stretch"}
                style={{ width: 48, height: 48 }}
              />
            </View>
          </View>

          {/* Botão filtros */}
          <View style={{ alignItems: "center", paddingVertical: 8 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: "#8D4F28",
                borderRadius: 12,
                paddingVertical: 6,
                paddingHorizontal: 12,
              }}
              onPress={() => alert("Pressed!")}
            >
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/uip8oeqk_expires_30_days.png",
                }}
                resizeMode={"stretch"}
                style={{ width: 20, height: 20, marginRight: 4 }}
              />
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                {"Filtros"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text
          style={{
            color: "#000000",
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          {"Sua mesa: 05"}
        </Text>

        {/* ---------------- */}
        {/* AQUI ESTÃO TODOS OS CARDS DAS PIZZAS */}
        {/* ---------------- */}

        <View style={{ marginBottom: 44, marginHorizontal: 26 }}>
          {/* Linha 1 */}
          <View style={{ flexDirection: "row", marginBottom: 30 }}>
            <PizzaCard
              title="Pizza de Pepperoni"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/ggqdmnfn_expires_30_days.png"
            />
            <PizzaCard
              title="Pizza de Abacaxi"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/02jqnrgo_expires_30_days.png"
            />
          </View>

          {/* Linha 2 */}
          <View style={{ flexDirection: "row", marginBottom: 30 }}>
            <PizzaCard
              title="Pizza de Pepperoni"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/sow9drm9_expires_30_days.png"
            />
            <PizzaCard
              title="Pizza de Abacaxi"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/50ff6gko_expires_30_days.png"
            />
          </View>

          {/* Linha 3 */}
          <View style={{ flexDirection: "row" }}>
            <PizzaCard
              title="Pizza de Pepperoni"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/6zusf2rc_expires_30_days.png"
            />
            <PizzaCard
              title="Pizza de Abacaxi"
              price="R$42,00"
              image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/ec18wgmn_expires_30_days.png"
            />
          </View>
        </View>

        {/* Bottom Menu */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#FCEAE2",
            borderRadius: 80,
            paddingHorizontal: 17,
            marginBottom: 42,
            marginHorizontal: 26,
          }}
        >
          <TouchableOpacity onPress={Menu}>
            {/* <Image></Image> */}
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Favoritos}>
            {/* <Image></Image> */}
            <Text>Favoritos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Cupons}>
            {/* <Image></Image> */}
            <Text>Cupons</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={LerQR}>
            {/* <Image></Image> */}
            <Text>Ler QR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------------- */
/* COMPONENTES AUXILIARES */
/* ---------------- */

type PizzaCardProps = {
  title: string;
  price: string;
  image: string;
};

function PizzaCard({ title, price, image }: PizzaCardProps) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={{ uri: image }}
        resizeMode={"stretch"}
        style={{ height: 180, marginBottom: 8 }}
      />
      <Text
        style={{
          color: "#000000",
          fontSize: 16,
          textAlign: "center",
          marginBottom: 12,
        }}
      >
        {title}
      </Text>
      <Text style={{ color: "#000000", fontSize: 14, marginBottom: 7 }}>
        {price}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "#8D4F28",
          borderRadius: 100,
          paddingVertical: 6,
          paddingHorizontal: 12,
          marginVertical: 8,
          marginHorizontal: 35,
        }}
        onPress={() => alert(`${title} adicionado!`)}
      >
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/mijsyyvb_expires_30_days.png",
          }}
          resizeMode={"stretch"}
          style={{ width: 20, height: 20, marginRight: 4 }}
        />
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: "bold",
            flex: 1,
          }}
        >
          {"Adicionar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

type BottomTabProps = {
  icon: string;
  label: string;
  active?: boolean;
};

function BottomTab({ icon, label, active }: BottomTabProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertical: 12,
        marginRight: 12,
      }}
    >
      <Image
        source={{ uri: icon }}
        resizeMode={"stretch"}
        style={{ height: 32, marginBottom: 4 }}
      />
      <Text
        style={{
          color: active ? "#52443C" : "#221A15",
          fontSize: 12,
          fontWeight: active ? "bold" : "normal",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

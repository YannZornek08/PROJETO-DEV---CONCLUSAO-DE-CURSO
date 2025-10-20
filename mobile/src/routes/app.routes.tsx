import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Menu";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";
import type { Produto } from "../pages/Menu/index";

// NAV
import Menu from "../pages/Menu";
import Cupons from "../pages/Cupons";
import StatusPedido from "../pages/StatusPedido";
import LerQR from "../pages/LerQR";

//////

//Pagamento

import Pagamento from "../pages/Pagamento"
import DadosPagamento from "../pages/DadosPagamento"
import DadosPagamentoPix from "../pages/DadosPagamentoPix"

//////////////
import Status1 from "../pages/Status1";
import Status2 from "../pages/Status2";

// Botões da busca

import Carrinho from "../pages/Carrinho";
import Settings from "../pages/PageSettings";

//////////////////

// Cards
import DetalhesProdutos from "../pages/DetalhesProduto";



export type StackParamsList = {
  Dashboard: undefined;
  Menu: undefined;
  Cupons: undefined;
  Status1: undefined;
  Status2: undefined;
  LerQR: undefined;
  Carrinho: undefined;
  StatusPedido: undefined;
  Settings: undefined;
  Pagamento: undefined;
  DadosPagamento: { id_mtdo_pagto: string };
  DetalhesProdutos: { product: Produto };
  VoltarMenu: undefined;

  Order: {
    number: number | string;
    order_id: string;
  };
  FinishOrder: {
    number: number | string;
    order_id: string;
  };
};

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Cupons"
        component={Cupons}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Status1"
        component={Status1}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Status2"
        component={Status2}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="StatusPedido"
        component={StatusPedido}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LerQR"
        component={LerQR}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Carrinho"
        component={Carrinho}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Pagamento"
        component={Pagamento}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DadosPagamento"
        component={DadosPagamento}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DetalhesProdutos"
        component={DetalhesProdutos}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="VoltarMenu"
        component={Menu}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="FinishOrder"
        component={FinishOrder}
        options={{
          title: "Finalizando",
          headerStyle: {
            backgroundColor: "#1d1d2e",
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

export default AppRoutes;

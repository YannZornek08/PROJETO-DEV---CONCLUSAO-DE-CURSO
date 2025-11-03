import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthContext";
import AppRoutes from "./src/routes/app.routes";

// Import pages (not directly used here but may be referenced elsewhere)
import Cadastro from "./src/pages/Cadastro";
import SignIn from "./src/pages/SignIn";
import Menu from "./src/pages/Menu";
import Pagamento from "./src/pages/Pagamento";
import Conta from "./src/pages/Conta";
import DetalhesProduto from "./src/pages/DetalhesProduto";
import DadosPagamento from "./src/pages/DadosPagamento";
import DadosPagamentoPix from "./src/pages/DadosPagamentoPix";
import Cupons from "./src/pages/Cupons";
import Carrinho from "./src/pages/Carrinho";
import LerQR from "./src/pages/LerQR";
import Status1 from "./src/pages/Status1";
import Status2 from "./src/pages/Status2";
import { OrderProvider } from "./src/contexts/OrderContext";
import { CostumerProvider } from "./src/contexts/CostumerContext";

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    BesleyBold: require("./src/assets/fonts/Besley-Bold.ttf"),
    BesleyRegular: require("./src/assets/fonts/Besley-Regular.ttf"),
  });
  

 
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    // <NavigationContainer>
    //   <OrderProvider>
    //     <AppRoutes />
    //   </OrderProvider>
    // </NavigationContainer>
    <NavigationContainer>
      {/* <AppRoutes /> */}
      <AuthProvider>
      <CostumerProvider>
      <OrderProvider>
        <Routes />
      </OrderProvider>
      </CostumerProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
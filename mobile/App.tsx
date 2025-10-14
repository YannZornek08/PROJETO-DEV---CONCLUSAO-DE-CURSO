import { View, StatusBar, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';
import { OrderProvider } from "./src/contexts/OrderContext";
import { CostumerProvider } from "./src/contexts/CostumerContext";
import { useFonts } from 'expo-font';

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
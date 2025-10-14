import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';
import { OrderProvider } from "./src/contexts/OrderContext";
import { CostumerProvider } from "./src/contexts/CostumerContext";

const Stack = createNativeStackNavigator();

export default function App() {
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
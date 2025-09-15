import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './src/routes';


import { AuthProvider } from './src/contexts/AuthContext';
import Cadastro from './src/pages/Cadastro';
import SignIn from './src/pages/SignIn';
import Menu from './src/pages/Menu';
import AppRoutes from './src/routes/app.routes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
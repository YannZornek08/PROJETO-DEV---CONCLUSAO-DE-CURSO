import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './src/routes';


import { AuthProvider } from './src/contexts/AuthContext';
import Cadastro from './src/pages/Cadastro';
import SignIn from './src/pages/SignIn';
import Menu from './src/pages/Menu';
// import Pedido from './src/pages/Pedido';
import Cupom from './src/pages/Cupom';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>

    //   <AuthProvider>
    //   <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false}/>
    //   <Routes />
    // </AuthProvider>
    // </NavigationContainer>
    // <Pedido />
    <Cupom />
    // <SignIn /> // testando a tela de login
    // <Cadastro /> // testando a tela de cadastro
  );
}
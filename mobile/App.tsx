import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';


import { AuthProvider } from './src/contexts/AuthContext';
import Cadastro from './src/pages/Cadastro';
import SignIn from './src/pages/SignIn';
import Menu from './src/pages/Menu';
import Pagamento from './src/pages/Pagamento';
import Conta from './src/pages/Conta';
import DetalhesPedido from './src/pages/DetalhesPedido';

export default function App() {
  return (
    // <NavigationContainer>
    //   <AuthProvider>
    //   <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false}/>
    //   <Routes />
    // </AuthProvider>
    // </NavigationContainer>
    <DetalhesPedido/>  
    // <SignIn /> // testando a tela de login
    // <Cadastro /> // testando a tela de cadastro
  );
}
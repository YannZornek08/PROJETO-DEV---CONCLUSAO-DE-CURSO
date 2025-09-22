import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Routes from './src/routes';
import { AuthProvider } from './src/contexts/AuthContext';
import Cadastro from './src/pages/Cadastro';
import SignIn from './src/pages/SignIn';
import Menu from './src/pages/Menu';
import Pagamento from './src/pages/Pagamento';
import Conta from './src/pages/Conta';
import DetalhesProduto from './src/pages/DetalhesProduto';
import DadosPagamento from './src/pages/DadosPagamento';
import Cupons from './src/pages/Cupons';
import Carrinho from './src/pages/Carrinho'
import AppRoutes from './src/routes/app.routes';
import LerQR from './src/pages/LerQR';
import Status1 from './src/pages/Status1';
import Status2 from './src/pages/Status2';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AppRoutes/>
    </NavigationContainer>
   
    // <DetalhesPedido/>  testando tela de produto
    // <SignIn /> // testando a tela de login
    // <Cadastro /> // testando a tela de cadastro
    // <Cupons /> Cupons testado
    // <Carrinho/>
    // <LerQR/>
  );
}
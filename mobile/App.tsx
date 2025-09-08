import { View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

import { AuthProvider } from './src/contexts/AuthContext';
import SignIn from './src/pages/SignIn';

export default function App() {
  return (
    // <NavigationContainer>
    //   <AuthProvider>
    //   <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false}/>
    //   <Routes />
    // </AuthProvider>
    // </NavigationContainer>
    <SignIn />
  );
}
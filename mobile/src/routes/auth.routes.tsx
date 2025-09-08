import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../pages/SignIn';
import Cadastro from '../pages/Cadastro';

const Stack = createNativeStackNavigator();

function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SignIn" 
        component={SignIn} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cadastro" 
        component={Cadastro} 
        options={{ 
          title: 'Cadastro',
          headerStyle: {
            backgroundColor: '#F1E0CA',
          },
          headerTintColor: '#5F4100',
        }} 
      />
    </Stack.Navigator>
  );
}

export default AuthRoutes;
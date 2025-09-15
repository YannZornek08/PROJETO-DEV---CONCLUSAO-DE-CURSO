import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Menu";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";
import Menu from "../pages/Menu";
import Cupons from "../pages/Cupons";
import Favoritos from "../pages/Favoritos"
import LerQR from "../pages/Ler QR"

export type StackParamsList = {
    Dashboard: undefined;
    Menu: undefined;
    Cupons: undefined;
    Favoritos: undefined;
    LerQR: undefined;
    Order: {
        number: number | string;
        order_id: string;
    };
    FinishOrder: {
        number: number | string;
        order_id: string;
    }
};

const Stack = createNativeStackNavigator<StackParamsList>();

function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Dashboard" 
                component={Dashboard} 
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="Order" 
                component={Order} 
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="Menu" 
                component={Menu} 
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="Cupons" 
                component={Cupons} 
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="Favoritos" 
                component={Favoritos} 
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="LerQR" 
                component={LerQR} 
                options={{headerShown: false}}
            />

            <Stack.Screen 
                name="FinishOrder" 
                component={FinishOrder}
                options={{
                    title: 'Finalizando',
                    headerStyle:{
                        backgroundColor: '#1d1d2e'
                    },
                    headerTintColor: '#fff'
                }}
            />
        </Stack.Navigator>
    );
}

export default AppRoutes
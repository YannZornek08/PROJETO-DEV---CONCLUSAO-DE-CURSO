import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../routes/app.routes';

  import { useOrder } from '../contexts/OrderContext';
  import { Alert } from 'react-native';

// ícones da navbar
const homeIcon = require('../assets/nav-icons/home.png');
const favIcon = require('../assets/nav-icons/star.png');
const cupomIcon = require('../assets/nav-icons/cupom.png');
const qrcodeIcon = require('../assets/nav-icons/qrcode.png');

interface BottomNavBarProps {
  activeRoute: string; // rota atual passada como prop
}


  const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeRoute }) => {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const { orderId } = useOrder(); // pegamos o ID da comanda
    const orderOpen = !!orderId;   // verdadeiro se a comanda está aberta

    const warn = () => {
      Alert.alert("Atenção", "Você precisa ler o QR Code primeiro para abrir a comanda e navegar no app.");
    };

    const goToHome = () => orderOpen ? navigation.navigate('Menu') : warn();
    const goToStatusPedido = () => orderOpen ? navigation.navigate('StatusPedido') : warn();
    const goToCupons = () => orderOpen ? navigation.navigate('Cupons') : warn();
    const goToLerQR = () => navigation.navigate('LerQR'); // sempre permitido

    return (
      <View style={styles.fullNav}>
        {/* Home */}
        <TouchableOpacity
          onPress={goToHome}
          style={[styles.nav, activeRoute === 'Menu' && styles.currentNav]}
        >
          <Image
            source={homeIcon}
            style={[styles.imagesNav, { tintColor: activeRoute === 'Menu' ? '#fff' : '#52443C' }]}
          />
          <Text style={[styles.navText, activeRoute === 'Menu' && styles.currentNavText]}>Home</Text>
        </TouchableOpacity>

        {/* Meu Pedido */}
        <TouchableOpacity
          onPress={goToStatusPedido}
          style={[styles.nav, activeRoute === 'StatusPedido' && styles.currentNav]}
        >
          <Image
            source={favIcon}
            style={[styles.imagesNav, { tintColor: activeRoute === 'StatusPedido' ? '#fff' : '#52443C' }]}
          />
          <Text style={[styles.navText, activeRoute === 'StatusPedido' && styles.currentNavText]}>
            Meu Pedido
          </Text>
        </TouchableOpacity>

        {/* Cupons */}
        <TouchableOpacity
          onPress={goToCupons}
          style={[styles.nav, activeRoute === 'Cupons' && styles.currentNav]}
        >
          <Image
            source={cupomIcon}
            style={[styles.imagesNav, { tintColor: activeRoute === 'Cupons' ? '#fff' : '#52443C' }]}
          />
          <Text style={[styles.navText, activeRoute === 'Cupons' && styles.currentNavText]}>Cupons</Text>
        </TouchableOpacity>

        {/* Ler QR */}
        <TouchableOpacity
          onPress={goToLerQR}
          style={[styles.nav, activeRoute === 'LerQR' && styles.currentNav]}
        >
          <Image
            source={qrcodeIcon}
            style={[styles.imagesNav, { tintColor: activeRoute === 'LerQR' ? '#fff' : '#52443C' }]}
          />
          <Text style={[styles.navText, activeRoute === 'LerQR' && styles.currentNavText]}>Ler QR</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    fullNav: {
      flexDirection: 'row',
      backgroundColor: '#FCEAE2',
      borderRadius: 80,
      paddingHorizontal: 17,
      marginBottom: 42,
      marginHorizontal: 26,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    currentNav: {
      backgroundColor: '#8B4B26',
      borderRadius: 100,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nav: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagesNav: {
      width: 30,
      height: 30,
      borderRadius: 8,
      marginBottom: 4,
    },
    navText: {
      fontSize: 12,
      color: '#52443C',
    },
    currentNavText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

  export default BottomNavBar;

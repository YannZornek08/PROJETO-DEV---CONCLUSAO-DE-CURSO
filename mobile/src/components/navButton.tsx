import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../routes/app.routes';

const homeIcon = require('../assets/nav-icons/home.png');
const favIcon = require('../assets/nav-icons/star.png');
const cupomIcon = require('../assets/nav-icons/cupom.png');
const qrcodeIcon = require('../assets/nav-icons/qrcode.png');

const BottomNavBar: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route = useRoute();
  const activeRouteName = route.name; 

  const goToHome = () => navigation.navigate('Menu'); 
  const goToStatusPedido = () => navigation.navigate('StatusPedido');
  const goToCupons = () => navigation.navigate('Cupons');
  const goToLerQR = () => navigation.navigate('LerQR');

  return (
    <View style={styles.fullNav}>
      <TouchableOpacity
        onPress={goToHome}
        style={[styles.nav, activeRouteName === 'Home' && styles.currentNav]}
      >
        <Image source={homeIcon} style={styles.imagesNav} />
        <Text style={[styles.navText, activeRouteName === 'Home' && styles.currentNavText]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goToStatusPedido}
        style={[styles.nav, activeRouteName === 'StatusPedido' && styles.currentNav]}
      >
        <Image source={favIcon} style={styles.imagesNav} />
        <Text style={[styles.navText, activeRouteName === 'StatusPedido' && styles.currentNavText]}>Meu Pedido</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goToCupons}
        style={[styles.nav, activeRouteName === 'Cupons' && styles.currentNav]}
      >
        <Image source={cupomIcon} style={styles.imagesNav} />
        <Text style={[styles.navText, activeRouteName === 'Cupons' && styles.currentNavText]}>Cupons</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={goToLerQR}
        style={[styles.nav, activeRouteName === 'LerQR' && styles.currentNav]}
      >
        <Image source={qrcodeIcon} style={styles.imagesNav} />
        <Text style={[styles.navText, activeRouteName === 'LerQR' && styles.currentNavText]}>Ler QR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fullNav: { 
    flexDirection: "row", 
    backgroundColor: "#FCEAE2", 
    borderRadius: 80, 
    paddingHorizontal: 17, 
    marginBottom: 42, 
    marginHorizontal: 26, 
    justifyContent: 'space-between' 
  },
  currentNav: { 
    backgroundColor: '#f3cdbdff', 
    borderRadius: 100 
  },
  nav: { 
    padding: 10,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  imagesNav: { 
    width: 30, 
    height: 30, 
    borderRadius: 8,
    marginBottom: 4 
  },
  navText: {
    fontSize: 12,
    color: '#52443C', 
  },
  currentNavText: {
    color: '#8D4F28', 
    fontWeight: 'bold',
  },
});

export default BottomNavBar;
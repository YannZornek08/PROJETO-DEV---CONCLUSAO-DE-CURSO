import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface BackButtonProps {
  to?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to = 'Menu' }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate(to)}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // aumenta área clicável
    >
      <Image
        source={require('../assets/Voltar.png')}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute', 
    top: 16,
    left: 16,
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  icon: {
    width: 40,   
    height: 40,  
  },
});

export default BackButton;

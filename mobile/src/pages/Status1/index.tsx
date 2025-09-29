import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
} from "react-native";

const Pedidos: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ImageBackground
            source={require('../../assets/m00a02ov_expires_30_days.png')}
            resizeMode="cover"
            style={styles.banner}
          >
            <Text style={styles.greeting}>Pedidos</Text>
          </ImageBackground>

          <Image
            source={require('../..//assets/664rkec0_expires_30_days.png')}
            resizeMode="stretch"
            style={styles.absoluteImage}
          />
        </View>

        <Text style={styles.emptyText}>Não há nenhum pedido ainda...</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Pedidos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  header: {
    marginBottom: 200,
  },
  banner: {
    paddingTop: 80,
    paddingBottom: 24,
    marginBottom: 50,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 160,
  },
  absoluteImage: {
    position: "absolute",
    bottom: -120,
    left: -160,
    right: 28,
    height: 160,
    resizeMode: "contain",
  },
  emptyText: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginBottom: 260,
  },
});

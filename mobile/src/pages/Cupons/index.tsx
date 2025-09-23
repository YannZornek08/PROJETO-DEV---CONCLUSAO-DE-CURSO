import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes"

// IMAGENS DO NAV

const home = require('../../assets/nav-icons/home.png')
const fav = require('../../assets/nav-icons/star.png')
const cupom = require('../../assets/nav-icons/cupom.png')
const qrcode = require('../../assets/nav-icons/qrcode.png')

/////////////////

export default function Cupons() {
  const [textInput1, setTextInput1] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

   function Settings() {
    navigation.navigate("Settings")
  }

    function Carrinho () {
    navigation.navigate("Carrinho");
  }
  
  function Menu() {
    navigation.navigate("Menu");
  }

  function Cupons() {
    navigation.navigate("Cupons");
  }

  function  Status1() {
    navigation.navigate("Status1");
  }

  function LerQR() {
    navigation.navigate("LerQR");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
  
        <View style={styles.header}>
          <Text style={styles.greeting}>Bom dia, João.</Text>

  
          <View style={styles.searchContainer}>
             
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/lbafwrbc_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={styles.searchIcon}
            />
         
            <TextInput
              placeholder="O que busca?"
              value={textInput1}
              onChangeText={(text: string) => setTextInput1(text)}
              style={styles.searchInput}
            />
            <View style={{ flexDirection: "row" }}>
               <TouchableOpacity onPress={Carrinho}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/tt24czai_expires_30_days.png",
                }}
                
                resizeMode="stretch"
                style={styles.actionIcon}
              />
              </TouchableOpacity>

              <TouchableOpacity onPress={Settings}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/ub4jakho_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.actionIcon}
              />
              </TouchableOpacity>
            </View>
          </View>

     
          <View style={styles.filterWrapper}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={(e: GestureResponderEvent) => alert("Filtros clicado!")}
            >
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/7PVAoyURPb/wdj9268r_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.filterIcon}
              />
              <Text style={styles.filterText}>Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>

   
        <Text style={styles.couponTitle}>Seus cupons:</Text>
        <View style={styles.couponRow}>
        
          <View style={[styles.couponCard, { marginRight: 12 }]}>
            <Image
              source={{ uri: "https://img.icons8.com/ios-filled/100/8D4F28/ticket.png" }}
              style={styles.couponIcon}
            />
            <Text style={styles.couponText}>50% OFF</Text>
            <Text style={styles.couponDescription}>Desconto no App</Text>
            <TouchableOpacity
              style={styles.addCouponButton}
              onPress={(e: GestureResponderEvent) => alert("Cupom 1 adicionado!")}
            >
              <Text style={styles.addCouponText}>Adicionar</Text>
            </TouchableOpacity>
          </View>

         
          <View style={styles.couponCard}>
            <Image
              source={{ uri: "https://img.icons8.com/ios-filled/100/8D4F28/ticket.png" }}
              style={styles.couponIcon}
            />
            <Text style={styles.couponText}>30% OFF</Text>
            <Text style={styles.couponDescription}>Desconto no App</Text>
            <TouchableOpacity
              style={styles.addCouponButton}
              onPress={(e: GestureResponderEvent) => alert("Cupom 2 adicionado!")}
            >
              <Text style={styles.addCouponText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>

                {/* Bottom Nav */}
        {/* Em cada página, tirar o onPress da página que está */}

        <View style={styles.fullNav}>

          <TouchableOpacity onPress={Menu} style={styles.nav}>
            <Image
              source={home}
              style={styles.imagesNav}
              />
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={Status1} style={styles.nav}>
            <Image
              source={fav}
              style={styles.imagesNav}
              resizeMode="cover"
              />
            <Text>Status</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.currentNav, styles.nav]}>
            <Image
              source={cupom}
              style={styles.imagesNav}
              resizeMode="cover"
              />
            <Text>Cupons</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={LerQR} style={styles.nav}>
            <Image
              source={qrcode}
              style={styles.imagesNav}
              />
            <Text>Ler QR</Text>
          </TouchableOpacity>

        </View>
        {/* --------------------------- */}
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  scrollView: { flex: 1, backgroundColor: "#FFFFFF" },
  header: { backgroundColor: "#FFFFFF", paddingTop: 86, paddingBottom: 7 },
  greeting: {
    color: "#000000",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 26,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6E5DD",
    borderRadius: 28,
    padding: 4,
    marginBottom: 10,
    marginHorizontal: 26,
  },
  searchIcon: { width: 48, height: 48, marginRight: 4 },
  searchInput: { color: "#52443C", fontSize: 16, flex: 1, paddingVertical: 12 },
  actionIcon: { width: 48, height: 48 },
  filterWrapper: { alignItems: "center", paddingVertical: 8 },
  filterButton: {
    flexDirection: "row",
    backgroundColor: "#8D4F28",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 11,
  },
  filterIcon: { width: 20, height: 20, marginRight: 4 },
  filterText: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  couponTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 19,
    marginLeft: 26,
  },
  couponRow: { flexDirection: "row", marginBottom: 200, marginHorizontal: 26 },
  couponCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FDF8F5",
    borderStyle: "dashed",
    borderColor: "#8D4F28",
    borderRadius: 18,
    borderWidth: 2,
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  couponIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
    tintColor: "#8D4F28",
  },
  couponText: { color: "#000000", fontSize: 28, fontWeight: "bold" },
  couponDescription: {
    fontSize: 14,
    color: "#52443C",
    marginBottom: 12,
    textAlign: "center",
  },
  addCouponButton: {
    flexDirection: "row",
    backgroundColor: "#8D4F28",
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  addCouponText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
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
    borderRadius: 100,
  },
  nav: {
    padding: 10,
  },
  imagesNav: {
    margin: 'auto',
    width: 30,
    height: 30,
    borderRadius: 8
  }
});

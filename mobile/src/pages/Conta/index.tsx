import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const MinhaConta: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Ícone superior */}
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/6e2yz29n_expires_30_days.png",
          }}
          resizeMode="stretch"
          style={styles.image}
        />

        {/* Título */}
        <Text style={styles.title}>Minha conta</Text>

        {/* Foto de perfil + botão mudar foto */}
        <View style={styles.row}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/2gfwotnq_expires_30_days.png",
            }}
            resizeMode="stretch"
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => alert("Pressed!")}
          >
            <Text style={styles.buttonText}>Mudar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Nome + Email */}
        <View style={styles.section}>
          <View style={styles.rowCard}>
            <View style={styles.rowContent}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/lh8rw13i_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.icon}
              />
              <Text style={styles.textPrimary}>João Mateus</Text>
            </View>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/38i2s4kf_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={styles.iconSmall}
            />
          </View>

          <View style={styles.rowCard}>
            <View style={styles.rowContent}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/yu8ma48d_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.icon}
              />
              <Text style={styles.textPrimary}>email@email.com</Text>
            </View>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/1uhtnhui_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={styles.iconSmall}
            />
          </View>
        </View>

        {/* Log out + Deletar conta */}
        <View style={styles.section}>
          <View style={styles.rowCard}>
            <View style={styles.rowContent}>
              <Image
                source={require('../../assets/ws15r0ls_expires_30_days.png',
              )}
                resizeMode="stretch"
                style={styles.icon}
              />
              <Text style={styles.textPrimary}>Log out</Text>
            </View>
            <Image
              source={require('../../assets/faz03frq_expires_30_days.png',
              )}
              resizeMode="stretch"
              style={styles.iconSmall}
            />
          </View>

          <View style={[styles.rowCard, styles.deleteRow]}>
            <View style={styles.rowContent}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/3raz01uu_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.icon}
              />
              <Text style={styles.textDelete}>Deletar conta</Text>
            </View>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/ibRZmPwSqH/de9vxnu8_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={styles.iconSmall}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MinhaConta;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8F5",
    borderColor: "#D7C2B8",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 32,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 50,
  },
  button: {
    flex: 1,
    backgroundColor: "#8D4F28",
    borderRadius: 100,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 32,
  },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D7C2B8",
    borderWidth: 1,
    borderRadius: 12,
    paddingRight: 12,
    marginBottom: 12,
    backgroundColor: "#FFF",
  },
  rowContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  iconSmall: {
    width: 24,
    height: 24,
  },
  textPrimary: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#52443C",
  },
  textDelete: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  deleteRow: {
    backgroundColor: "#8D4F28",
  },
});

import { StyleSheet, Modal, Text, View, Alert } from "react-native";
import { Button } from "@/components/Button";
import { Styles } from "./style";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import axios from "axios"; // ou outra lib de requisição como fetch

export function Scan() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const qrCodeLock = useRef(false);

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();
      if (!granted) {
        return Alert.alert("Camera", "Você precisa habilitar o uso da câmera");
      }
      setModalIsVisible(true);
      qrCodeLock.current = false;
    } catch (error) {
      console.log(error);
    }
  }

  
  async function confirmDelivery(reservationId: string) {
    try {
      const response = await axios.patch(
        `https://food-share-api.onrender.com/apireservations/${reservationId}/confirm`, 
        { status: "ENTREGUE" }
      );
      if (response.status === 200) {
        Alert.alert("Entrega Confirmada", "A entrega foi confirmada com sucesso!");
      } else {
        Alert.alert("Erro", "Falha ao confirmar a entrega");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Ocorreu um erro ao confirmar a entrega.");
    }
  }

  function handleQRCodeRead(data: string) {
    setModalIsVisible(false);
    Alert.alert("QR Code", `Código lido: ${data}`);

    confirmDelivery(data);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Vamos verificar seu código!</Text>
      </View>

      <View style={styles.inputsContainer}>
        <Button title="Ler QR Code" onPress={handleOpenCamera} />
      </View>

      <Modal visible={modalIsVisible} style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrCodeLock.current) {
              qrCodeLock.current = true;
              setTimeout(() => {
                handleQRCodeRead(data); 
                qrCodeLock.current = false;
              }, 500);
            }
          }}
        />
        <View style={styles.cancelButtonContainer}>
          <Button title="Cancelar" onPress={() => setModalIsVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontSize: 20,
    marginBottom: 20,
  },
  inputsContainer: {
    marginBottom: 20,
  },
  cancelButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

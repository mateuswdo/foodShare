import { StyleSheet, Modal, Text, View, Alert } from "react-native";
import { Button } from "@/components/Button";
//import { Styles } from "./style"
import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";

export function Scan() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [permission, requestPermission] = useCameraPermissions()

  const qrCodeLock = useRef(false)

  async function handleOpenCamera() {
    try {

      const { granted } = await requestPermission()
      if (!granted) {
        return Alert.alert("Camera", "Você precisa habilitar o uso da camera")
      }
      setModalIsVisible(true)
      qrCodeLock.current = false
    } catch (error) {
      console.log(error)
    }
  }

  function handleQRCodeRead(data: string) {
    setModalIsVisible(false)
    Alert.alert("QR code", data)
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Vamos verificar seu código!</Text>
      </View>

      <View style={styles.inputsContainer}>
        <Button title="Ler QR code" onPress={handleOpenCamera} />
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


        <View>
          <Button title="Cancelar"
            onPress={() => setModalIsVisible(false)} />
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
  footer: {
    position: "absolute",
    bottom: 32,
    left: 32,
    right: 32,
  },
  title: {
    color: "black",
  },
  inputsContainer: {

  },
})

import { View, Text, Alert } from "react-native";
import { styles } from "./styles";
import { useAuth } from "@/hooks/useAuth";
import { AppNavigatorRoutesProps } from "@/routes/protected.routes";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@/components/Button";

export function Profile() {
  const { logout, user } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const handleLogout = async () => {
    Alert.alert("Confirmação", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Sair" onPress={handleLogout} />
      <Text>Profile</Text>
    </View>
  );
}

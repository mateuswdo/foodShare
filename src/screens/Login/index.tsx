import { Text, View } from "react-native";
import { styles } from "./style";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AuthNavigatorRoutesProps } from "@/routes/public.routes";
import { useNavigation } from "@react-navigation/native";

export function Login() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleCreateAccount() {
    navigation.navigate("register");
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Bem vindo de volta</Text>
        <Text style={styles.subTitle}>Por favor entre na sua conta aqui</Text>
      </View>

      <View style={styles.inputsContainer}>
        <Input
          icon={"mail"}
          formProps={{
            name: "",
            rules: undefined,
            shouldUnregister: undefined,
            defaultValue: undefined,
            control: undefined,
            disabled: undefined,
          }}
          inputProps={{
            placeholder: "Digite seu email",
          }}
        />

        <Input
          icon={"lock"}
          formProps={{
            name: "",
            rules: undefined,
            shouldUnregister: undefined,
            defaultValue: undefined,
            control: undefined,
            disabled: undefined,
          }}
          inputProps={{
            placeholder: "Digite sua senha",
          }}
        />

        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>

        <Button title="Entrar" />

        <View>
          <Text style={styles.questionText}>Ainda não tem conta?</Text>
          <Text style={styles.createPassword} onPress={handleCreateAccount}>
            Criar minha conta
          </Text>
        </View>
      </View>
    </View>
  );
}

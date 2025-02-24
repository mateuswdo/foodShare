import { Text, View } from "react-native";
import { styles } from "./style";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AuthNavigatorRoutesProps } from "@/routes/public.routes";
import { useNavigation } from "@react-navigation/native";

export function Register() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleCreateAccount() {
    navigation.navigate("register");
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Seja bem vindo!</Text>
        <Text style={styles.subTitle}>Por favor crie sua conta aqui</Text>
      </View>

      <View style={styles.inputsContainer}>
        <Input
          icon={"user"}
          formProps={{
            name: "",
            rules: undefined,
            shouldUnregister: undefined,
            defaultValue: undefined,
            control: undefined,
            disabled: undefined,
          }}
          inputProps={{
            placeholder: "Digite seu nome",
          }}
        />

        <Input
          icon={"user"}
          formProps={{
            name: "",
            rules: undefined,
            shouldUnregister: undefined,
            defaultValue: undefined,
            control: undefined,
            disabled: undefined,
          }}
          inputProps={{
            type: "custom",
            options: { mask: "999.999.999-99" },
            placeholder: "Digite seu CPF",
            keyboardType: "numeric",
            autoComplete: "off",
            autoCorrect: false,
            maxLength: 14,
          }}
        />

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
          icon={"key"}
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
            secureTextEntry: true,
          }}
        />

        <Input
          icon={"key"}
          formProps={{
            name: "",
            rules: undefined,
            shouldUnregister: undefined,
            defaultValue: undefined,
            control: undefined,
            disabled: undefined,
          }}
          inputProps={{
            placeholder: "Digite novamente sua senha",
            secureTextEntry: true,
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

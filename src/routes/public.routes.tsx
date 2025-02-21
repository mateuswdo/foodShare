
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";

type AuthRoutes = {
  login: undefined;
  register: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export default function PublicRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: true }}>
      
      <Screen
        name="login"
        component={Login}
        options={{
          headerTitle: "",
        }}
      />
      <Screen
        name="register"
        component={Register}
        options={{
          headerTitle: "",
        }}
      />
    </Navigator>
  );
}
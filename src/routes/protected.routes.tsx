import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Scan } from "@/screens/Scan";
import { Profile } from "@/screens/Profile";
import { Donation } from "@/screens/Donation";
import { Dashboard } from "@/screens/Dashboard";
import ReservaScreen from "@/screens/Reserve";

type ProtectedRoutes = {
  dashboard: undefined;
  donation: undefined;
  profile: undefined;
  scan: undefined;
  reservaScreen: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<ProtectedRoutes>;

const Tab = createBottomTabNavigator<ProtectedRoutes>();

export default function ProtectedRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          headerTitle: "",
        }}
      />

      <Tab.Screen
        name="scan"
        component={Scan}
        options={{
          headerTitle: "",
        }}
      />

      <Tab.Screen
        name="donation"
        component={Donation}
        options={{
          headerTitle: "",
        }}
      />
        <Tab.Screen
          name="reservaScreen"
          component={ReservaScreen}
          options={{
            headerTitle: "",
          }}
        />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerTitle: "",
        }}
      />
    </Tab.Navigator>
  );
}

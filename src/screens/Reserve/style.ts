import { StyleSheet } from "react-native";
import theme from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.light.background,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.fonts.Inter_600SemiBold,
    color: theme.colors.dark.primary,
    marginBottom: 20,
  },
  foodInfo: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: theme.colors.light.cardForeground,
    borderRadius: 10,
  },
  foodName: {
    fontSize: 20,
    fontFamily: theme.fonts.Inter_600SemiBold,
    color: theme.colors.dark.secondaryForeground,
    marginBottom: 10,
  },
  foodDescription: {
    fontSize: 16,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondaryForeground,
    marginBottom: 10,
  },
  foodExpiration: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondaryForeground,
    marginBottom: 10,
  },
  foodQuantity: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondaryForeground,
    marginBottom: 10,
  },
  foodDonorId: {
    fontSize: 14,
    fontFamily: theme.fonts.Inter_400Regular,
    color: theme.colors.dark.secondaryForeground,
  },
  form: {
    marginTop: 20,
  },
  errorText: {
    color: theme.colors.dark.destructive,
    fontSize: 14,
    marginBottom: 10,
  },
});

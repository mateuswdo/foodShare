import { Text, View } from "react-native";
import { styles } from "./style";

import { CardItem } from "@/@types/cardItem";

export function CardFood({ item }: { item: CardItem }) {
  const expirationDate = new Date(item.expiration_time).toLocaleDateString();

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.expiration}>Expira em: {expirationDate}</Text>
      <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
    </View>
  );
}

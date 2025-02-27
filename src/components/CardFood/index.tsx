import { Image, Text, View } from "react-native";
import { styles } from "./style";

import { CardItem } from "@/@types/cardItem";

export function CardFood({ item }: { item: CardItem }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.expiration}>
        Expira em: {item.expiration_time.toDateString()}
      </Text>
      <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
    </View>
  );
}

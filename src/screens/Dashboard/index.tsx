import { useState } from "react";
import { Text, View, FlatList, Image, TextInput } from "react-native";
import { styles } from "./style";
import { Input } from "@/components/Input";

interface CardItem {
  id: number;
  title: string;
  image: string;
}

const mockData: CardItem[] = [
  { id: 1, title: "Evento 1", image: "https://via.placeholder.com/150" },
  { id: 2, title: "Evento 2", image: "https://via.placeholder.com/150" },
  { id: 3, title: "Evento 3", image: "https://via.placeholder.com/150" },
  { id: 4, title: "Evento 4", image: "https://via.placeholder.com/150" },
];

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(mockData);

  function handleSearch(text: string) {
    setSearch(text);
    const filtered = mockData.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FOOD SHARE</Text>

    
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

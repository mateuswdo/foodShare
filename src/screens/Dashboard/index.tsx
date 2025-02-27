import { useState } from "react";
import { Text, View, FlatList, Image, TextInput } from "react-native";
import { styles } from "./style";
import { Input } from "@/components/Input";
import { foodsData } from "@/data/foods";
import { CardFood } from "@/components/CardFood";

export function Dashboard() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(foodsData);

  function handleSearch(text: string) {
    setSearch(text);
    const filtered = foodsData.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
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
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <CardFood item={item} />}
      />
    </View>
  );
}

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { Input } from '@/components/Input';
import { styles } from './style';

interface Food {
  id: string;
  name: string;
  quantity: number;
}
interface Vulnerable {
  id: string;
}

const ReservaScreen = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState('1');
  const [pickupDate, setPickupDate] = useState<string>('');  // Agora é uma string para o formato da data
  const [dateError, setDateError] = useState<string>('');  // Para mostrar um erro se a data estiver inválida
 
  
  useEffect(() => {
    axios.get('https://food-share-api.onrender.com/api/foods')
      .then(response => setFoods(response.data))
      .catch(error => console.error('Erro ao buscar alimentos:', error));
  }, []);

  function handleSearch(text: string) {
    
  }

  const handleReserve = async () => {
    // Validação da data
    if (!selectedFood) {
      Alert.alert('Erro', 'Selecione um alimento.');
      return;
    }
    
    if (!pickupDate) {
      setDateError('Por favor, informe a data de retirada.');
      return;
    }

    // Validar formato da data (simples validação)
    const isValidDate = Date.parse(pickupDate);
    if (isNaN(isValidDate)) {
      setDateError('Formato de data inválido. Use o formato YYYY-MM-DD.');
      return;
    }

    try {
      const response = await axios.post('https://food-share-api.onrender.com/api/reservas', {
        vulnerable_id: '1', // Adicionar ID do usuário autenticado
        food_id: selectedFood.id,
        food_quantity: parseInt(quantity, 10),
        pickup_date: pickupDate,  // Agora é a string de data no formato YYYY-MM-DD
      });
      Alert.alert('Sucesso', 'Reserva realizada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a reserva.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      
       <View style={styles.inputsContainer}>
              <Input
                icon={"search"}
                formProps={{
                  name: "search",
                  rules: undefined,
                  shouldUnregister: undefined,
                  defaultValue: undefined,
                  control: undefined,
                  disabled: undefined,
                }}
                inputProps={{
                  placeholder: "Buscar",
                  onChangeText: handleSearch,
                  value: '',
                }}
              />
            </View>

      <Text style={styles.subTitle}>Selecione um alimento:</Text>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            style={{ padding: 10, backgroundColor: selectedFood?.id === item.id ? '#D6C2B3' : '#D6C2B3' }}
            onPress={() => setSelectedFood(item)}>
            {item.name} - {item.quantity} disponíveis
          </Text>
        )}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
        keyboardType="numeric"
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
      />
      
      <TextInput
        style={{ borderWidth: 1, padding: 8, marginVertical: 10 }}
        placeholder="Data de Retirada (YYYY-MM-DD)"
        value={pickupDate}
        onChangeText={(text) => {
          setPickupDate(text);
          setDateError(''); 
        }}
      />
      {dateError ? <Text style={{ color: 'red' }}>{dateError}</Text> : null}

      <Button title="Confirmar Reserva" onPress={handleReserve} />
    </View>
  );
};

export default ReservaScreen;

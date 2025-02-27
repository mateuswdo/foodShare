import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert } from 'react-native';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { styles } from './style'; 
import { CardFood } from '@/components/CardFood';
import { storageAuthTokenGet } from '@/storage/storageAuthToken';
import { api } from '@/services/api';


const ReservaScreen = () => {
  const [foods, setFoods] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [pickupDate, setPickupDate] = useState('');
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    async function fetchFoods() {
      try {
        const response = await api.get('/api/foods');
        setFoods(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os alimentos disponíveis.');
      }
    }
    fetchFoods();
  }, []);

  const handleSearch = (text) => {
    const filteredFoods = foods.filter(food =>
      food.name.toLowerCase().includes(text.toLowerCase())
    );
    setFoods(filteredFoods);
  };

  const handleReserve = async () => {
    if (!selectedFood) {
      Alert.alert('Erro', 'Selecione um alimento.');
      return;
    }

    if (!pickupDate) {
      setDateError('Por favor, informe a data de retirada.');
      return;
    }

    const isValidDate = Date.parse(pickupDate);
    if (isNaN(isValidDate)) {
      setDateError('Formato de data inválido. Use o formato YYYY-MM-DD.');
      return;
    }

    try {
      const { token } = await storageAuthTokenGet();
      if (!token) {
        Alert.alert('Erro', 'Usuário não autenticado. Faça login novamente.');
        return;
      }

      const response = await api.post(
        '/api/reservas',
        {
          food_id: selectedFood.id,
          pickup_date,
          food_quantity: parseInt(quantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert('Sucesso', 'Reserva realizada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível realizar a reserva.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um alimento:</Text>
      <View style={styles.searchInput}>
        <Input
          icon="search"
          formProps={{ name: 'search' }}
          inputProps={{ placeholder: 'Buscar', onChangeText: handleSearch }}
        />
      </View>
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <CardFood item={item} onPress={() => setSelectedFood(item)} selected={selectedFood?.id === item.id} />
        )}
      />
      <View style={styles.form}>
        <Input
          icon="calendar"
          formProps={{ name: 'pickupDate' }}
          inputProps={{
            placeholder: 'Data de Retirada (YYYY-MM-DD)',
            onChangeText: (text) => {
              setPickupDate(text);
              setDateError('');
            },
            value: pickupDate,
          }}
        />

        <Input
          icon="shopping-cart"
          formProps={{ name: 'quantity' }}
          inputProps={{
            placeholder: 'Quantidade',
            onChangeText: (text) => setQuantity(text),
            value: quantity,
            keyboardType: 'numeric',
          }}
        />

        {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

        <Button title="Confirmar Reserva" onPress={handleReserve} />
      </View>
    </View>
  );
};

export default ReservaScreen;

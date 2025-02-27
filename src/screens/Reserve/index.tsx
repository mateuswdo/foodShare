import React, { useState } from 'react';
import { View, Text, TextInput,FlatList, Alert } from 'react-native';
import { Input } from '@/components/Input';
import { Button } from "@/components/Button";
import { styles } from './style'; 
import { foodsData } from '@/data/foods'; 
import { CardFood } from '@/components/CardFood'; 


const ReservaScreen = () => {
  const [foods, setFoods] = useState(foodsData); 
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState('1');
  const [pickupDate, setPickupDate] = useState<string>(''); 
  const [dateError, setDateError] = useState<string>('');

  function handleSearch(text: string) {
   
  }

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
      
      Alert.alert('Sucesso', 'Reserva realizada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar a reserva.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione um alimento:</Text>
      <View style={styles.searchInput}>
        <Input
          icon="search"
          formProps={{
            name: 'search',
            rules: undefined,
            shouldUnregister: undefined,
            defaultValue: undefined,
            control: undefined,
            disabled: undefined,
          }}
          inputProps={{
            placeholder: 'Buscar',
            onChangeText: handleSearch,
            value: '',
          }}
        />
      </View>
      <FlatList
            data={foods}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.row}
            renderItem={({ item }) => <CardFood item={item} />}
          />
          <View style={styles.form}>
              <Input
                icon="calendar"
                formProps={{
                  name: 'pickupDate',
                  rules: undefined,
                  shouldUnregister: undefined,
                  defaultValue: undefined,
                  control: undefined,
                  disabled: undefined,
                }}
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
                formProps={{
                  name: 'quantity',
                  rules: undefined,
                  shouldUnregister: undefined,
                  defaultValue: undefined,
                  control: undefined,
                  disabled: undefined,
                }}
                inputProps={{
                  placeholder: 'Quantidade',
                  onChangeText: (text) => setQuantity(text),
                  value: quantity,
                }}
              />
              
              {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}

              <Button title="Confirmar Reserva" onPress={handleReserve} />
          </View>
    </View>
  );
};

export default ReservaScreen;

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/base';
import axios from 'axios';
import { Card } from '@rneui/themed';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [searched, setSearched] = useState(false);


  const searchCountry = async () => {
    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${query}`
      );
      setResult(response.data || []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setResult([]);
        setSearched(false);
      } else {
        console.error(error);
      }
    }
    setSearched(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do país em inglês (ex: United States)"
        value={query}
        onChangeText={setQuery}
      />
      <Button
        onPress={searchCountry}
        title="Buscar"
        buttonStyle={{
          borderColor: 'rgba(78, 116, 289, 1)',
        }}
        type="outline"
        raised
        titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
        containerStyle={{
          marginVertical: 10,
        }}
      />

      {searched && result.length > 0 ? (
        result.map((result) => (
          <Card key={result.name.common} containerStyle={styles.card}>
            <View style={styles.cardContent}>
              <Image source={{ uri: result.flags.png }} style={styles.flagImage} />
              <View style={styles.titleContainer}>
                <Card.Title style={styles.title}>{result.name.common}</Card.Title>
                <Text style={styles.officialName}>{result.name.official}</Text>
              </View>
            </View>
            <Card.Divider />
            <Button
              onPress={() =>  navigation.navigate('Details', { country: result })}
              title="Mais informações"
              buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }}
            />
          </Card>
        ))

      ) : searched && (
        <Text>
          {result.length === 0 ? 'Nenhum resultado encontrado' : ''}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagImage: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  officialName: {
    fontSize: 14,
    textAlign: 'center',
  },
});


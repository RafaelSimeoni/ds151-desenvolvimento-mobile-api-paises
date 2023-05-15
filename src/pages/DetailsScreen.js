import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';

export default function DetailsScreen({ route }) {
  const { country } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: country.flags.png }} style={styles.flagImage} />
      <Text style={styles.imageSubtitle}>Bandeira</Text>
      {country.coatOfArms && (
        <View style={styles.alignCenter}>
          <Image style={styles.coatOfArms} source={{ uri: country.coatOfArms.png }} />
          <Text style={styles.imageSubtitle}>Brasão</Text>
        </View>
      )}

      <Text style={styles.countryName}>{country.name.common}</Text>
      <Text style={styles.countryOfficialName}>{country.name.official}</Text>
      <View style={styles.hr} />
      <View>
        <Text>
          <Text style={styles.key}>População:</Text> {country.population.toLocaleString()}
        </Text>
        <Text>
          <Text style={styles.key}>Moeda:</Text> {Object.values(country.currencies)[0].name}
        </Text>
        <Text>
          <Text style={styles.key}>Capital:</Text> {country.capital[0]}
        </Text>
        <View>
          <Text>
            <Text style={styles.key}>Línguas: </Text>
            {Object.keys(country.languages).map((key, index, array) => (
              <Text key={key}>
                {country.languages[key]}
                {index !== array.length - 1 ? ", " : ""}
              </Text>
            ))}
          </Text>
        </View>



      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  flagImage: {
    width: 200,
    height: 120,
  },
  imageSubtitle: {
    marginBottom: 20,
  },
  coatOfArms: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  countryName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  countryOfficialName: {
    fontSize: 18,
    marginBottom: 10,
  },
  key: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 1,
    width: '80%',
    marginVertical: 20,
  },
});

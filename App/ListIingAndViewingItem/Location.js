import React, { useState } from 'react';
import { View, TextInput, Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Header from '../SharedComponents/Header';

export default function Location() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 7.8731, // Latitude of Sri Lanka
    longitude: 80.7718, // Longitude of Sri Lanka
    latitudeDelta: 6.5, // Delta values adjusted to display the entire Sri Lanka map
    longitudeDelta: 6.5,
  });
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearch = () => {
    // You can use a geocoding service (e.g., Google Maps Geocoding API) to convert the searchLocation to coordinates
    // For simplicity, we'll directly set the mapRegion to a predefined location here
    // Replace the following coordinates with the coordinates obtained from the geocoding service
    setMapRegion({
      latitude: 6.9271, // Example latitude of the searched location
      longitude: 79.8612, // Example longitude of the searched location
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    });
  };

  return (
    <><Header/>
    <View style={styles.container}>
      <TextInput
        placeholder="Enter location Name"
        value={searchLocation}
        onChangeText={(text) => setSearchLocation(text)}
        style={styles.input}
        onSubmitEditing={handleSearch}
      />

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={mapRegion}
      ></MapView>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  input: {
    padding: 15,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 20,
    width: Dimensions.get('screen').width * 0.8,
    borderRadius: 10,
  },
  map: {
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.5,
    borderRadius: 20,
  },
});

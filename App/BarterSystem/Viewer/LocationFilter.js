import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LocationFilter = ({ locations, selectedLocation, onLocationChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by Location:</Text>
      <Picker
        selectedValue={selectedLocation}
        onValueChange={onLocationChange}
        style={styles.picker}
      >
        {locations.map((location, index) => (
          <Picker.Item key={index} label={location} value={location} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    //margin: 10,
    backgroundColor: '#e9fce1',
    borderRadius: 30,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'green',
    marginLeft: 15,
  },
  picker: {
    height: 40,
    fontSize: 16,
    flex: 1,

    marginRight: 10,
  },
});

export default LocationFilter;

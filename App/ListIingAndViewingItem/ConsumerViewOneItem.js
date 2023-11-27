import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Header from '../SharedComponents/Header';

const ConsumerViewOneItem = ({ route, navigation }) => {
  const { item } = route.params;

  const handleCompare = () => {
    navigation.navigate('Compare', { itemName: item.itemName }); // Passing itemName as a parameter
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.header}>ITEM DETAILS</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detail}>
            <Text style={styles.bold}>Item Name:</Text> {item.itemName}
          </Text>
          <View style={styles.separator} />
          <Text style={styles.detail}>
            <Text style={styles.bold}>Quantity:    </Text> {item.quantity}
          </Text>
          <View style={styles.separator} />
          <Text style={styles.detail}>
            <Text style={styles.bold}>Price:          </Text> ${item.price}
          </Text>
          <View style={styles.separator} />
          <Text style={styles.detail}>
            <Text style={styles.bold}>Address:     </Text> {item.address}
          </Text>
          <View style={styles.separator} />
          <Text style={styles.detail}>
            <Text style={styles.bold}>Contact Number:</Text> {item.contactNumber}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Compare" onPress={handleCompare} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: '#3AB918',
    marginTop: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 50,
  },
});

export default ConsumerViewOneItem;

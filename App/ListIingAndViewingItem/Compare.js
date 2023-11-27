import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { dbF } from '../Firebase/FirebaseConfig';
import Header from '../SharedComponents/Header';

function Compare({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(dbF, 'item'));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setItems(data);
    };
    fetchItems();
  }, []);

  const renderItems = ({ item }) => (
    <View style={styles.item}>
      <Text>
        <Text style={styles.bold}>Item Name:</Text> {item.itemName}
      </Text>
      <Text>
        <Text style={styles.bold}>Quantity:</Text> {item.quantity}
      </Text>
      <Text>
        <Text style={styles.bold}>Price:</Text> {item.price}
      </Text>
      <Text>
        <Text style={styles.bold}>Address:</Text> {item.address}
      </Text>
      <Text>
        <Text style={styles.bold}>Contact Number:</Text> {item.contactNumber}
      </Text>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate('CompareTwo', { item })}
      >
        <Text style={styles.buttonText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.header}>ITEM LIST</Text>
        <FlatList
          data={items}
          renderItem={renderItems}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  item: {
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#000',
    padding: 20,
    borderRadius: 5,
    width: '100%',
  },
  viewButton: {
    backgroundColor: '#3AB918',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: 100,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Compare;

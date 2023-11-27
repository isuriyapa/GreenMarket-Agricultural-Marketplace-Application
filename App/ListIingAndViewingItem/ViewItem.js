import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { dbF } from '../Firebase/FirebaseConfig';
import Header from '../SharedComponents/Header';

function ViewItem({ navigation }) {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filter = (item) => {
    return item.itemName.toLowerCase().includes(searchTerm.toLowerCase());
  };


  const renderItems = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.variableName}>Item Name: </Text>
        <Text>{item.itemName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.variableName}>Quantity: </Text>
        <Text>{item.quantity}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.variableName}>Price: </Text>
        <Text>{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.viewButton}
        onPress={() => navigation.navigate('ConsumerViewOneItem', { item })}
      >
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
    </View>
  );
  

  return (
    <><Header/>
    <View style={styles.container}>
      <Text style={styles.header}>ITEM LIST</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Enter Item Name"
        onChangeText={(text) => setSearchTerm(text)}
        value={searchTerm}
      />
      <FlatList
        data={items.filter(filter)}
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
    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#000',
    padding: 20,
    borderRadius: 5,
    width: '100%',
  },
  variableName: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#ccb645', //#3AB918
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
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
    width: '60%',
  },
});

export default ViewItem;

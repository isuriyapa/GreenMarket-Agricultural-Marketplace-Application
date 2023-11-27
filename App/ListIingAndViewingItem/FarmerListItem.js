import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { dbF } from '../Firebase/FirebaseConfig';
import Header from '../SharedComponents/Header';

function FarmerListItem({ navigation }) {
  const [items, setItems] = useState([]); // Assuming items state is properly initialized
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    id: '',
    itemName: '',
    quantity: '',
    price: '',
    address: '',
    contactNumber: '',
    //image: '',
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(dbF, 'item'));
        const data = [];
        querySnapshot.forEach((doc) => {
          const itemData = doc.data();
          itemData.id = doc.id; // Include the document ID
          data.push(itemData);
        });
        setItems(data);
      } catch (error) {
        console.error('Error fetching items: ', error);
      }
    };
    fetchItems();
  }, []);

  const handleUpdate = (item) => {
    setUpdatedItem({ ...item });
    setUpdateModalVisible(true);
  };

  // Function to handle the update of the item
  const handleItemUpdate = async () => {
    try {
      // Assuming 'updatedItem.id' is the ID of the item to be updated
      const itemRef = doc(dbF, 'item', updatedItem.id);
      await updateDoc(itemRef, {
        itemName: updatedItem.itemName,
        quantity: updatedItem.quantity,
        price: updatedItem.price,
        address: updatedItem.address,
        contactNumber: updatedItem.contactNumber,
        //image: updatedItem.image,
        // Update other fields accordingly
      });
      // Optional: You can fetch the updated items again from the database to refresh the list
      const querySnapshot = await getDocs(collection(dbF, 'item'));
      const data = [];
      querySnapshot.forEach((doc) => {
        const itemData = doc.data();
        itemData.id = doc.id; // Include the document ID
        data.push(itemData);
      });
      setItems(data);
    } catch (error) {
      console.error('Error updating item: ', error);
    }
    setUpdateModalVisible(false);
  };

  const handleDelete = async (id) => {
    try {
      const confirmation = await new Promise((resolve, reject) =>
        Alert.alert(
          'Confirm Delete',
          'Are you sure you want to delete this item?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => resolve(false),
            },
            {
              text: 'OK',
              onPress: () => resolve(true),
            },
          ],
          { cancelable: false }
        )
      );

      if (confirmation) {
        await deleteDoc(doc(dbF, 'item', id));
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item: ', error);
    }
  };

  const renderItems = ({ item }) => (
    <View style={styles.item}>
      <Text><Text style={styles.boldText}>Item Name:</Text> {item.itemName}</Text>
      <Text><Text style={styles.boldText}>Quantity:</Text> {item.quantity}</Text>
      <Text><Text style={styles.boldText}>Price:</Text> {item.price}</Text>
      <Text><Text style={styles.boldText}>Address:</Text> {item.address}</Text>
      <Text><Text style={styles.boldText}>Contact Number:</Text> {item.contactNumber}</Text>
     
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => handleUpdate(item)}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <><Header/>
    <View style={styles.container}>
      <Text style={styles.header}>ITEM LIST</Text>
      <FlatList
        data={items}
        renderItem={renderItems}
        keyExtractor={(item) => item.id}
      />

      {/* Update Modal */}
      <Modal
        visible={updateModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>UPDATE ITEM</Text>
            {/* TextInputs for each field to update the item */}
            <TextInput
              style={styles.input}
              placeholder="Item Name"
              value={updatedItem.itemName}
              onChangeText={(text) =>
                setUpdatedItem({ ...updatedItem, itemName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              value={updatedItem.quantity}
              onChangeText={(text) =>
                setUpdatedItem({ ...updatedItem, quantity: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={updatedItem.price}
              onChangeText={(text) =>
                setUpdatedItem({ ...updatedItem, price: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={updatedItem.address}
              onChangeText={(text) =>
                setUpdatedItem({ ...updatedItem, address: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              value={updatedItem.contactNumber}
              onChangeText={(text) =>
                setUpdatedItem({ ...updatedItem, contactNumber: text })
              }
            />
            {/* Add TextInput components for other fields */}
            {/* Button to update the item */}
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleItemUpdate}
            >
              <Text style={styles.buttonText}>Update Item</Text>
            </TouchableOpacity>
            {/* Button to cancel the update operation */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setUpdateModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <Button title="Back" onPress={() => navigation.goBack()} /> */}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#3AB918',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 140,
    height: 45,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 10,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 140,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  item: {
    marginBottom: 20,
    borderWidth: 1, // border width
    borderColor: '#000', // border color
    padding: 10, // padding around the item
    borderRadius: 5, // border radius
    width: 390,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 140,
    height: 45,
  },
  boldText: {
    fontWeight: 'bold',
  },
  // image: {
  //   width: 200,
  //   height: 200,
  //   resizeMode: 'cover',
  //   marginBottom: 10, // Add margin at the bottom
  // },
});

export default FarmerListItem;

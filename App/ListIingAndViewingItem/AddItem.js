import { React,  useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Import the launchImageLibrary function
import { collection, addDoc } from "firebase/firestore";
import { dbF } from '../Firebase/FirebaseConfig';
import Header from '../SharedComponents/Header';
import * as ImagePicker from 'expo-image-picker';

function AddItem({ navigation }) {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [image, setImage] = useState(null);

  // Assuming this function is triggered by a button click or any other relevant action
  const handleImageUpload = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Permission to access camera roll is required!');
        return;
      }
      const pickerResult = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1 });
      if (!pickerResult.canceled) {
        const source = { uri: pickerResult.assets[0].uri };
        // Upload the image to the server or perform further processing
        console.log('Image selected:', source);
      }
    } catch (error) {
      console.log('Error while picking an image:', error);
    }
  };

  function validateInputs() {
    if (!itemName || !quantity || !price || !address || !contactNumber) {
      Alert.alert('Required', 'Please fill in all the fields');
      return false;
    }
    if (!isNaN(itemName)) {
      Alert.alert('Invalid Input', 'Item name should be a text');
      return false;
    }
    if (isNaN(quantity)) {
      Alert.alert('Invalid Input', 'Quantity should be a number');
      return false;
    }
    if (isNaN(price)) {
      Alert.alert('Invalid Input', 'Price should contain only numbers');
      return false;
    }
    if (address.length === 0) {
      Alert.alert('Invalid Input', 'Address should not be empty');
      return false;
    }
    if (!/^\d{10}$/.test(contactNumber)) {
      Alert.alert('Invalid Input', 'Please enter 10 digits for the contact number');
      return false;
    }
    return true;
  }

  function create() {
    if (validateInputs()) {
      // submit data
      addDoc(collection(dbF, "item"), {
        itemName: itemName,
        quantity: quantity,
        price: price,
        address: address,
        contactNumber: contactNumber,
        image: image,
      }).then(() => {
        // Data saved successfully
        console.log('data submitted');
        // Navigate to ViewItem screen after data submission
        navigation.navigate('FarmerListItem');
      }).catch((error) => {
        // The write failed...
        console.log(error);
      });
    }
  }

  return (
    <><Header/>
    <View style={styles.formContainer}>
    <Text style={styles.listProductLabel}>ListProduct</Text>

      <StatusBar style="auto" />

      <TextInput
        value={itemName}
        onChangeText={(text) => setItemName(text)}
        placeholder="itemName"
        style={styles.textBoxes}
      />
      <TextInput
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
        placeholder="quantity"
        style={styles.textBoxes}
      />
      <TextInput
        value={price}
        onChangeText={(text) => setPrice(text)}
        placeholder="price"
        style={styles.textBoxes}
      />
      <TextInput
        value={address}
        onChangeText={(text) => setAddress(text)}
        placeholder="address"
        style={styles.textBoxes}
      />
      <TextInput
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
        placeholder="contactNumber"
        style={styles.textBoxes}
      />

      {/* Image Upload */}
      <TouchableOpacity style={styles.imageUploadContainer} onPress={handleImageUpload}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.uploadText}>Upload Image</Text>
        )}
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button onPress={create} title="Submit" />  
      </View>

      
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    marginBottom: 20,
    alignItems: 'center', // Added to center the form
    marginLeft: 40,
    marginTop: 20,
    
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textBoxes: {
    width: '80%',
    fontSize: 18,
    padding: 15,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 9,
  },
  imageUploadContainer: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  buttonContainer: {
    backgroundColor: '#3AB918',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  listProductLabel: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000000',
  },
});



export default AddItem;





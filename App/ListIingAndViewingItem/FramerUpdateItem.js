// import React, { useState } from 'react';
// import { StatusBar, StyleSheet, Text, View, TextInput, Button } from 'react-native';
// import { collection, addDoc } from "firebase/firestore";
// import { db } from './Config';

// function AddItem({ navigation }) {
//   const [itemName, setItemName] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [price, setPrice] = useState('');
//   const [address, setAddress] = useState('');
//   const [contactNumber, setContactNumber] = useState('');

//   function create() {
//     // submit data
//     addDoc(collection(db, "item"), {
//       itemName: itemName,
//       quantity: quantity,
//       price: price,
//       address: address,
//       contactNumber: contactNumber,
//     }).then(() => {
//       // Data saved successfully
//       console.log('data submitted');
//       // Navigate to ViewItem screen after data submission
//       navigation.navigate('ViewItem');
//     }).catch((error) => {
//       // The write failed...
//       console.log(error);
//     });
//   }

//   return (
//     <View style={styles.container}>
//       <Text>ListProduct</Text>
//       <StatusBar style="auto" />

//       <TextInput
//         value={itemName}
//         onChangeText={(text) => setItemName(text)}
//         placeholder="itemName"
//         style={styles.textBoxes}
//       />
//       <TextInput
//         value={quantity}
//         onChangeText={(text) => setQuantity(text)}
//         placeholder="quantity"
//         style={styles.textBoxes}
//       />
//       <TextInput
//         value={price}
//         onChangeText={(text) => setPrice(text)}
//         placeholder="price"
//         style={styles.textBoxes}
//       />
//       <TextInput
//         value={address}
//         onChangeText={(text) => setAddress(text)}
//         placeholder="address"
//         style={styles.textBoxes}
//       />
//       <TextInput
//         value={contactNumber}
//         onChangeText={(text) => setContactNumber(text)}
//         placeholder="contactNumber"
//         style={styles.textBoxes}
//       />

//       <Button onPress={create} title="Submit" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textBoxes: {
//     width: '90%',
//     fontSize: 18,
//     padding: 12,
//     borderColor: 'gray',
//     borderWidth: 0.2,
//     borderRadius: 10
//   }
// });

// export default AddItem;



// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import {TextInput} from 'react-native-web';
// import {useState} from 'react/cjs/react.development';
// import {collection, doc, setDoc, addDoc } from "firebase/firestore";
// import {db} from './components/config';

// function AddItem({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Screen 1</Text>
//       <Button
//         title="Go to Screen 2"
//         onPress={() => navigation.navigate('ViewItem')}
//       />
//     </View>
//   );
// }

// export default function App() {
//     const [itemName, setItemName] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [price, setPrice] = useState('');
//     const [address, setAddress] = useState('');
//     const [contactNumber, setContactNumber] = useState('');


//     function create(){

//         //submit data
//         addDoc(collection(db, "item"), {
//             itemName: itemName,
//             quantity: quantity,
//             price: price,
//             address: address,
//             contactNumber: contactNumber,
//           }).then(()=>{
//             //Data saved successfully
//             console.log('data submitted');
//           }).catch((error)=>{
//             //The write failed...
//             console.log(error);
//           });;

//     }

//   return (
//     <View style={styles.container}>
//       <Text>ListProduct</Text>
//       <StatusBar style="auto" />

//       <TextInput value={itemName} onChangeText={(itemName)=>{setItemName(itemName)}} placeholder="itemName" style={styles.textBoxes}></TextInput>
//       <TextInput value={quantity} onChangeText={(quantity)=>{setQuantity(quantity)}} placeholder="quantity" style={styles.textBoxes}></TextInput>
//       <TextInput value={price} onChangeText={(price)=>{setPrice(price)}} placeholder="price" style={styles.textBoxes}></TextInput>
//       <TextInput value={address} onChangeText={(address)=>{setAddress(address)}} placeholder="address" style={styles.textBoxes}></TextInput>
//       <TextInput value={contactNumber} onChangeText={(contactNumber)=>{setContactNumber(contactNumber)}} placeholder="contactNumber" style={styles.textBoxes}></TextInput>

//       <button onClick={create}>Submit</button>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textBoxes: {
//     widith: '90%',
//     fontSize: 18,
//     padding: 12,
//     borderColor: 'gray',
//     borderWidith: 0.2,
//     borderRadius: 10
//   }
// });

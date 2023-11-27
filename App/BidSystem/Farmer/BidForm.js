import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, TouchableHighlight } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { getDatabase, ref as databaseRef, push, get, set } from 'firebase/database';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { app } from '../../Firebase/FirebaseConfig';
import { getStorage, uploadBytes } from "firebase/storage";

import { KeyboardAvoidingView } from 'react-native';
import { Alert } from 'react-native';

const units = ['kg', 'g', 'L', 'ml', 'units', 'other'];

export default function PostNewRequest() {
    const [postTitle, setPostTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState(units[0]); // Initialize with the first unit
    const [time, setTime] = useState('');
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);


    ////////////
    // const [category, setCategory] = useState('');
    const [productName, setProductName] = useState('');
    // const [quantity, setQuantity] = useState('');
    // const [unit, setUnit] = useState('');
    const [initialPrice, setInitialPrice] = useState(0);
    const [initialPricem, setInitialPricem] = useState(0);
    // const [description, setDescription] = useState('');
    // const [time, setTime] = useState('');
    // const [image, setImage] = useState(null);
    const [selectedUri, setSelectedUri] = useState(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false); // set false after set condition 
    const [isFormValidMy, setIsFormValidMy] = useState(false);

    const times = [

        '20 mins',
        '40 mins',
        '60 mins',
        '1 hour',
        '2 hours',
        '5 hours',
        // Add more times here
    ];

    const showSuccessModal = () => {
        setModalVisible(true);
    };

    const [userId, setUserId] = useState(null);
    const [userLog, setUserLog] = useState(null);

    async function fetchData() {
        const userUID = await AsyncStorage.getItem('loggedInUserId');
        console.log('USER ID: ', userUID);
        setUserId(userUID);
    }

    const database = getDatabase(app);
    const userRef = databaseRef(database, `users/${userId}`);

    function dataFetch() {
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // The data exists, and you can access it using snapshot.val()
                    const data = snapshot.val();
                    setUserLog(data);
                    console.log(data);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    useEffect(() => {
        const isValid =
            category !== '' &&
            initialPrice !== '' &&
            description.trim() !== '' &&
            quantity.trim() !== '' &&
            time !== '' &&
            imageURL !== null;

        setIsFormValid(isValid);
    }, [userId, category, description, imageURL, time]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
            dataFetch();
        }, [userId, image, imageURL])
    );

    // Inside your component:
    const ensurePermissions = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
        }
    };

    const handleImageUpload = async () => {
        ensurePermissions();
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1], // Adjust the aspect ratio as needed
        });

        if (result.canceled) {
            console.log('Image selection was cancelled.');
        }
        else if (result.assets && result.assets.length > 0) {
            try {
                // Check if the result contains any assets

                const asset = result.assets[0];
                const uri0 = asset.uri;

                setImage(uri0);
                setSelectedUri(uri0);

                const { uri } = await FileSystem.getInfoAsync(uri0);


                // Upload the image to Firebase Storage
                /*const response = await fetch(uri);
                const blob = await response.blob();
                const storageRefs = storageRef(storage, `images/${userId}/${Date.now()}.jpg`);
                const uploadTask = uploadString(storageRefs, blob, 'data_url');
                */
                const blob = await new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onload = () => {
                        resolve(xhr.response);
                    };
                    xhr.onerror = (e) => {
                        reject(new TypeError('Network request failed.'));
                    };
                    xhr.responseType = 'blob';
                    xhr.open('GET', uri, true);
                    xhr.send(null);
                });

                const fileName = uri0.substring(uri0.lastIndexOf('/') + 1);
                //const ref = firebase.storage().ref().child(fileName);

                const storage = getStorage(app);
                const ref = storageRef(storage, fileName);

                await uploadBytes(ref, blob);
                //await ref.put(blob);
                //Alert.alert('Photo uploaded');

                // Wait for the upload to complete
                //await uploadTask;

                // Get the URL of the uploaded image
                const imageUrl = await getDownloadURL(ref);

                // Set the image URL in the state
                setImageURL(imageUrl);
                //setImage(null);
            }

            catch (error) {
                console.error('Error uploading image:', error);
            }
        }
        else {
            console.error('No assets found in the image picker result.');
        }
    };

    // Get the current date and time
    const currentDate = new Date();

    const timestamp = currentDate.getTime();

    const resetForm = () => {
        setProductName('');
        setInitialPrice(0);
        setInitialPricem(0);
        setSelectedUri(null);
        setCategory('');
        setDescription('');
        setQuantity('');
        setUnit('');
        // Reset other form fields here
    }

    const handlePost = () => {

        // const isValidMy =
        // category !== '' &&
        // initialPrice !== '' &&
        // description.trim() !== '' &&
        // quantity.trim() !== '' &&
        // time !== '' &&
        // imageURL !== null;

        setIsFormValidMy(
            category !== '' &&
            initialPrice !== '' &&
            productName !== '' &&
            imageURL !== null);

        if (isFormValidMy) {


            // Assuming initialPrice is a string representing the input value
            const initialPriceString = initialPrice; // You get this value from your TextInput

            // Validate if it's a valid number (for example, you can check if it's not empty and is a valid number)
            if (!isNaN(initialPriceString)) {
                // Convert it to a number (use `parseFloat` for decimal numbers or `parseInt` for integers)
                const initialPricem = parseFloat(initialPriceString); // Use parseFloat for decimal numbers
                setInitialPricem(initialPricem);
                console.log(initialPrice);

                // Now, you can store the initialPrice in your database as a number
                // Send `initialPrice` to your database update/insert logic
            } else {
                // Handle the case where the input is not a valid number
                console.error('Invalid input. Please enter a valid number.');
            }

            // Create a new request object with the form data and user's data


            const newRequest = {
                category,
                productName,
                quantity,
                unit,
                time,
                initialPrice: initialPricem,
                currentPrice: initialPricem,
                description,
                userId, // The ID of the logged-in user
                userLog, // User's data
                image: imageURL, // Include the selected image URI
                status: 'open',
                timestamp,
                bidData: 'Null'
            };

            // Get a reference to the 'BarterRequests' database location
            const barterRequestsRef = databaseRef(database, 'bids');

            // Push the new request data to the database
            push(barterRequestsRef)
                .then((newRequestRef) => {
                    // Now, set the data for the new request under the generated key
                    set(newRequestRef, newRequest)
                        .then(() => {
                            console.log('Request posted successfully!');
                            // You can also navigate to a different screen or reset the form here.
                            showSuccessModal();

                            // setProductName(''); 
                            // setInitialPrice(0);
                            // setInitialPricem(0);
                            // setSelectedUri(null);
                            // setCategory('');
                            // setDescription('');
                            // setQuantity('');
                            // setUnit('');


                        })
                        .catch((error) => {
                            console.error('Error setting request data:', error);
                        });
                })
                .catch((error) => {
                    console.error('Error pushing new request:', error);
                });
        } else {
            Alert.alert('Missing Information', 'Please fill in all required fields.');
            return;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <View style={styles.container}>
                <TouchableOpacity style={{ padding: 4, backgroundColor:'white' }} onPress={resetForm}>
                            </TouchableOpacity>
                    <Picker
                        selectedValue={category}
                        onValueChange={(value) => setCategory(value)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select Category" value="" />
                        <Picker.Item label="Spices" value="Spices" />
                        <Picker.Item label="Others" value="Others" />
                    </Picker>

                    <TextInput
                        style={styles.input}
                        placeholder="Product Name"
                        value={productName}
                        onChangeText={(text) => setProductName(text)}
                    />

                    <View style={styles.quantityUnitContainer}>
                        <TextInput
                            style={[styles.input, styles.quantityInput]}
                            placeholder="Quantity"
                            value={quantity}
                            keyboardType="numeric"
                            onChangeText={(text) => setQuantity(text)}
                        />

                        {/* <Picker
          style={[styles.input, styles.unitInput]}
          selectedValue={unit}
          onValueChange={(value) => setUnit(value)}
        >
          <Picker.Item label="Select Unit" value="" />
          <Picker.Item label="Kg" value="kg" />
          <Picker.Item label="Lb" value="lb" />
          
        </Picker> */}
                        <Picker
                            style={styles.unitInput}
                            selectedValue={unit}
                            onValueChange={itemValue => setUnit(itemValue)}>
                            {units.map((unit, index) => (
                                <Picker.Item key={index} label={unit.length > 10 ? unit.substring(0, 10) + '...' : unit} value={unit} />
                            ))}
                        </Picker>

                    </View>

                    {/* <Picker
        selectedValue={time}
        onValueChange={(value) => setTime(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select Time" value="" />
        <Picker.Item label="5 min" value="5 min" />
        <Picker.Item label="10 min" value="10 min" />
      </Picker> */}

                    {/* Time Dropdown */}
                    {/* <Picker
                        style={styles.dropdown}
                        selectedValue={time}
                        onValueChange={itemValue => setTime(itemValue)}>
                        <Picker.Item label="Select Time" value="" />
                        {times.map((time, index) => (
                            <Picker.Item key={index} label={time} value={time} />
                        ))}
                    </Picker> */}

                    <TextInput
                        style={styles.input}
                        placeholder="Initial Price"
                        keyboardType="numeric"
                        value={initialPrice}
                        onChangeText={(text) => setInitialPrice(text)}
                    />

                    <TextInput
                        style={[styles.input, styles.descriptionInput]}
                        placeholder="Description"
                        multiline
                        numberOfLines={4}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />

                    {/* <TouchableOpacity
                        style={{ backgroundColor: '#3498db', padding: 15, borderRadius: 10 }}
                        onPress={() => { handleCreateBid() }}
                    >
                        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Create Bid</Text>
                    </TouchableOpacity> */}

                    {/* <View style={{ flex: 1, backgroundColor: '#567', alignItems: 'center', justifyContent: 'center' }}>
        {selectedUri ? (
          <Image source={{ uri: selectedUri }} style={{ width: 200, height: 200 }} />
        ) : (
            <TouchableHighlight onPress={pickImage}>
            <Text>Select an Image</Text>
          </TouchableHighlight>
        )}
        
        <Button title="Upload Image" onPress={uploadImage} disabled={!selectedUri} />
      </View> */}

                    {/* Image Upload */}
                    <View style={styles.imageUploadContainer}>
                        {/* <TouchableOpacity
                            style={{ backgroundColor: '#3498db', padding: 10, marginTop: 25, borderRadius: 10 }}
                            onPress={handleImageUpload}>
                            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Upload Image</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ flex: 1, backgroundColor: '#567', alignItems: 'center', justifyContent: 'center', marginTop: 24 }}>
                        {selectedUri ? (
                            <Image source={{ uri: selectedUri }} style={{ width: 200, height: 200 }} />
                        ) : (
                            <TouchableHighlight onPress={handleImageUpload}>
                                <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center', padding: 15, paddingHorizontal: 60 }}>Select an Image</Text>
                            </TouchableHighlight>
                        )}
                    </View>
                    <TouchableOpacity
                        style={{ backgroundColor: '#3498db', padding: 15, marginTop: 60, borderRadius: 10 }}
                        onPress={handlePost}
                    // disabled={!isFormValid}
                    >
                        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Post</Text>
                    </TouchableOpacity>
                </View>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ fontSize: 18 }}>Post successfully published!</Text>
                            <TouchableOpacity style={{ marginTop: 50 }} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalViewButton}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </KeyboardAvoidingView>
        </ScrollView>
    );


}

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    quantityUnitContainer: {
        flexDirection: 'row',
        marginBottom: 0,
    },
    quantityInput: {
        flex: 1,
        marginRight: 5,
    },
    unitInput: {
        flex: 1,
        marginLeft: 5,
    },
    descriptionInput: {
        height: 80,
        textAlignVertical: 'top', // align text to the top in multiline input
        padding: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 100, // Add some padding to the bottom to make sure the button is visible
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: '80%',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
    },
    modalViewButton: {
        fontSize: 16,
        color: 'white',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
});
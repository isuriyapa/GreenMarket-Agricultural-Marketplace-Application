// import React, { useState, useEffect, useCallback } from 'react';
// import { useFocusEffect } from '@react-navigation/native';
// import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
// import { RadioButton } from 'react-native-paper'; // Import RadioButton from 'react-native-paper'
// import { Picker } from '@react-native-picker/picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// //import { ImagePicker } from 'expo-image-picker';
// import * as ImagePicker from 'expo-image-picker';

// import { getDatabase, ref as databaseRef, push, get, set } from 'firebase/database';
// import { getDownloadURL, ref as storageRef, uploadString } from 'firebase/storage';
// import { app, storage } from '../../Firebase/FirebaseConfig';

// import { KeyboardAvoidingView } from 'react-native';
// import Colors from '../../SharedComponents/Colors';

// const units = ['kg', 'g', 'L', 'ml', 'units', 'other'];

// export default function PostNewRequest() {
//     const [postType, setPostType] = useState('need');
//     const [postTitle, setPostTitle] = useState('');
//     const [category, setCategory] = useState('');
//     const [description, setDescription] = useState('');
//     const [quantity, setQuantity] = useState('');
//     const [unit, setUnit] = useState(units[0]); // Initialize with the first unit
//     const [district, setDistrict] = useState('');
//     const [image, setImage] = useState(null);

//     const districts = [
//         'Galle',
//         'Matara',
//         'Hambantota'
//         // Add more districts here
//     ];

//     const categories = [
//         'Foods',
//         'Vehicle',
//         'Tools'
//         // Add more categories here
//     ];

//     const [userId, setUserId] = useState(null);
//     const [userLog, setUserLog] = useState(null);

//     async function fetchData() {
//         const userUID = await AsyncStorage.getItem('loggedInUserId');
//         console.log('USER ID: ', userUID);
//         setUserId(userUID);
//     }

//     const database = getDatabase(app);
//     const userRef = databaseRef(database, `users/${userId}`);

//     function dataFetch() {
//         get(userRef)
//             .then((snapshot) => {
//                 if (snapshot.exists()) {
//                     // The data exists, and you can access it using snapshot.val()
//                     const data = snapshot.val();
//                     setUserLog(data);
//                     console.log(data);
//                 } else {
//                     console.log("No data available");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//             });
//     }

//     useEffect(() => {

//     }, [userId]);

//     useFocusEffect(
//         useCallback(() => {
//             fetchData();
//             dataFetch();
//         }, [userId, image])
//     );

//     const handleImageUpload = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [1, 1], // Adjust the aspect ratio as needed
//         });

//         if (!result.canceled) {
//             try {
//                 // Check if the result contains any assets
//                 if (result.assets && result.assets.length > 0) {
//                     const asset = result.assets[0];
//                     const uri = asset.uri;
//                     // Upload the image to Firebase Storage
//                     const response = await fetch(uri);
//                     const blob = await response.blob();
//                     const storageRefs = storageRef(storage, `images/${userId}/${Date.now()}.jpg`);
//                     const uploadTask = uploadString(storageRefs, blob, 'data_url');

//                     // Wait for the upload to complete
//                     await uploadTask;

//                     // Get the URL of the uploaded image
//                     const imageUrl = await getDownloadURL(storageRefs);

//                     // Set the image URL in the state
//                     setImage(imageUrl);
//                 }

//             } catch (error) {
//                 console.error('Error uploading image:', error);
//             }
//         }
//     };

//     const handlePost = () => {
//         // Create a new request object with the form data and user's data
//         const newRequest = {
//             postType,
//             postTitle,
//             category,
//             description,
//             quantity,
//             unit,
//             district,
//             userId, // The ID of the logged-in user
//             userLog, // User's data
//             image: image, // Include the selected image URI
//         };

//         // Get a reference to the 'BarterRequests' database location
//         const barterRequestsRef = databaseRef(database, 'BarterRequests');

//         // Push the new request data to the database
//         push(barterRequestsRef)
//             .then((newRequestRef) => {
//                 // Now, set the data for the new request under the generated key
//                 set(newRequestRef, newRequest)
//                     .then(() => {
//                         console.log('Request posted successfully!');
//                         // You can also navigate to a different screen or reset the form here.
//                     })
//                     .catch((error) => {
//                         console.error('Error setting request data:', error);
//                     });
//             })
//             .catch((error) => {
//                 console.error('Error pushing new request:', error);
//             });
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//                 <Text style={styles.heading}>Post New Request</Text>

//                 <View style={styles.postTypeContainer}>
//                     {/* Post Type Selection */}
//                     <TouchableOpacity
//                         style={[
//                             styles.postTypeButton,
//                             postType === 'need' && styles.postTypeSelected,
//                         ]}
//                         onPress={() => setPostType('need')}>
//                         <Text style={styles.postTypeButtonText}>I need...</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={[
//                             styles.postTypeButton,
//                             postType === 'give' && styles.postTypeSelected,
//                         ]}
//                         onPress={() => setPostType('give')}>
//                         <Text style={styles.postTypeButtonText}>I can give...</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         style={[
//                             styles.postTypeButton,
//                             postType === 'exchange' && styles.postTypeSelected,
//                         ]}
//                         onPress={() => setPostType('exchange')}>
//                         <Text style={styles.postTypeButtonText}>Exchange</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <TextInput
//                     style={styles.inputTopic}
//                     placeholder="Post Title"
//                     value={postTitle}
//                     onChangeText={text => setPostTitle(text)}
//                 />

//                 {/* Category Dropdown */}
//                 <Picker
//                     style={styles.dropdown}
//                     selectedValue={category}
//                     onValueChange={itemValue => setCategory(itemValue)}>
//                     <Picker.Item label="Select Category" value="" />
//                     {categories.map((category, index) => (
//                         <Picker.Item key={index} label={category} value={category} />
//                     ))}
//                 </Picker>

//                 <TextInput
//                     style={styles.largeInput} // Make the description input larger
//                     placeholder="Description"
//                     multiline={true}
//                     numberOfLines={6} // Adjust the number of lines
//                     value={description}
//                     onChangeText={text => setDescription(text)}
//                 />

//                 <View style={styles.quantityContainer}>
//                     <TextInput
//                         style={styles.inputQuantity}
//                         placeholder="Quantity"
//                         value={quantity}
//                         keyboardType="numeric"
//                         onChangeText={text => setQuantity(text)}
//                     />
//                     <Picker
//                         style={styles.unitPicker}
//                         selectedValue={unit}
//                         onValueChange={itemValue => setUnit(itemValue)}>
//                         {units.map((unit, index) => (
//                             <Picker.Item key={index} label={unit.length > 10 ? unit.substring(0, 10) + '...' : unit} value={unit} />
//                         ))}
//                     </Picker>
//                 </View>

//                 {/* District Dropdown */}
//                 <Picker
//                     style={styles.dropdown}
//                     selectedValue={district}
//                     onValueChange={itemValue => setDistrict(itemValue)}>
//                     <Picker.Item label="Select District" value="" />
//                     {districts.map((district, index) => (
//                         <Picker.Item key={index} label={district} value={district} />
//                     ))}
//                 </Picker>

//                 {/* Image Upload */}
//                 <View style={styles.imageUploadContainer}>
//                     <TouchableOpacity
//                         style={styles.uploadButton}
//                         onPress={handleImageUpload}>
//                         <Text style={styles.uploadButtonText}>Upload Image</Text>
//                     </TouchableOpacity>
//                     {image && <Image source={{ uri: image }} style={styles.image} />}
//                 </View>

//                 {/* Add spacing between the buttons */}
//                 <View style={styles.buttonSpacing} />
//                 {/* Custom Button */}
//                 <TouchableOpacity
//                     style={styles.customButton}
//                     onPress={handlePost}>
//                     <Text style={styles.customButtonText}>Post</Text>
//                 </TouchableOpacity>

//             </KeyboardAvoidingView>

//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: Colors.background,
//     },
//     heading: {
//         fontSize: 24,
//         marginBottom: 16,
//         textAlign: 'center',
//         fontWeight: 'bold',
//         //color: Colors.primary,
//         color: 'black',
//     },
//     postTypeContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 16,
//     },
//     postTypeButton: {
//         flex: 1,
//         backgroundColor: 'black',
//         paddingVertical: 10,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginHorizontal: 2,
//     },
//     postTypeButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     postTypeSelected: {
//         //backgroundColor: 'rgba(52, 152, 219, 0.8)',
//         backgroundColor: 'green',
//     },
//     inputTopic: {
//         height: 40,
//         //borderColor: Colors.primary,
//         borderColor: 'black',
//         borderWidth: 3,
//         borderRadius: 8,
//         marginBottom: 16,
//         paddingHorizontal: 12,
//         fontWeight: 'bold',
//         fontSize: 18,
//     },
//     /*input: {
//         height: 40,
//         borderColor: Colors.primary,
//         borderWidth: 2,
//         borderRadius: 8,
//         marginBottom: 16,
//         paddingHorizontal: 12,
//         fontSize: 18,
//     },*/
//     quantityContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 16,
//     },
//     inputQuantity: {
//         flex: 2,
//         height: 40,
//         //borderColor: Colors.primary,
//         borderColor: 'black',
//         borderWidth: 3,
//         borderRadius: 8,
//         paddingHorizontal: 12,
//         fontSize: 18,
//     },
//     unitPicker: {
//         flex: 1.1,
//         height: 40,
//         //borderColor: Colors.primary,
//         borderColor: 'black',
//         borderWidth: 2,
//         borderRadius: 8,
//     },

//     largeInput: {
//         height: 120, // Increased height for larger description input
//         //borderColor: Colors.primary,
//         borderColor: 'black',
//         borderWidth: 3,
//         borderRadius: 8,
//         marginBottom: 16,
//         paddingHorizontal: 12,
//         fontSize: 20,
//     },
//     /*dropdown: {
//         height: 40,
//         borderColor: Colors.primary,
//         borderWidth: 1,
//         borderRadius: 8,
//         marginBottom: 16,
//     },*/
//     dropdown: {
//         height: 40,
//         borderColor: 'black',
//         borderWidth: 2,
//         borderRadius: 8,
//         marginBottom: 16,
//         paddingHorizontal: 12,
//         fontSize: 18,
//         backgroundColor: 'white', // Background color
//         color: 'black', // Text color
//     },
//     imageUploadContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         marginBottom: 5,
//     },
//     uploadButton: {
//         backgroundColor: '#ffae00',
//         padding: 10,
//         borderRadius: 8,
//         alignItems: 'center',
//         flex: 1,
//     },
//     uploadButtonText: {
//         color: 'white',
//         fontWeight: '700',
//     },
//     image: {
//         width: 75,
//         height: 75,
//         alignSelf: 'center',
//         borderWidth: 1,
//         borderColor: Colors.primary,
//         borderRadius: 8,
//     },
//     buttonSpacing: {
//         marginBottom: 16, // Add spacing between the buttons
//     },
//     customButton: {
//         backgroundColor: Colors.postButton,
//         borderRadius: 10,
//         height: 60,
//         justifyContent: 'center',
//         alignItems: 'center',
//         //marginTop: 'auto'
//     },
//     customButtonText: {
//         color: 'white',
//         fontSize: 30,
//         fontWeight: 'bold',
//     },
// });






import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { RadioButton } from 'react-native-paper'; // Import RadioButton from 'react-native-paper'
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { ImagePicker } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { getDatabase, ref as databaseRef, push, get, set } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadString } from 'firebase/storage';
import { app, firebase } from '../../Firebase/FirebaseConfig';
import { getStorage, uploadBytes } from "firebase/storage";

import { KeyboardAvoidingView } from 'react-native';
import Colors from '../../SharedComponents/Colors';
import { Alert } from 'react-native';

const units = ['N/A', 'kg', 'g', 'L', 'ml', 'units', 'other'];

export default function PostNewRequest() {
    const [postType, setPostType] = useState('I need ');
    const [postTitle, setPostTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState(units[0]); // Initialize with the first unit
    const [district, setDistrict] = useState('');
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL] = useState(null);

    const [isModalVisible, setModalVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    // Error states for each field
    const [postTitleError, setPostTitleError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [quantityError, setQuantityError] = useState('');
    const [districtError, setDistrictError] = useState('');

    const districts = [
        'Galle',
        'Matara',
        'Hambantota',
        'Jaffna',
        'Kilinochchi',
        'Mannar',
        'Mullaitivu',
        'Vavuniya',
        'Puttalam',
        'Kurunegala',
        'Gampaha',
        'Colombo',
        'Kalutara',
        'Anuradhapura',
        'Polonnaruwa',
        'Matale',
        'Kandy',
        'Nuwara Eliya',
        'Kegalle',
        'Ratnapura',
        'Trincomalee',
        'Batticaloa',
        'Ampara',
        'Badulla',
        'Monaragala',
    ];

    const categories = [
        'Foods',
        'Vehicle',
        'Tools'
        // Add more categories here
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
            postTitle.trim() !== '' &&
            category !== '' &&
            description.trim() !== '' &&
            district !== '' &&
            imageURL !== null;

        setIsFormValid(isValid);
    }, [userId, postTitle, category, description, imageURL, district, postTitleError, categoryError, descriptionError, quantityError, districtError]);

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


    const validatePostTitle = () => {
        if (!postTitle) {
            setPostTitleError('Post title is required');
        } else {
            setPostTitleError('');
        }
    };
    const validateCategory = () => {
        if (!category) {
            setCategoryError('Post category is required');
        } else {
            setCategoryError('');
        }
    };
    const validateDescription = () => {
        if (!description) {
            setDescriptionError('Post description is required');
        } else {
            setDescriptionError('');
        }
    };
    const validateQuantity = () => {
        if (!quantity) {
            setQuantityError('Post quantity is required');
        } else {
            setQuantityError('');
        }
    };
    const validateDistrict = () => {
        if (!description) {
            setDistrictError('Post district is required');
        } else {
            setDistrictError('');
        }
    };

    const handlePost = () => {
        // Validate all fields
        validatePostTitle();
        validateCategory();
        validateDescription();
        validateQuantity();
        validateDistrict();
        // Check if any error exists
        if (
            postTitleError ||
            categoryError ||
            descriptionError ||
            quantityError ||
            districtError
        ) {
            // Display an error message or prevent form submission
            return;
        }

        if (!isFormValid) {
            alert("Please upload an image...");
            return;
        }

        // Create a new request object with the form data and user's data
        const newRequest = {
            postType,
            postTitle,
            category,
            description,
            quantity,
            unit,
            district,
            userId, // The ID of the logged-in user
            userLog, // User's data
            image: imageURL, // Include the selected image URI
            timestamp: Date.now(),
        };

        // Get a reference to the 'BarterRequests' database location
        const barterRequestsRef = databaseRef(database, 'BarterRequests');

        // Push the new request data to the database
        push(barterRequestsRef)
            .then((newRequestRef) => {
                // Now, set the data for the new request under the generated key
                set(newRequestRef, newRequest)
                    .then(() => {
                        console.log('Request posted successfully!');
                        // You can also navigate to a different screen or reset the form here.
                        showSuccessModal();
                        setImage(null);
                        setImageURL(null);

                        setDescription('');
                        setQuantity('');
                        setCategory('');
                        setPostTitle('');
                        setDistrict('');
                    })
                    .catch((error) => {
                        console.error('Error setting request data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error pushing new request:', error);
            });
    };

    return (
        <ScrollView>
            {/* <ScrollView contentContainerStyle={styles.container}> */}
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <Text style={styles.heading}>Post New Request</Text>

                    <View style={styles.postTypeContainer}>
                        {/* Post Type Selection */}
                        <TouchableOpacity
                            style={[
                                styles.postTypeButton,
                                postType === 'I need ' && styles.postTypeSelected,
                            ]}
                            onPress={() => setPostType('I need ')}>
                            <Text style={styles.postTypeButtonText}>I need...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.postTypeButton,
                                postType === 'I can give ' && styles.postTypeSelected,
                            ]}
                            onPress={() => setPostType('I can give ')}>
                            <Text style={styles.postTypeButtonText}>I can give...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.postTypeButton,
                                postType === "Let's exchange " && styles.postTypeSelected,
                            ]}
                            onPress={() => setPostType("Let's exchange ")}>
                            <Text style={styles.postTypeButtonText}>Exchange</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{ color: 'red' }}>{postTitleError}</Text>
                    <TextInput
                        style={styles.inputTopic}
                        placeholder="Post Title"
                        value={postTitle}
                        onChangeText={text => { setPostTitle(text); validatePostTitle(); }}
                    />

                    <Text style={{ color: 'red' }}>{categoryError}</Text>
                    {/* Category Dropdown */}
                    <Picker
                        style={styles.dropdown}
                        selectedValue={category}
                        onValueChange={itemValue => { setCategory(itemValue); validateCategory() }}>
                        <Picker.Item label="Select Category" value="" />
                        {categories.map((category, index) => (
                            <Picker.Item key={index} label={category} value={category} />
                        ))}
                    </Picker>

                    <Text style={{ color: 'red' }}>{descriptionError}</Text>
                    <TextInput
                        style={styles.largeInput} // Make the description input larger
                        placeholder="Description"
                        multiline={true}
                        numberOfLines={5} // Adjust the number of lines
                        value={description}
                        onChangeText={text => { setDescription(text); validateDescription() }}
                    />

                    <Text style={{ color: 'red' }}>{quantityError}</Text>
                    <View style={styles.quantityContainer}>
                        <TextInput
                            style={styles.inputQuantity}
                            placeholder="Quantity"
                            value={quantity}
                            keyboardType="numeric"
                            onChangeText={text => { setQuantity(text); validateQuantity() }}
                        />
                        <Picker
                            style={styles.unitPicker}
                            selectedValue={unit}
                            onValueChange={itemValue => setUnit(itemValue)}>
                            {units.map((unit, index) => (
                                <Picker.Item key={index} label={unit.length > 10 ? unit.substring(0, 10) + '...' : unit} value={unit} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={{ color: 'red' }}>{districtError}</Text>
                    {/* District Dropdown */}
                    <Picker
                        style={styles.dropdown}
                        selectedValue={district}
                        onValueChange={itemValue => { setDistrict(itemValue); validateDistrict() }}>
                        <Picker.Item label="Select District" value="" />
                        {districts.map((district, index) => (
                            <Picker.Item key={index} label={district} value={district} />
                        ))}
                    </Picker>

                    {/* Image Upload */}
                    <View style={styles.imageUploadContainer}>
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={handleImageUpload}>
                            <Text style={styles.uploadButtonText}>Upload Image</Text>
                        </TouchableOpacity>
                        {image && <Image source={{ uri: image }} style={styles.image} />}
                    </View>

                    {/* Add spacing between the buttons */}
                    <View style={styles.buttonSpacing} />

                    {/* Custom Button */}
                    <TouchableOpacity
                        style={styles.customButton}
                        onPress={handlePost}>
                        <Text style={styles.customButtonText}>POST</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                    style={styles.customButton}
                    onPress={handlePost}
                    disabled={!isFormValid}>
                    <Text style={styles.customButtonText}>POST</Text>
                </TouchableOpacity> */}

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
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.background,

        borderWidth: 2.5,
        marginVertical: 8,
        marginHorizontal: 8,
        borderColor: 'black',

        //marginBottom: 25
    },
    heading: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        //color: Colors.primary,
        color: 'black',
    },
    postTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    postTypeButton: {
        flex: 1,
        backgroundColor: 'black',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 2,
    },
    postTypeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    postTypeSelected: {
        //backgroundColor: 'rgba(52, 152, 219, 0.8)',
        backgroundColor: 'green',
    },
    inputTopic: {
        height: 40,
        //borderColor: Colors.primary,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 12,
        fontWeight: 'bold',
        fontSize: 18,
    },
    /*input: {
        height: 40,
        borderColor: Colors.primary,
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        fontSize: 18,
    },*/
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    inputQuantity: {
        flex: 2,
        height: 40,
        //borderColor: Colors.primary,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 12,
        fontSize: 18,
    },
    unitPicker: {
        flex: 1.1,
        height: 40,
        //borderColor: Colors.primary,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
    },

    largeInput: {
        height: 120, // Increased height for larger description input
        //borderColor: Colors.primary,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 16,
        paddingHorizontal: 12,
        fontSize: 20,
    },
    /*dropdown: {
        height: 40,
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
    },*/
    dropdown: {
        height: 40,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        fontSize: 18,
        backgroundColor: 'white', // Background color
        color: 'black', // Text color

    },
    imageUploadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    uploadButton: {
        backgroundColor: '#e6b947',//'#ffae00',
        padding: 8,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
    },
    uploadButtonText: {
        color: 'black',//'black',
        fontWeight: '700',
        fontSize: 16,
    },
    image: {
        width: 75,
        height: 75,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
    },
    buttonSpacing: {
        marginBottom: 16, // Add spacing between the buttons
    },
    customButton: {
        backgroundColor: '#4b5ebf', //Colors.postButton,
        borderRadius: 20,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 'auto'

        marginBottom: 30
    },
    customButtonText: {
        color: 'white',//'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 25,
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
    modalViewButton: {
        backgroundColor: 'blue',
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 125,
        paddingVertical: 10,
        borderRadius: 10
    },
});

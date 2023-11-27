import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Modal, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { getDatabase, orderByChild, ref as databaseRef, push, get, set, remove, query, equalTo, child, update } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadString } from 'firebase/storage';
import { getStorage, uploadBytes } from "firebase/storage";
import { app, firebase } from '../../Firebase/FirebaseConfig';

const units = ['kg', 'g', 'L', 'ml', 'units', 'other'];

const DisplayBids = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [request, setRequest] = useState(null);
  const [requests, setRequests] = useState(null);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // States for updating specific fields
  const [updatedCategory, setUpdatedCategory] = useState('');
  const [updatedDistrict, setUpdatedDistrict] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');
  const [updatedUnit, setUpdatedUnit] = useState('');
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);
  const [currentPrice, setCurrentPrice] = useState();
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
const [selectedUnit, setSelectedUnit] = useState('');


  async function fetchLoggedInUserID() {
    const userUID = await AsyncStorage.getItem('loggedInUserId');
    console.log('USER ID: ', userUID);
    setUserId(userUID);
  }

  const database = getDatabase(app);
  const userRef = databaseRef(database, `users/${userId}`);



  const barterRef = databaseRef(database, `bids`);

  function userBarterRequests() {
    const barterQuery = query(barterRef, orderByChild('userId'), equalTo(userId));

    get(barterQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // The data exists, and you can access it using snapshot.val()
          const data = snapshot.val();
          setRequest(data);
          console.log(data);


          const requests = Object.keys(data).map((id) => ({
            id: id, // Assign the key (id) to the variable id
            image: data[id].image, // Assuming the image URL is in the `image` field
            category: data[id].category,

            title: data[id].postType + data[id].productName, // Assuming the post title is in the `productName` field

            postType: data[id].postType,
            productName: data[id].productName,
            description: data[id].description,
            initialPrice: data[id].initialPrice,
            currentPrice: data[id].currentPrice,

            quantitySum: data[id].unit === 'N/A' ? `${data[id].unit}` : `${data[id].quantity} ${data[id].unit}`,

            quantity: data[id].quantity,
            unit: data[id].unit,
            userLog: data[id].userLog,
            timestamp: data[id].timestamp,
            userId: data[id].userId,
            status: data[id].status
          }));
          setRequests(requests);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }


  const handleUpdateRequest = async () => {

    if (selectedRequest) {
      const updatedRequestData = {
        category: updatedCategory,
        // initialPrice: updatedDistrict,
        quantity: updatedQuantity,
        productName: updatedTitle,
        description: updatedDescription,
        // Add other updated fields
        //postType: selectedRequest.postType,
        timestamp: selectedRequest.timestamp,
        image: selectedRequest.image,
        unit: updatedUnit,
        //unit: selectedRequest.unit,
        userLog: selectedRequest.userLog,
        userId: selectedRequest.userId,

      };


      if (updatedImage) {
        // If a new image is selected, upload it and update the image field
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response);
          };
          xhr.onerror = (e) => {
            reject(new TypeError('Network request failed.'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', updatedImage, true);
          xhr.send(null);
        });

        const fileName = updatedImage.substring(updatedImage.lastIndexOf('/') + 1);
        const storage = getStorage(app);
        const ref = storageRef(storage, fileName);

        await uploadBytes(ref, blob);
        updatedRequestData.image = await getDownloadURL(ref);
      }


      const requestRef = databaseRef(database, `bids/${selectedRequest.id}`);
      // set(requestRef, updatedRequestData)
      try {
        await update(requestRef, updatedRequestData).then(() => {
          console.log('Request updated successfully!');
          setUpdateModalVisible(false);
        })
      } catch (error) {
        console.error('Error updating request:', error);
      }

    }

    userBarterRequests();
  };



  const handleImageUpload = async () => {

    // You can use the ImagePicker to select a new image and update updatedImage state with the new URL
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Upload the selected image and get the new URL
      /*const imageUrl = await uploadImage(result.assets[0].uri);
      setUpdatedImage(imageUrl);*/
      setUpdatedImage(result.assets[0].uri);
    }
  };


  const deleteRequest = (itemId) => {
    setItemToDelete(itemId); // Set the item to be deleted
    setDeleteConfirmationVisible(true); // Show the confirmation modal
  }

  // Function to delete a specific item post
  const handleDeleteRequest = (itemId) => {
    // Create a reference to the item post in the database
    const itemRef = child(barterRef, itemId);

    // Use the 'remove' function to delete the item post
    remove(itemRef)
      .then(() => {
        // Item post deleted successfully, you can update the UI as needed
        // For example, you can remove the item from the 'requests' state.
        setRequests((prevRequests) => prevRequests.filter((item) => item.id !== itemId));
        console.log(`Item post with ID ${itemId} deleted successfully.`);
      })
      .catch((error) => {
        console.error('Error deleting item post:', error);
      });

  };



  const handleCompleteRequest = async () => {
    console.log(selectedRequest)

    if (selectedRequest) {
      const updatedRequestData = {
        status: 'complete',

      };

      const requestRef = databaseRef(database, `bids/${selectedRequest.id}`);
      // set(requestRef, updatedRequestData)
      try {
        await update(requestRef, updatedRequestData).then(() => {
          console.log('Request updated successfully!');
        })
      } catch (error) {
        console.error('Error updating request:', error);
      }

    }
  };

  useEffect(() => {

  }, [request, requests]);

  useFocusEffect(
    useCallback(() => {
      fetchLoggedInUserID();
      if (userId !== null) {
        //loggedInUserData();
        userBarterRequests();
      }
    }, [userId])
  );




  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>


      <View>
        <View style={styles.bidContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.productName}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Status : {item.status}</Text>
            <Text>Initial Price : {item.initialPrice}.00 LKR</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.initialPrice}>{item.currentPrice}.00 LKR</Text>
          </View>

        </View>
        {item.status !== 'complete'  && (
          <>
          <View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRequest(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.updateButton}
                onPress={() => {
                  setSelectedRequest(item);
                  setUpdateModalVisible(true);
                  // Set initial values for update modal
                  setUpdatedCategory(item.category);
                  // setUpdatedDistrict(item.initialPrice);
                  setUpdatedQuantity(item.quantity);
                  setUpdatedUnit(item.unit);
                  setUpdatedTitle(item.productName);
                  setUpdatedDescription(item.description);
                  setCurrentPrice(item.currentPrice);
                }}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.completeButton}
                onPress={() => {
                  setSelectedRequest(item);
                  handleCompleteRequest();
                }}>
                <Text style={styles.buttonTextComplete}>Mark as Completed</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {item.status === 'complete' && (
          <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('ViewHighestBid')}>
            <Text style={styles.buttonTextView}>View</Text>
          </TouchableOpacity>
        )}
      </View>
      {/* ////////////////////////////// */}

    </View>
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderModal = () => {
    if (selectedRequest) {
      // Calculate the number of days ago the post was published
      const daysAgo = Math.floor((Date.now() - selectedRequest.timestamp) / (1000 * 60 * 60 * 24));

    }
  };


  const DeleteConfirmationModal = () => {
    return (
      <Modal
        visible={deleteConfirmationVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalDescription}>
              Are you sure you want to delete this post?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.confirmDeleteButton}
                onPress={() => {
                  // Call the delete function when the user confirms
                  handleDeleteRequest(itemToDelete);
                  setDeleteConfirmationVisible(false);
                }}
              >
                <Text style={styles.buttonText}>DELETE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setDeleteConfirmationVisible(false); // Close the confirmation modal
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>DisplayBids</Text> */}
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      {renderModal()}

      {deleteConfirmationVisible && <DeleteConfirmationModal />}

      {/* Update Request Modal */}
      <Modal visible={isUpdateModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setUpdateModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            {/* Update fields for the selected request */}
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={updatedTitle}
              onChangeText={(text) => setUpdatedTitle(text)}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Category"
              value={updatedCategory}
              onChangeText={(text) => setUpdatedCategory(text)}
            /> */}
             <Picker
              selectedValue={updatedCategory}
              onValueChange={(itemValue) => setUpdatedCategory(itemValue)}
              style={styles.picker}
            >
                        <Picker.Item label="Select Category" value="" />
                        <Picker.Item label="Spices" value="Spices" />
                        <Picker.Item label="Others" value="Others" />
              {/* Add more categories as needed */}
            </Picker>
            {/* <TextInput
              style={styles.input}
              placeholder="District"
              value={updatedDistrict}
              onChangeText={(text) => setUpdatedDistrict(text)}
            /> */}
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              value={updatedQuantity}
              onChangeText={(text) => setUpdatedQuantity(text)}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Unit"
              value={updatedUnit}
              onChangeText={(text) => setUpdatedUnit(text)}
            /> */}
            <Picker
              selectedValue={updatedUnit}
              onValueChange={(itemValue) => setUpdatedUnit(itemValue)}
              style={styles.picker}
            >
                       {units.map((unit, index) => (
                                <Picker.Item key={index} label={unit.length > 10 ? unit.substring(0, 10) + '...' : unit} value={unit} />
                            ))}
              {/* Add more categories as needed */}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={updatedDescription}
              onChangeText={(text) => setUpdatedDescription(text)}
            />
            {/* Input field for updating the image */}
            <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
              <Text style={styles.uploadButtonText}>Update Image</Text>
            </TouchableOpacity>
            {updatedImage && <Image source={{ uri: updatedImage }} style={styles.image} />}
            <TouchableOpacity
              style={styles.InModal}
              onPress={handleUpdateRequest}
            >
              <Text style={styles.InModalUpdateButtonText}>UPDATE  BID</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    </View>
  );
};

// Get the screen width
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  container1: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  requestItem: {
    flexDirection: 'column',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
    flexShrink: 1,
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#3AB918',
    //padding: 10,
    borderRadius: 5,
    //marginRight: 5,

    paddingVertical: 10,
    paddingHorizontal: 10
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    gap: 5 // Added later
  },
  leftContent: {
    flexDirection: 'column',
    //alignItems: 'flex-start',
    alignItems: 'center',
  },
  categoryTag: {
    backgroundColor: 'lightblue',
    padding: 4,
    borderRadius: 5,
    marginBottom: 4,
    //marginRight: 10,
    marginTop: 5
  },
  categoryText: {
    fontSize: 14,
  },
  photo: {
    width: 80,
    height: 80,
    marginLeft: 2,
  },
  rightContent: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: '600',
  },
  categoryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    //marginLeft: 'auto'
  },
  cancelButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,

    paddingHorizontal: screenWidth * 0.225,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    //fontSize: 15,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    margin: 'auto'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 8,
    borderRadius: 10,
  },
  modalCategory: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalQuantity: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalDistrict: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalTimestamp: {
    fontSize: 14,
    //color: 'gray',
    color: 'green',
    //marginBottom: 16,

    marginLeft: 'auto',
    marginBottom: 10,
    fontWeight: '500',
    fontStyle: 'italic'
  },

  modalValueTextCategory: {
    fontSize: 16,
    backgroundColor: 'lightgreen',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontWeight: '500'
  },
  modalValueText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalTagText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalTag: {
    flexDirection: 'row',
    paddingBottom: 10,
  },

  closeButton: {
    position: 'relative',
    top: 10,
    // right: 16,
    backgroundColor: 'red',
    marginLeft: 'auto',
    marginRight: 42,
    borderRadius: 7.5,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
    padding: 10,
    paddingBottom: 20,
    fontWeight: 'bold'
  },


  updateButtonInModal: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  InModalUpdateButtonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  InModal: {
    backgroundColor: 'green',
    borderRadius: 5,
    margin: 'auto'
  },
  confirmDeleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  postedViewData: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    //marginTop: 15,
    marginHorizontal: -10
  },
  bidContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
    marginBottom: 10,
  },
  priceContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 5,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  initialPrice: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: '',
    bottom: 0,
    marginTop: 0,
    marginBottom: 12,
    left: 0,
    right: 0,
  },
  updateButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 10,
    paddingLeft: 30,
    marginLeft: 20,
    paddingRight: 30,
  },
  completeButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonTextView: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  buttonTextComplete: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 5,
  },

});

export default DisplayBids;
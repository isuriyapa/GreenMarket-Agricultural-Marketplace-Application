/*import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Requests = () => {
  const requests = [
    // Replace this with your actual data containing requests
    {
      id: 1,
      photo: 'URL_TO_PHOTO_1',
      category: 'Category 1',
      title: 'Request Title 1',
      description: 'This is the description of request 1.',
      quantity: 5,
    },
    {
      id: 2,
      photo: 'URL_TO_PHOTO_2',
      category: 'Category 2',
      title: 'Request Title 2 ABCDEFGHIJKLMNOP',
      description: 'This is the description of request 2.',
      quantity: 10,
    },
    // Add more request objects as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.leftContent}>
        <Image source={{ uri: require('../../assets/SAMPLE_salad-plants-before-harvest.jpg') }} style={styles.photo} />
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.middleContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.excerpt}>{item.description}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
        <View style={styles.categoryActions}>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rightContent}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  requestItem: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  photo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  category: {
    fontSize: 16,
  },
  middleContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
  excerpt: {
    fontSize: 14,
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  viewButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Requests;
*/

/*
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Requests = () => {
  const requests = [
    // Replace this with your actual data containing requests
    {
      id: 1,
      photo: 'URL_TO_PHOTO_1',
      category: 'Category 1',
      title: 'Request Title 1',
      description: 'This is the description of request 1.',
      quantity: 5,
    },
    {
      id: 2,
      photo: 'URL_TO_PHOTO_2',
      category: 'Category 2',
      title: 'Request Title 2 ABCDEFGHIJKLMNOP',
      description: 'This is the description of request 2.',
      quantity: 10,
    },
    // Add more request objects as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.leftContent}>
        <Image source={require('../../assets/SAMPLE_salad-plants-before-harvest.jpg')} style={styles.photo} />
        {/* <Image source={{ uri: item.photo }} style={styles.photo} /> *///}
/*<View style={styles.categoryTag}>
  <Text style={styles.categoryText}>{item.category}</Text>
</View>
</View>
<View style={styles.middleContent}>
<Text style={styles.title}>{item.title}</Text>
<Text style={styles.description}>{item.description}</Text>
<Text style={styles.quantity}>Quantity: {item.quantity}</Text>
</View>
<View style={styles.rightContent}>
<TouchableOpacity style={styles.viewButton}>
  <Text style={styles.buttonText}>View</Text>
</TouchableOpacity>
<View style={styles.categoryActions}>
  <TouchableOpacity style={styles.updateButton}>
    <Text style={styles.buttonText}>Update</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.cancelButton}>
    <Text style={styles.buttonText}>Cancel</Text>
  </TouchableOpacity>
</View>
</View>
</View>
);

return (
<View style={styles.container}>
<Text style={styles.heading}>Requests</Text>
<FlatList
data={requests}
keyExtractor={(item) => item.id.toString()}
renderItem={renderItem}
/>
</View>
);
};*/
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
  },
  leftContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  categoryTag: {
    backgroundColor: 'lightblue',
    padding: 4,
    borderRadius: 5,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 14,
  },
  photo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  middleContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  viewButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Requests;

*/

import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Modal, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { getDatabase, orderByChild, ref as databaseRef, push, get, set, remove, query, equalTo, child } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadString } from 'firebase/storage';
import { getStorage, uploadBytes } from "firebase/storage";
import { app, firebase } from '../../Firebase/FirebaseConfig';

const Requests = () => {
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
  const [updatedType, setUpdatedType] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

  const navigation = useNavigation();
  /*const requests = [
    // Replace this with your actual data containing requests
    {
      id: 1,
      photo: 'URL_TO_PHOTO_1',
      category: 'Foods',
      title: 'Request Title 1',
      description: 'This is the description of request 1.',
      quantity: 5,
    },
    {
      id: 2,
      photo: 'URL_TO_PHOTO_2',
      category: 'Vehicles',
      title: 'Request Title 2 ABCDEFGH HG IJKLMNOP',
      description: 'This is the description of request 2. This is the description of request 2. This is the description of request 2.',
      quantity: 10,
    },
    // Add more request objects as needed
  ];*/



  // Convert the `request` object into an array of requests
  /*if(request!==null){
    const requests = Object.values(request).map((item, index) => ({
      id: index, // You can use a unique ID if available, otherwise, use index
      photo: item.image, // Assuming the image URL is in the `image` field
      category: item.category,
      title: item.postType + item.postTitle, // Assuming the post title is in the `postTitle` field
      description: item.description,
      quantity: (item.unit === 'N/A') ? `${item.unit}` : `${item.quantity} ${item.unit}`, // Combining quantity and unit. // Combining quantity and unit
    }));
    setRequests(requests);
  }
  else{
    console.log('NULL! No request available.');
  }*/


  async function fetchLoggedInUserID() {
    const userUID = await AsyncStorage.getItem('loggedInUserId');
    console.log('USER ID: ', userUID);
    setUserId(userUID);
  }

  const database = getDatabase(app);
  const userRef = databaseRef(database, `users/${userId}`);

  /*function loggedInUserData() {
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // The data exists, and you can access it using snapshot.val()
          const data = snapshot.val();
          setUserData(data);
          console.log(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }*/

  const barterRef = databaseRef(database, `BarterRequests`);

  function userBarterRequests() {
    const barterQuery = query(barterRef, orderByChild('userId'), equalTo(userId));

    get(barterQuery)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // The data exists, and you can access it using snapshot.val()
          const data = snapshot.val();
          setRequest(data);
          console.log(data);

          /*const requests = Object.values(data).map((item, index) => ({
            id: index, // You can use a unique ID if available, otherwise, use index
            photo: item.image, // Assuming the image URL is in the `image` field
            category: item.category,
            title: item.postType + item.postTitle, // Assuming the post title is in the `postTitle` field
            description: item.description,
            district: item.district,
            timestamp: item.timestamp,
            quantity: (item.unit === 'N/A') ? `${item.unit}` : `${item.quantity} ${item.unit}`, // Combining quantity and unit. // Combining quantity and unit
          }));*/
          const requests = Object.keys(data).map((id) => ({
            id: id, // Assign the key (id) to the variable id
            image: data[id].image, // Assuming the image URL is in the `image` field
            category: data[id].category,

            title: data[id].postType + data[id].postTitle, // Assuming the post title is in the `postTitle` field

            postType: data[id].postType,
            postTitle: data[id].postTitle,
            description: data[id].description,
            district: data[id].district,

            quantitySum: data[id].unit === 'N/A' ? `${data[id].unit}` : `${data[id].quantity} ${data[id].unit}`,

            quantity: data[id].quantity,
            unit: data[id].unit,
            userLog: data[id].userLog,
            timestamp: data[id].timestamp,
            userId: data[id].userId
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
        district: updatedDistrict,
        quantity: updatedQuantity,
        postTitle: updatedTitle,
        description: updatedDescription,
        // Add other updated fields
        postType: updatedType,
        //postType: selectedRequest.postType,
        timestamp: selectedRequest.timestamp,
        image: selectedRequest.image,
        unit: updatedUnit,
        //unit: selectedRequest.unit,
        userLog: selectedRequest.userLog,
        userId: selectedRequest.userId
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


      const requestRef = databaseRef(database, `BarterRequests/${selectedRequest.id}`);
      set(requestRef, updatedRequestData)
        .then(() => {
          console.log('Request updated successfully!');
          setUpdateModalVisible(false);
          // Refresh the requests list
          userBarterRequests();
        })
        .catch((error) => {
          console.error('Error updating request:', error);
        });
    }
  };



  const handleImageUpload = async () => {
    // Implement image upload logic here
    // You can use the ImagePicker to select a new image and update updatedImage state with the new URL
    // Example:
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

  const uploadImage = async (uri_) => {
    try {
      const uri = await FileSystem.getInfoAsync(uri_);
      // Create a unique name for the image to avoid conflicts
      const imageName = `${selectedRequest.id}_${Date.now()}.jpg`;

      // Upload the image to Firebase Storage
      const storageReference = storageRef(app, `images/${imageName}`);
      await uploadString(storageReference, uri, 'data_url');
      return getDownloadURL(storageReference);
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
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


  const checkOffersReceived = (postId) => {
    navigation.navigate("BarterInbox", postId);
  }




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
      <View style={styles.titleView}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity style={styles.viewButton}
          onPress={() => {
            setSelectedRequest(item);
            setUpdateModalVisible(true);
            // Set initial values for update modal
            setUpdatedCategory(item.category);
            setUpdatedDistrict(item.district);
            setUpdatedQuantity(item.quantity);
            setUpdatedUnit(item.unit);
            setUpdatedTitle(item.postTitle);
            setUpdatedType(item.postType);
            setUpdatedDescription(item.description);
          }}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('BarterAvailableOptions', { postId: item.id, category: item.category, district: item.district, type: item.postType })}>
        <View style={styles.contentRow}>
          <View style={styles.leftContent}>

            {/* <Image source={require('../../../assets/SAMPLE_salad-plants-before-harvest.jpg')} style={styles.photo} /> */}
            <Image source={{ uri: item.image }} style={styles.photo} />
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>
          <View style={styles.rightContent}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.quantity}>Quantity: {item.quantitySum}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.categoryActions}>
        <TouchableOpacity style={styles.updateButton} onPress={() => deleteRequest(item.id)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.checkOffers} onPress={() => checkOffersReceived(item.id)}>
          <Text style={styles.checkOffersText}>Check Offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton}
          onPress={() => {
            setSelectedRequest(item);
            setModalVisible(true);
          }}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderModal = () => {
    if (selectedRequest) {
      // Calculate the number of days ago the post was published
      const daysAgo = Math.floor((Date.now() - selectedRequest.timestamp) / (1000 * 60 * 60 * 24));

      return (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedRequest.title}</Text>
              <Image source={{ uri: selectedRequest.image }} style={styles.modalImage} />
              <View style={styles.modalTag}>
                <Text style={styles.modalTagText}>Category: </Text>
                <Text style={styles.modalValueTextCategory}>{selectedRequest.category}</Text>
              </View>
              <Text style={styles.modalLabel}>Quantity: {selectedRequest.quantitySum}</Text>
              <View style={styles.postedViewData}>
                <Text style={styles.modalLabel}>Description:</Text>
                <Text style={styles.modalDescription}>{selectedRequest.description}</Text>
                <View style={styles.modalTag}>
                  <Text style={styles.modalTagText}>Target District: </Text>
                  <Text style={styles.modalValueText}>{selectedRequest.district}</Text>
                </View>
              </View>
              <Text style={styles.modalTimestamp}>Published {`${daysAgo} day(s) ago`}</Text>
              {/* You can add more details here */}
            </View>
          </View>
        </Modal>
      );
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
      <Text style={styles.heading}>Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      {renderModal()}

      {deleteConfirmationVisible && <DeleteConfirmationModal />}

      {/* Update Request Modal */}
      <Modal visible={isUpdateModalVisible} animationType="slide" transparent={true}>
        <ScrollView>
          <View style={styles.modalContainerUpdate}>
            <TouchableOpacity
              onPress={() => setUpdateModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.modalContentUpdate}>
              {/* Update fields for the selected request */}
              <Text style={styles.labelStyle}>Post Type :</Text>
              <Picker
                style={styles.input}
                selectedValue={updatedType}
                onValueChange={(itemValue, itemIndex) => setUpdatedType(itemValue)}>
                <Picker.Item label="I need " value="I need " />
                <Picker.Item label="I can give " value="I can give " />
                <Picker.Item label="Let's exchange " value="Let's exchange " />
              </Picker>
              {/* <TextInput
              style={styles.input}
              placeholder="Type"
              value={updatedType}
              onChangeText={(text) => setUpdatedType(text)}
            /> */}
              <Text style={styles.labelStyle}>Title :</Text>
              <TextInput
                style={styles.input}
                placeholder="Title"
                value={updatedTitle}
                onChangeText={(text) => setUpdatedTitle(text)}
              />
              <Text style={styles.labelStyle}>Category :</Text>
              <TextInput
                style={styles.input}
                placeholder="Category"
                value={updatedCategory}
                onChangeText={(text) => setUpdatedCategory(text)}
              />
              <Text style={styles.labelStyle}>District :</Text>
              {/* Replace the District input with a selection menu */}
              <Picker
                style={styles.input}
                selectedValue={updatedDistrict}
                onValueChange={(itemValue, itemIndex) => setUpdatedDistrict(itemValue)}
              >
                <Picker.Item label="Hambantota" value="Hambantota" />
                <Picker.Item label="Matara" value="Matara" />
                <Picker.Item label="Galle" value="Galle" />
                <Picker.Item label="Jaffna" value="Jaffna" />
                <Picker.Item label="Kilinochchi" value="Kilinochchi" />
                <Picker.Item label="Mannar" value="Mannar" />
                <Picker.Item label="Mullaitivu" value="Mullaitivu" />
                <Picker.Item label="Vavuniya" value="Vavuniya" />
                <Picker.Item label="Puttalam" value="Puttalam" />
                <Picker.Item label="Kurunegala" value="Kurunegala" />
                <Picker.Item label="Gampaha" value="Gampaha" />
                <Picker.Item label="Colombo" value="Colombo" />
                <Picker.Item label="Kalutara" value="Kalutara" />
                <Picker.Item label="Anuradhapura" value="Anuradhapura" />
                <Picker.Item label="Polonnaruwa" value="Polonnaruwa" />
                <Picker.Item label="Matale" value="Matale" />
                <Picker.Item label="Kandy" value="Kandy" />
                <Picker.Item label="Nuwara Eliya" value="Nuwara Eliya" />
                <Picker.Item label="Kegalle" value="Kegalle" />
                <Picker.Item label="Ratnapura" value="Ratnapura" />
                <Picker.Item label="Trincomalee" value="Trincomalee" />
                <Picker.Item label="Batticaloa" value="Batticaloa" />
                <Picker.Item label="Ampara" value="Ampara" />
                <Picker.Item label="Badulla" value="Badulla" />
                <Picker.Item label="Monaragala" value="Monaragala" />
                {/* Add more district options as needed */}
              </Picker>
              <Text style={styles.labelStyle}>Quantity :</Text>
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={updatedQuantity}
                keyboardType="numeric"
                onChangeText={(text) => setUpdatedQuantity(text)}
              />
              <Text style={styles.labelStyle}>Unit :</Text>
              {/* Replace the Unit input with a selection menu */}
              <Picker
                style={styles.input}
                selectedValue={updatedUnit}
                onValueChange={(itemValue, itemIndex) => setUpdatedUnit(itemValue)}
              >
                <Picker.Item label="N/A" value="N/A" />
                <Picker.Item label="kg" value="kg" />
                <Picker.Item label="g" value="g" />
                <Picker.Item label="L" value="L" />
                <Picker.Item label="ml" value="ml" />
                <Picker.Item label="units" value="units" />
                <Picker.Item label="other" value="other" />
                {/* Add more unit options as needed */}
              </Picker>
              <Text style={styles.labelStyle}>Description :</Text>
              <TextInput
                multiline={true}
                numberOfLines={3}
                style={styles.input}
                placeholder="Description"
                value={updatedDescription}
                onChangeText={(text) => setUpdatedDescription(text)}
              />
              {updatedImage && <Image source={{ uri: updatedImage }} style={styles.image} />}
              {/* Input field for updating the image */}
              <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                <Text style={styles.uploadButtonText}>Update Image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.InModal}
                onPress={handleUpdateRequest}
              >
                <Text style={styles.InModalUpdateButtonText}>UPDATE  POST</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    padding: 16,

    backgroundColor: 'white' // NEW
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
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
    paddingHorizontal: 10,
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
    backgroundColor: 'lightgreen',
    padding: 4,
    borderRadius: 5,
    marginBottom: 4,
    //marginRight: 10,
    marginTop: 5
  },
  categoryText: {
    fontSize: 14,

    fontWeight: '500'
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

    //paddingHorizontal: screenWidth * 0.225,
    paddingHorizontal: screenWidth * 0.1,
  },
  updateButton: {
    backgroundColor: '#f32013',//'#d11a2a',//'#f55f45',
    padding: 8,
    borderRadius: 5,

    paddingHorizontal: screenWidth * 0.045,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    //fontSize: 15,
  },
  checkOffers: {
    backgroundColor: 'orange',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 'auto',
    paddingHorizontal: screenWidth * 0.03,
  },
  checkOffersText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalContainerUpdate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContentUpdate: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    width: '80%',
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,

    backgroundColor: 'lightyellow',
    marginRight: 'auto',
    borderRadius: 5,
    paddingHorizontal: 5
  },

  /*
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
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
    marginBottom: 3, //10
    fontWeight: '500',
    fontStyle: 'italic',

    marginTop: 5
  },

  modalValueTextCategory: {
    fontSize: 16,
    backgroundColor: 'lightgreen',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontWeight: '500',
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
*/
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly more transparent background
  },
  modalContent: {
    backgroundColor: '#ffffff', // White background
    padding: 16,
    borderRadius: 20, // Rounded corners
    width: '80%',
    elevation: 5, // Add a subtle shadow
    alignItems: 'center', // Center content horizontally
  },
  modalTitle: {
    fontSize: 20, // Larger title //24
    fontWeight: 'bold',
    marginBottom: 16, // More spacing
    textAlign: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    marginBottom: 16, // More spacing
    borderRadius: 20, // Rounded corners
  },
  modalValueTextCategory: {
    fontSize: 16,
    backgroundColor: 'lightgreen',
    paddingVertical: 2, //8
    paddingHorizontal: 16,
    borderRadius: 10,
    fontWeight: 'bold',
    color: 'black', // White text on a colored background
  },
  modalValueText: {
    fontSize: 16,
    //fontStyle: 'italic',

    color: 'blue',
    fontWeight: '500'
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
    paddingBottom: 16, // More spacing
    alignItems: 'center'
  },

  modalDescription: {
    fontSize: 15,
    marginBottom: 10,
  },
  modalTimestamp: {
    fontSize: 14,
    //color: 'gray',
    color: 'green',
    //marginBottom: 16,

    //marginLeft: 'auto',
    //marginBottom: 3, //10
    fontWeight: '500',
    //fontStyle: 'italic',

    marginTop: 5
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
    padding: 8,
    marginBottom: 8, //
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
    /*width: '100%',
    height: 200,*/
    width: 125,
    height: 125,
    alignSelf: 'center',

    marginBottom: 10,
    borderRadius: 10,
  },
  InModalUpdateButtonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 12, //20
    fontWeight: 'bold',
    fontSize: 18, //18
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
});

export default Requests;


//
// <Modal visible={isUpdateModalVisible} animationType="slide" transparent={true}>
//   <View style={styles.modalContainerUpdate}>
//     <TouchableOpacity
//       onPress={() => setUpdateModalVisible(false)}
//       style={styles.closeButton}
//     >
//       <Text style={styles.closeButtonText}>Close</Text>
//     </TouchableOpacity>
//     <View style={styles.modalContentUpdate}>
//       {/* Update fields for the selected request */}
//       <Text style={labelStyle}>Title</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Title"
//         value={updatedTitle}
//         onChangeText={(text) => setUpdatedTitle(text)}
//       />
//       <Text style={labelStyle}>Category</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Category"
//         value={updatedCategory}
//         onChangeText={(text) => setUpdatedCategory(text)}
//       />
//       <Text style={labelStyle}>District</Text>
//       {/* Replace the District input with a selection menu */}
//       <Picker
//         style={styles.input}
//         selectedValue={updatedDistrict}
//         onValueChange={(itemValue, itemIndex) => setUpdatedDistrict(itemValue)}
//       >
//         <Picker.Item label="District 1" value="District 1" />
//         <Picker.Item label="District 2" value="District 2" />
//         {/* Add more district options as needed */}
//       </Picker>
//       <Text style={labelStyle}>Quantity</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Quantity"
//         value={updatedQuantity}
//         onChangeText={(text) => setUpdatedQuantity(text)}
//       />
//       <Text style={labelStyle}>Unit</Text>
//       {/* Replace the Unit input with a selection menu */}
//       <Picker
//         style={styles.input}
//         selectedValue={updatedUnit}
//         onValueChange={(itemValue, itemIndex) => setUpdatedUnit(itemValue)}
//       >
//         <Picker.Item label="Unit 1" value="Unit 1" />
//         <Picker.Item label="Unit 2" value="Unit 2" />
//         {/* Add more unit options as needed */}
//       </Picker>
//       <Text style={labelStyle}>Description</Text>
//       <TextInput
//         multiline={true}
//         numberOfLines={3}
//         style={styles.input}
//         placeholder="Description"
//         value={updatedDescription}
//         onChangeText={(text) => setUpdatedDescription(text)}
//       />
//       {/* Input field for updating the image */}
//       <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
//         <Text style={styles.uploadButtonText}>Update Image</Text>
//       </TouchableOpacity>
//       {updatedImage && <Image source={{ uri: updatedImage }} style={styles.image} />}
//       <TouchableOpacity
//         style={styles.InModal}
//         onPress={handleUpdateRequest}
//       >
//         <Text style={styles.InModalUpdateButtonText}>UPDATE  POST</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// </Modal>
// 
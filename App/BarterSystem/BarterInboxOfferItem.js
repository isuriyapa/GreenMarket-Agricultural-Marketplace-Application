import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, orderByChild, ref as databaseRef, push, get, set, query, equalTo, child } from 'firebase/database';
import { app, firebase } from '../Firebase/FirebaseConfig';

const BarterInboxOfferItem = ({ offer, offerId, receivedOffersFetch }) => {
  const navigation = useNavigation();

  const database = getDatabase(app);
  const acceptOfferRef = databaseRef(database, `Offers/${offerId}`);

  // Handle the "ACCEPT" button click with the offerId
  const handleAccept = async () => {
    offer.offerStatus = 'Accepted';
    set(acceptOfferRef, offer)
      .then(() => {
        console.log('Request updated successfully!');
        receivedOffersFetch();
      })
      .catch((error) => {
        console.error('Error updating request:', error);
      });
    // Use the offerId here to identify which offer is being accepted
    console.log(`Accepting offer with ID: ${offerId}`);
  };

  const handleCancel = async () => {
    offer.offerStatus = 'Cancelled';
    set(acceptOfferRef, offer)
      .then(() => {
        console.log('Request updated successfully!');
        receivedOffersFetch();
      })
      .catch((error) => {
        console.error('Error updating request:', error);
      });
    // Use the offerId here to identify which offer is being accepted
    console.log(`Cancelling offer with ID: ${offerId}`);
  };


  /*const DeleteConfirmationModal = () => {
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
                  handleCancel();
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
  };*/


  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={require('../../assets/sample_profile_picture_Profile-Transparent.png')} style={styles.avatar} />
        <View style={styles.textContainer}>
          <Text style={styles.senderName}>{offer.senderName}</Text>
          <Text style={styles.senderLocation}>{offer.senderDistrict}</Text>
        </View>

        {offer.offerStatus === 'Accepted' ?
          <TouchableOpacity style={{}}>
            <Text style={{ color: 'green', fontWeight: 'bold' }}>ACCEPTED</Text>
          </TouchableOpacity> : offer.offerStatus === 'Cancelled' ?
            <Text style={{ color: 'red', fontWeight: 'bold' }}>CANCELLED</Text> :
            <View style={{ flexDirection: 'column', gap: 3 }}>
              <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                <Text style={styles.buttonText}>ACCEPT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
        }

      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.offerMessage}>{offer.offerMessage}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.contactButton} onPress={() => navigation.navigate('ChatScreen', { from: offer.receiverId, to: offer.senderId, postId: offer.postId })}>
          <Text style={styles.buttonText}>CONTACT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // Increased elevation for a stronger shadow
    margin: 10,
    padding: 16,
    marginBottom: 10,

    marginHorizontal: 15
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  senderName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  senderLocation: {
    fontSize: 14,
    color: '#777',
  },
  messageContainer: {
    marginVertical: 10,
  },
  offerMessage: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Move the CONTACT button to the right
  },
  acceptButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 8,
  },
  contactButton: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    padding: 8,
    width: screenWidth * 0.5,
    marginHorizontal: 'auto,'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BarterInboxOfferItem;

import React from 'react';
import { View, Image, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

const PostItem = ({ post, onViewDetails, onMakeOffer }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const daysAgo = Math.floor((Date.now() - post.timestamp) / (1000 * 60 * 60 * 24));

  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        {/* <Image source={post.image} style={styles.image} /> */}
        <Image source={{ uri: post.image }} style={styles.image} />
        <Text style={styles.category}>{post.category}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.title}>{post.postType}{post.postTitle}</Text>
        <Text style={styles.description}>{post.description.length > 100 ? `${post.description.slice(0, 70)}...` : post.description}</Text>
        <Text style={styles.quantity}>Quantity:-  {post.unit === 'N/A' ? `${post.unit}` : `${post.quantity} ${post.unit}`}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.viewButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>VIEW</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.offerButton} onPress={onMakeOffer}>
            <Text style={styles.offerButtonText}>MAKE AN OFFER / CONTACT</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <View style={styles.modalContentCenterAlign}>
              <Text style={styles.modalTitle}>{post.postType}{post.postTitle}</Text>
              {/* <Image source={post.image} style={styles.modalImage} /> */}
              <Image source={{ uri: post.image }} style={styles.modalImage} />
              <Text style={styles.category}>{post.category}</Text>
              <Text style={styles.modalDescription}>{post.description}</Text>
              <Text style={styles.quantity}>Quantity:  {post.unit === 'N/A' ? `${post.unit}` : `${post.quantity} ${post.unit}`}</Text>
            </View>

            <View style={styles.postedBy}>
              <View style={styles.postedRow}>
                <View>
                  <Text style={styles.postedLabel}>Posted by (Farmer):</Text>
                  <Text style={styles.postedLabel}>From:</Text>
                </View>
                <View style={styles.postedValueContainer}>
                  <Text style={styles.postedValue}>{post.userLog.firstName} {post.userLog.lastName}</Text>
                  <Text style={styles.postedValue}>{post.userLog.district}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.modalTimestamp}>Posted {`${daysAgo} day(s) ago`}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  rightContent: {
    flex: 3,
  },
  modalImage: {
    margin: 10,
    width: 175,
    height: 175,
  },
  image: {
    width: 100,
    height: 100,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    backgroundColor: 'lightblue',
    padding: 2,
    borderRadius: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 10,
  },
  quantity: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewButton: {
    //backgroundColor: '#007BFF',
    backgroundColor: '#28A745',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 5,
  },
  offerButton: {
    //backgroundColor: '#28A745',
    backgroundColor: '#ffae00',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  offerButtonText: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    //alignItems: 'center',
  },
  modalContentCenterAlign: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalDescription: {
    fontSize: 16,
    marginVertical: 15,
  },


  postedBy: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  postedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelContainer: {
    flex: 1,
  },
  postedLabel: {
    fontWeight: 'bold',
  },
  valueContainer: {
    flex: 2,
    alignItems: 'flex-end', // Align values to the right
  },
  postedValue: {
    // Right-aligned values
    textAlign: 'right',
  },


  modalTimestamp: {
    fontSize: 14,
    color: 'green',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: '500',
    //fontStyle: 'italic'
  },
  closeButton: {
    //backgroundColor: '#007BFF',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 100,
  },
});

export default PostItem;

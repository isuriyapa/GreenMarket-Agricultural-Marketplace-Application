import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Slider  from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import { app } from '../../Firebase/FirebaseConfig';
import  {  useRef, useEffect} from 'react';
import {useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase,  get, set, ref as databaseRef, update} from 'firebase/database';

const BiddingSlider = ({ visible, onClose, onPriceChange, onPlaceBid , item }) => {
  const [bidPrice, setBidPrice] = useState(0);
  const [userId, setUserId] = useState(null);
  // const [item, setItem] = useState([]);
  const [userLog, setUserLog] = useState(null);
  


  const handleMinus = () => {
    setBidPrice(Math.max((item.currentPrice + 200), bidPrice - 100));
    onPriceChange(bidPrice);
  };

  const handlePlus = () => {
    setBidPrice(bidPrice + 100);
    onPriceChange(bidPrice);
  };

  async function fetchLoggedInUserID() {
    const userUID = await AsyncStorage.getItem('loggedInUserId');
    console.log('USER ID: ', userUID);
    setUserId(userUID);
  }

  const database = getDatabase(app);

  const userRef = databaseRef(database, `users/${userId}`);

  function dataFetch() {
    if (item.initialPrice === item.currentPrice){
      setBidPrice(item.initialPrice);
    }else{
      setBidPrice(item.currentPrice);
    }
    
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

  useFocusEffect(
    useCallback(() => {
      fetchLoggedInUserID();
        dataFetch();
    }, [userId])
);

// const handleUpdateRequest = async () => {
//     const lastBid = {
//         email: "saranga@gmail.com",
//         username: "Saranga",
//         userId: "2143fwgwregrwgers",
//         price: 1000
//     };
//     // const itemn = item;
//       const lastbid = {      
//         lastBid
//       };
//       console.log('Note        :   ' + item)
//       const requestRef = databaseRef(database, `bids/${item.id}`);
//     //   set(requestRef, {item, lastBid})
//     // requestRef.update(lastBid)
//     // //   requestRef.update(updatedRequestData)
//     //     .then(() => {
//     //       console.log('Request updated successfully!');
//     //       // Refresh the requests list
//     //     })
//     //     .catch((error) => {
//     //       console.error('Error updating request:', error);
//     //     });

//     try {
//         await update(requestRef, lastbid);
//         console.log('Request updated successfully!');
//         // Refresh the requests list
//       } catch (error) {
//         console.error('Error updating request:', error);
//       }
  
//   };


  // const handleBidPlacement = () => {
  //   // Collect bid data (e.g., bidPrice, bidderName, etc.)
  //   const bidData = {
  //     email: 'saranga@gmail.com',
  //     username: 'Saranga',
  //     userId: '2143532536',
  //     price: 1000,
  //   };

  //   // Call the onPlaceBid method and pass the bidData
  //   onPlaceBid(bidData);

  //   // Close the slider or perform any other necessary actions
  //   onClose();
  // };

  const handleUpdateRequest = () => {
    const bidData = {
      id:item.id,
      email: item.userLog.email,
      // username: item.userLog.username,
      userId: userId,
      // userId: item.userId,
      price: bidPrice,
      item: item
      // item: item, // Pass the item
    };
    onPlaceBid(bidData);
    onClose();
  };

  return (
    <View style={[styles.container, { display: visible ? 'flex' : 'none' }]}>
      <View style={styles.sliderContainer}>

      <View style={styles.header}>
        <Text style={styles.placeBidText}>Place Bid</Text>
        <Text style={styles.bidAmountText}>{bidPrice} LKR</Text>
      </View>

        <Slider
          style={styles.slider}
          minimumValue={item.currentPrice} // want to set to initial price
          maximumValue={10000}
          step={100}
          value={bidPrice}
          onValueChange={(value) => {
            setBidPrice(value);
            onPriceChange(value);
          }}
        />
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handleMinus} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.bidPrice}>{bidPrice}</Text>
        <TouchableOpacity onPress={handlePlus} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity  style={styles.closeButton} onPress={handleUpdateRequest
  }>
        <Text style={styles.closeButtonText}>Place Bid</Text>
      </TouchableOpacity>
      <View style={styles.closeIconContainer}>
      <TouchableOpacity onPress={onClose}>
        <Icon name="chevron-down" size={30} color="black" />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fffdcf',
    padding: 20,
  },
  Bidslider:{
      backgroundColor: '#87654f',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bidPrice: {
    fontSize: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeIconContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  placeBidText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bidAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BiddingSlider;
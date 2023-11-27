import React, { useState , useRef, useEffect} from 'react';
import {useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getDatabase,  get, set, ref as databaseRef, update} from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BiddingSlider from './BiddingSlider';
import { app } from '../../Firebase/FirebaseConfig';

const ItemDetailsScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [userId, setUserId] = useState(null);
    const [bidPlacedTime, setBidPlacedTime] = useState(null);
    const [remainingTime, setRemainingTime] = useState(1 * 24 * 60 * 60); // Initial time in seconds (1 day)
    // Mock remaining time (replace with your actual logic)
    //const remainingTime = '1 day 12 hrs';
    const [sliderVisible, setSliderVisible] = useState(false);
    const intervalRef = useRef(null);
    const [userLog, setUserLog] = useState(null);



    async function fetchLoggedInUserID() {
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
    
      useFocusEffect(
        useCallback(() => {
          fetchLoggedInUserID();
            dataFetch();
        }, [userId])
    );

    // const handleUpdateRequest = async (bidData) => {
    //     // const lastBid = {
    //     //     email: "saranga@gmail.com",
    //     //     username: "Saranga",
    //     //     userId: "2143532536",
    //     //     price: 1000
    //     // };
    //     // const itemn = item;
    //       const lastbid = {      
    //         // lastBid
    //         bidData
    //       };
    //       console.log(item);
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
    

    const handleUpdateRequest = async (bidData) => {
        // if (!bidData) {
        //   console.error('Invalid bid data or item:', bidData);
        //   return;
        // }
      
        const { item } = bidData;
      
        if (!item || !item.id || !item.userLog || !item.userLog.email  ) { //|| !item.userLog.username
          console.error('Invalid item or item properties:', item);
          return;
        }

        // if ( !item.id || !item.email || !item.username ) {
        //     console.error('Invalid item or item properties:', item);
        //     return;
        //   }
      
        const lastBid = {
            bidData,
            currentPrice: bidData.price
        //   userId: item.userId, // Check if userId should be accessed from item
        //   price: item.price, // Make sure to use the correct property from item
        };
      
        const requestRef = databaseRef(database, `bids/${item.id}`);
      
        try {
          await update(requestRef, lastBid)
          console.log('Bid placed successfully!')
          // Refresh the requests list or perform other necessary actions
          
          navigation.navigate('BidViewTabConsumer');

          
        } catch (error) {
          console.error('Error updating request:', error);
        }
      };
      
      



    useEffect(() => {
        setBidPlacedTime(Math.floor(Date.now() / 1000));
        if (bidPlacedTime) {
            const currentTime = Math.floor(Date.now() / 1000);
            const elapsedTime = currentTime - bidPlacedTime;
            const initialRemainingTime = 1 * 24 * 60 * 60;
            const remainingTimeFromLastBid = Math.max(0, initialRemainingTime - elapsedTime);
            setRemainingTime(remainingTimeFromLastBid);
            startCountdownTimer();
          }
    
        return () => {
          // Clear the interval on component unmount
          clearInterval(intervalRef.current);
        };
      }, []);

    // Function to start the countdown timer
    const startCountdownTimer = () => {
        // Clear any existing interval
        clearInterval(intervalRef.current);
    
        intervalRef.current = setInterval(() => {
          setRemainingTime((prevTime) => {
            if (prevTime === 0) {
              clearInterval(intervalRef.current);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      };

  startCountdownTimer();

      ///////////////
// Get the current date and time

const storedTimestamp = 1698210109502;
const currentDate = new Date();

// Convert the current date to a timestamp
const currentTimestamp = currentDate.getTime();
const timeDifference = currentTimestamp - storedTimestamp;
// Calculate the time difference in minutes
const timeDifferenceInMinutes = timeDifference / (1000 * 60);

// console.log(timeDifferenceInMinutes);

    ////////////////

  // Format the remaining time into days, hours, minutes, and seconds
  const formatTime = () => {
    const days = Math.floor(remainingTime / (24 * 60 * 60));
    const hours = Math.floor((remainingTime % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

    //const { item } = route.params;
    // const item =
    // {
    //     id: 1,
    //     productName: 'Product 1',
    //     quantity: '10 Kg',
    //     unit: 'Kg',
    //     initialPrice: '50',
    //     description: 'Description for Product 1',
    // }



    const handlePlaceBid = () => {
        setSliderVisible(true); // Show the slider when "Place a Bid" is pressed
    };

    const handleCloseSlider = () => {
        setSliderVisible(false); // Hide the slider when closing
    };

    const handlePriceChange = (price) => {
        // Handle price change if needed
        console.log('Bidding price changed:', price);
    };




    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* Dark gray ribbon for remaining time */}
            {/* <View style={styles.ribbon}>
                <Text style={styles.timeText}>{remainingTime}</Text>
            </View> */}
            {/* Dark gray ribbon for remaining time */}
            <View style={styles.ribbon}>
                {/* <Text style={styles.labelText}>Remaining Time: <Text style={styles.timeText}>{formatTime()}</Text> </Text> */}
                <Text style={styles.labelRibbon}>Hurry UP & Get Your Chance!</Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.label}>Product Name:</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.value}>{item.productName}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.label}>Quantity:</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.value}>{item.quantity}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.label}>Unit:</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.value}>{item.unit}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.label}>Initial Price:</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.value}>{item.initialPrice}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.cell}>
                        <Text style={styles.label}>Description:</Text>
                    </View>
                    <View style={styles.cell}>
                        <Text style={styles.value}>{item.description}</Text>
                    </View>
                </View>
            </View>



            <TouchableOpacity
                style={{ backgroundColor: '#3498db', padding: 15, borderRadius: 10 }}
                onPress={handlePlaceBid}
            >
                <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Place a Bid</Text>
            </TouchableOpacity>

            {/* Pass visibility and onClose callback to the slider */}
            <BiddingSlider style={styles.Bidslider}
                visible={sliderVisible}
                onClose={handleCloseSlider}
                onPriceChange={handlePriceChange}
                item={item}
                onPlaceBid={handleUpdateRequest}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    detailsContainer: {
        marginTop: 10,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    cell: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    labelRibbon: {
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    value: {
        fontSize: 16,
        textAlign: 'left',
    },
    ribbon: {
        position: '',
        bottom: 10,
        left: 0,
        backgroundColor: '#333',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderTopRightRadius: 0,
    },
    labelText: {
        color: 'white',
        marginRight: 5,
        textAlign: 'center',
        fontSize: 16,
    },
    timeText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ItemDetailsScreen;

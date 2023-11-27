import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, Card, Title, TextInput, Divider } from 'react-native-paper';
import { Avatar, Icon } from 'react-native-elements';
import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, push, get, set, remove, query, equalTo, orderByChild } from 'firebase/database';
import { app } from '../../Firebase/FirebaseConfig';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import Header from '../../SharedComponents/Header';

const Offers = ({ post }) => {

    const posted = useRoute(post).params;

    const [sentOffers, setSentOffers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);

    const [offerMessage, setOfferMessage] = useState(null);

    async function fetchLoggedInUserID() {
        const userUID = await AsyncStorage.getItem('loggedInUserId');
        console.log('USER ID: ', userUID);
        setUserId(userUID);
    }

    const database = getDatabase(app);

    const userRef = ref(database, `users/${userId}`);
    function dataFetch() {
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
    }

    const offersRef = ref(database, 'Offers');
    //const sentOffersQuery = query(offersRef, orderByChild('senderId'), equalTo(userId), orderByChild('postId'), equalTo(posted.id));
    const sentOffersQuery = query(offersRef,
        orderByChild('concatenatedId'),
        equalTo(`${userId}_${posted.id}`)
    );


    function sentOffersFetch() {
        get(sentOffersQuery)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // The data exists, and you can access it using snapshot.val()
                    const data = snapshot.val();
                    setSentOffers(data);
                    console.log(data);
                } else {
                    console.log("No Sent Offers data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    /*const itemsRef = ref(db, '/offers');

    function dataFetch() {
        get(itemsRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // The data exists, and you can access it using snapshot.val()
                    const data = snapshot.val();
                    setdData(data);
                    console.log(data);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }*/


    // Sample data for the list of previously sent offers
    /*const previousOffers = [
        {
            name: 'John Doe',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            name: 'Jane Smith',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        },
        {
            name: 'Jane Smith',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        },
        {
            name: 'Jane Smith',
            description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        },
        // Add more offers as needed
    ];*/

    const sendOffer = () => {
        if (!offerMessage || !userId) {
            // Ensure offerMessage and userId are available
            return;
        }
        const newOffer = {
            offerMessage,
            senderId: userId,
            receiverId: posted.userId,
            receiverName: `${posted.userLog.firstName} ${posted.userLog.lastName}`,
            senderName: `${userData.firstName} ${userData.lastName}`,
            postId: posted.id,
            postTitle: `${posted.postType}${posted.postTitle}`,
            category: posted.category,
            senderPhone: userData.phoneNumber,
            senderDistrict: userData.district,
            offerTimestamp: Date.now(),
            offerStatus: 'Pending',
            concatenatedId: userId + "_" + posted.id,

            concatenatedPosterId: posted.userId + "_" + posted.id,
        }

        // Push the new offer data to the database
        const newOfferRef = push(offersRef);
        setOfferMessage(''); // Clear the offer message input field after sending

        // Set the offer data
        set(newOfferRef, newOffer)
            .then(() => {
                console.log('Offer sent successfully');
            })
            .catch((error) => {
                console.error('Error sending offer:', error);
            });

        sentOffersFetch();
    }


    const deleteOffer = (offerId) => {
        // Display a confirmation alert before deleting
        Alert.alert(
            'Delete Offer',
            'Are you sure you want to delete this offer?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        const offerRef = ref(database, `Offers/${offerId}`);
                        remove(offerRef)
                            .then(() => {
                                console.log('Offer deleted successfully');
                                sentOffersFetch();
                            })
                            .catch((error) => {
                                console.error('Error deleting offer:', error);
                            });
                    },
                },
            ],
            { cancelable: true }
        );
    };


    useEffect(() => {
        //dataFetch();
    }, [userId])

    useFocusEffect(
        useCallback(() => {
            if (!userData) {
                dataFetch();
            }
            fetchLoggedInUserID();
            console.log('POST:- ', posted);
            //dataFetch();
            if (!sentOffers || sentOffers.length === 0) {
                sentOffersFetch();
            }

            return () => {

            };
        }, [sentOffers, userId, userData])
    );

    return (
        <View style={styles.container}>

            <Header />

            {/* Upper section */}
            <View style={styles.upperSection}>
                <Title style={styles.title}>Send Offer</Title>
                <Text style={{ fontWeight: '700', backgroundColor: '#ffe2a3', marginRight: 'auto', marginBottom: 5, paddingHorizontal: 10, borderRadius: 5 }}>To :-   {posted.userLog.gender === 'Male' ? 'Mr.' : posted.userLog.gender === 'Female' ? 'Ms.' : ''} {posted ? posted.userLog.firstName : ''}</Text>
                <TextInput label="Message" multiline={true} style={styles.input} value={offerMessage} onChangeText={text => setOfferMessage(text)} />
                <Button mode="contained" style={styles.sendButton} textColor='black' labelStyle={{ fontWeight: 'bold', fontSize: 20, padding: 1 }} onPress={() => sendOffer()}>
                    SEND
                </Button>
            </View>

            <Divider style={{ height: 5, backgroundColor: 'black', marginTop: 10 }} />
            <Text style={styles.subHeading}>Previously Sent Offers</Text>
            <ScrollView>
                {/* Previously Sent Offers */}
                <View style={styles.lowerSection}>

                    {sentOffers ? (
                        Object.keys(sentOffers).map((offerId) => {
                            const offer = sentOffers[offerId];

                            const timeDifference = Date.now() - offer.offerTimestamp;
                            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

                            const timeAgo = [];
                            if (days > 0) {
                                timeAgo.push(`${days} day${days > 1 ? 's' : ''}`);
                            }
                            if (hours > 0) {
                                timeAgo.push(`${hours} hour${hours > 1 ? 's' : ''}`);
                            }
                            /*if (minutes > 0) {
                                timeAgo.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
                            }*/
                            const timeAgoText = timeAgo.join(', ');

                            return (
                                <Card key={offerId} style={styles.card}>
                                    <Card.Title
                                        title={offer.receiverName}
                                        subtitle={`Regarding ${offer.category}...`}
                                        subtitleStyle={{ color: 'blue' }}
                                        titleStyle={{ fontWeight: 'bold' }}
                                        left={(props) => <Avatar {...props} rounded source={require('../../../assets/sample_profile_picture_Profile-Transparent.png')} />}
                                        right={(props) => (
                                            <>
                                                <Button
                                                    buttonColor="red"
                                                    textColor='white'
                                                    style={styles.cancelButton}
                                                    onPress={() => deleteOffer(offerId)}
                                                >
                                                    REMOVE
                                                </Button>
                                                {/* <Text
                                                    style={{textAlign: 'center', fontWeight:'bold'}}
                                                >
                                                    {offer.offerStatus === 'Accepted' ? '(ACCEPTED)' : offer.offerStatus === '(Cancelled)' ? 'Cancelled' : ''}
                                                </Text> */}
                                            </>
                                        )}
                                    />
                                    <Card.Content>
                                        {/* <Text style={{fontWeight: '500', marginTop:-5, marginBottom: 5}}>Regarding {offer.category}...</Text> */}
                                        <Text>{offer.offerMessage}</Text>
                                        <Text style={{ marginLeft: 'auto', fontStyle: 'italic', color: 'green' }}>{timeAgo.length > 0 ? `${timeAgoText} ago` : 'less than hour ago'}</Text>
                                    </Card.Content>
                                    <Text style={offer.offerStatus === 'Accepted' ? { textAlign: 'center', fontWeight: 'bold', backgroundColor: 'lightyellow', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, color: 'green' } : ''}>
                                        {offer.offerStatus === 'Accepted' ? '(ACCEPTED)' : offer.offerStatus === '(Cancelled)' ? 'Cancelled' : ''}
                                    </Text>
                                </Card>
                            );
                        })
                    ) : (
                        <Text>No offers sent yet</Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //marginTop: 35,
    },
    upperSection: {
        padding: 16,
        //backgroundColor: '#e7fcd9'
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        marginBottom: 16,
        height: 200,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'green'
    },
    sendButton: {
        backgroundColor: '#ffae00',
    },
    lowerSection: {
        padding: 16,
    },
    subHeading: {
        fontSize: 18,
        //marginBottom: 16,
        textAlign: 'center',
        fontWeight: 'bold',

        marginTop: 15,
        marginBottom: 5,
        backgroundColor: 'green',
        paddingVertical: 10,
        color: 'white'
    },
    card: {
        marginBottom: 16,
        backgroundColor: '#baf5bd',
    },
    cancelButton: {
        //backgroundColor: 'red',
        paddingHorizontal: 10,
        marginRight: 5,
    },
});

export default Offers;

import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import BarterInboxOfferItem from './BarterInboxOfferItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, ref, push, get, set, remove, query, equalTo, orderByChild } from 'firebase/database';
import { useFocusEffect, useRoute } from '@react-navigation/native';

import { app } from '../Firebase/FirebaseConfig';
import Header from '../SharedComponents/Header';

const BarterInbox = ({ postId }) => {
    const post_Id = useRoute(postId).params;

    const [receivedOffers, setReceivedOffers] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);

    const [filteredOffers, setFilteredOffers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('All');

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
    const receivedOffersQuery = query(offersRef, orderByChild('concatenatedPosterId'), equalTo(`${userId}_${post_Id}`));

    function receivedOffersFetch() {
        get(receivedOffersQuery)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // The data exists, and you can access it using snapshot.val()
                    const data = snapshot.val();
                    setReceivedOffers(data);
                    console.log(data);
                } else {
                    console.log("No Received Offers data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }


    const filterOffersByStatus = (status) => {
        setSelectedStatus(status);
        if (status === 'All') {
            setFilteredOffers(receivedOffers);
        } else {
            const filtered = Object.keys(receivedOffers)
                .filter((offerId) => receivedOffers[offerId].offerStatus === status);
            const filteredOffers = {};
            filtered.forEach((offerId) => {
                filteredOffers[offerId] = receivedOffers[offerId];
            });
            setFilteredOffers(filteredOffers);
        }
    };


    useEffect(() => {

    }, [userId])

    useFocusEffect(
        useCallback(() => {
            if (!userData) {
                dataFetch();
            }
            fetchLoggedInUserID();

            if (!receivedOffers || receivedOffers.length === 0) {
                receivedOffersFetch();
            }

            filterOffersByStatus(selectedStatus);

            return () => {

            };
        }, [receivedOffers, userId, userData])
    );

    /*const receivedOffers = [
        // Sample data for received offers
        {
            senderAvatar: 'URL_TO_SENDER_AVATAR',
            senderName: 'John Doe',
            senderLocation: 'Farmington, District X',
            message: 'I have 100 bushels of wheat available. Are you interested?',
        },
        {
            senderAvatar: 'URL_TO_SENDER_AVATAR',
            senderName: 'John Doe',
            senderLocation: 'Farmington, District X',
            message: 'I have 100 bushels of wheat available. Are you interested? I have 100 bushels of wheat available. Are you interested?',
        },
        // Add more received offers here
    ];*/

    return (
        <View style={{ flex: 1 }}>

            <Header />

            <Text style={{/*marginTop: 40,*/marginTop: 20, textAlign: 'center', fontWeight: 'bold', fontSize: 24 }}>BARTER INBOX</Text>

            <View style={styles.statusFilter}>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        selectedStatus === 'All' && styles.selectedFilterButton,
                    ]}
                    onPress={() => filterOffersByStatus('All')}
                >
                    <Text style={[styles.filterButtonText,
                    selectedStatus === 'All' && styles.selectedFilterButtonText,]} >All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        selectedStatus === 'Pending' && styles.selectedFilterButton,
                    ]}
                    onPress={() => filterOffersByStatus('Pending')}
                >
                    <Text style={[styles.filterButtonText,
                    selectedStatus === 'Pending' && styles.selectedFilterButtonText,]}>Pending</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        selectedStatus === 'Accepted' && styles.selectedFilterButton,
                    ]}
                    onPress={() => filterOffersByStatus('Accepted')}
                >
                    <Text style={[styles.filterButtonText,
                    selectedStatus === 'Accepted' && styles.selectedFilterButtonText,]}>Accepted</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.filterButton,
                        selectedStatus === 'Cancelled' && styles.selectedFilterButton,
                    ]}
                    onPress={() => filterOffersByStatus('Cancelled')}
                >
                    <Text style={[styles.filterButtonText,
                    selectedStatus === 'Cancelled' && styles.selectedFilterButtonText,]}>Cancelled</Text>
                </TouchableOpacity>
            </View>


            <ScrollView style={{ marginTop: 20 }}>
                {Object.keys(filteredOffers).map((offerId) => {
                    const offer = filteredOffers[offerId];
                    console.log(offer);
                    return (
                        <BarterInboxOfferItem key={offerId} offer={offer} offerId={offerId} receivedOffersFetch={receivedOffersFetch} />
                    )
                })}
            </ScrollView>
            {/* <ScrollView style={{ marginTop: 20 }}>
                {Object.keys(receivedOffers).map((offerId) => {
                    const offer = receivedOffers[offerId];
                    console.log(offer);
                    return (
                        <BarterInboxOfferItem key={offerId} offer={offer} offerId={offerId} receivedOffersFetch={receivedOffersFetch} />
                    )
                })}
            </ScrollView> */}
        </View>
    );
};

export default BarterInbox;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusFilter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    filterButton: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
    },
    selectedFilterButton: {
        //backgroundColor: 'lightblue',
        backgroundColor: 'black',
    },
    filterButtonText: {
        fontWeight: 'bold',
    },
    selectedFilterButtonText: {
        fontWeight: 'bold',
        color: 'white',
    },
    scrollView: {
        marginTop: 20,
    },
});
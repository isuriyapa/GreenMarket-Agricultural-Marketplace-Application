import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Modal, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LocationFilter from './LocationFilter';
import PostItem from './PostItem';
import Header from '../../SharedComponents/Header';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, orderByChild, ref as databaseRef, push, get, set, remove, query, equalTo, child } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadString } from 'firebase/storage';
import { getStorage, uploadBytes } from "firebase/storage";
import { app, firebase } from '../../Firebase/FirebaseConfig';

const locations = ['All', 'Galle',
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
    'Monaragala',]; // Add your districts here, and include 'All'

const categories = ['All', 'Vehicle', 'Foods', 'Tools']; // Add your categories here, and include 'All'

const posts = [
    {
        image: require('../../../assets/SAMPLE_salad-plants-before-harvest.jpg'),
        category: 'Vegetables',
        title: 'Fresh Tomatoes',
        description: 'Organically grown tomatoes available for exchange. Contact for details.',
        location: 'District 1',
    },
    {
        image: require('../../../assets/SAMPLE_salad-plants-before-harvest.jpg'),
        category: 'Fruits',
        title: 'Apples',
        description: 'Locally grown apples available for trade. Contact for details.',
        location: 'District 2',
    },
    // Add more posts here
];

const BarterExchange = () => {
    const navigation = useNavigation();

    const [selectedLocation, setSelectedLocation] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [requests, setRequests] = useState([]);

    const filteredPosts = requests.filter(post => {
        const locationMatch = selectedLocation === 'All' || post.district === selectedLocation;
        const categoryMatch = selectedCategory === 'All' || post.category === selectedCategory;

        return locationMatch && categoryMatch;
    });

    async function fetchLoggedInUserID() {
        const userUID = await AsyncStorage.getItem('loggedInUserId');
        console.log('USER ID: ', userUID);
        setUserId(userUID);
    }

    const database = getDatabase(app);

    const barterRef = databaseRef(database, `BarterRequests`);

    function barterRequests() {
        // Query to fetch data where userId is not equal to the specified userId
        //const barterQuery = query(barterRef, orderByChild('userId'), equalTo(userId));

        get(barterRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // The data exists, and you can access it using snapshot.val()
                    //const data = snapshot.val();

                    // Iterate over the data and filter out the items where userId is equal to the specified userId
                    const data = [];
                    for (const key in snapshot.val()) {
                        if (snapshot.val()[key].userId !== userId) {
                            data.push({
                                id: key,
                                ...snapshot.val()[key]
                            });
                        }
                    }
                    setRequests(data);
                    console.log(data);
                    // Now, data will contain items with userId not equal to the specified userId.
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }


    useEffect(() => {
        fetchLoggedInUserID();
    }, [requests]);

    useFocusEffect(
        useCallback(() => {

            if (userId !== null) {
                barterRequests();
            }

        }, [userId])
    );

    return (
        <View>
            <Header />
            <Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold', marginTop: 15 }}>BARTER EXCHANGE</Text>
            <ScrollView style={{marginBottom: 'auto'}}>
                <LocationFilter
                    locations={locations}
                    selectedLocation={selectedLocation}
                    onLocationChange={value => setSelectedLocation(value)}
                />
                <View style={styles.filterContainer}>
                    <Text style={styles.label}>Filter by Category:</Text>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={value => setSelectedCategory(value)}
                        style={styles.picker}
                    >
                        {categories.map((category, index) => (
                            <Picker.Item key={index} label={category} value={category} />
                        ))}
                    </Picker>
                </View>
                {filteredPosts.map((post, index) => (
                    <PostItem
                        key={index}
                        post={post}
                        onViewDetails={() => { }}
                        onMakeOffer={() => navigation.navigate("Offers", post)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};


export default BarterExchange;

const styles = StyleSheet.create({
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#e9fce1', //#d6f7bc
        borderRadius: 30
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        //marginRight: 10,
        marginLeft: 15,
        color: 'green',
    },
    picker: {
        height: 40,
        fontSize: 16,
        flex: 1,
        marginRight: 10,
        marginLeft: 5
    }
})
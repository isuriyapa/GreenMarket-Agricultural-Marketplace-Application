import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions, Modal, ScrollView, TextInput } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, orderByChild, ref as databaseRef, push, get, set, query, equalTo, child } from 'firebase/database';
import { app, firebase } from '../../Firebase/FirebaseConfig';
import Header from '../../SharedComponents/Header';

const BarterAvailableOptions = ({ passedData }) => {
    /*const expectedPostId = useRoute(passedData).params.postId;*/
    const expectedCategory = useRoute(passedData).params.category;
    const expectedPostType = useRoute(passedData).params.type;
    const expectedDistrict = useRoute(passedData).params.district;

    const navigation = useNavigation();

    const [userId, setUserId] = useState(null);
    //const [userData, setUserData] = useState(null);
    const [availableOptions, setAvailableOptions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    async function fetchLoggedInUserID() {
        const userUID = await AsyncStorage.getItem('loggedInUserId');
        console.log('USER ID: ', userUID);
        setUserId(userUID);
    }

    const database = getDatabase(app);
    const barterRef = databaseRef(database, `BarterRequests`);

    function barterRequests() {
        get(barterRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = [];
                    for (const key in snapshot.val()) {
                        if (snapshot.val()[key].userId !== userId) {
                            data.push({
                                id: key,
                                ...snapshot.val()[key]
                            });
                        }
                    }
                    setAvailableOptions(data);
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

    const filteredPosts = availableOptions.filter(post => {
        const locationMatch = post.district === expectedDistrict;
        const userUnmatch = post.userId !== userId;
        //const categoryMatch = expectedPostType === "Let's exchange " ? post.postType === expectedPostType : post.postType !== expectedPostType;
        const categoryMatch = expectedPostType === "Let's exchange " ? post.postType === expectedPostType : expectedPostType === 'I need ' ? post.postType === 'I can give ' && post.category === expectedCategory : post.postType !== expectedPostType;

        return userUnmatch && locationMatch && categoryMatch;
    });
    console.log('FILTERED POSTS: ', filteredPosts);

    useEffect(() => {
        fetchLoggedInUserID();
    }, []);

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
            <Text style={{ fontSize: 19, textAlign: 'center', fontWeight: 'bold', marginTop: 15 }}>BARTER EXCHANGE - Available Options</Text>
            <Text style={{ fontSize: 14, marginTop: 5, textAlign: 'center', color: 'black', backgroundColor: 'lightyellow', marginHorizontal: 120, borderRadius: 20 }}>in {expectedDistrict} district</Text>
            <ScrollView style={{marginBottom: 'auto'}}>
                {filteredPosts ?
                    (filteredPosts.map((post, index) => {
                        const daysAgo = Math.floor((Date.now() - post.timestamp) / (1000 * 60 * 60 * 24));
                        return (
                            <View key={index} style={styles.container}>
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
                                        <TouchableOpacity style={styles.offerButton} onPress={() => navigation.navigate('ChatScreen', { from: userId, to: post.userId, postId: post.id })}>
                                            <Text style={styles.offerButtonText}>CONTACT</Text>
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
                                                        <Text style={styles.postedLabel}>Phone number:</Text>
                                                    </View>
                                                    <View style={styles.postedValueContainer}>
                                                        <Text style={styles.postedValue}>{post.userLog.firstName} {post.userLog.lastName}</Text>
                                                        <Text style={styles.postedValue}>{post.userLog.phoneNumber}</Text>
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
                        )
                    })) : (<Text>No any available options at the moment!</Text>)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'green', //#ddd
        marginBottom: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',

        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: 'white',
    },
    leftContent: {
        flex: 1,
        paddingRight: 10,

        alignItems: 'center'
    },
    rightContent: {
        flex: 3,

        marginLeft: 10
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
        paddingHorizontal: 6,
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
        paddingHorizontal: 40,
        borderRadius: 5,
        marginRight: 5,
    },
    offerButton: {
        //backgroundColor: '#28A745',
        backgroundColor: '#ffae00',
        padding: 10,
        borderRadius: 5,

        paddingHorizontal: 30
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
        textAlign: 'center',
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
})

export default BarterAvailableOptions
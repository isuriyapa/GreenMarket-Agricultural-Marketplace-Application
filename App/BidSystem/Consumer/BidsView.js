// import React from 'react';
// import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// const BidsView = ({navigation}) => {
//   const data = [
//     {
//       id: 1,
//       productName: 'Product 1',
//       quantity: '10 Kg',
//       unit: 'Kg',
//       initialPrice: '50',
//       description: 'Description for Product 1',
//     },
//     {
//       id: 2,
//       productName: 'Product 2',
//       quantity: '5 Lb',
//       unit: 'Lb',
//       initialPrice: '30',
//       description: 'Description for Product 2',
//     },
//     {
//         id: 3,
//         productName: 'Product 2',
//         quantity: '5 Lb',
//         unit: 'Lb',
//         initialPrice: '30',
//         description: 'Description for Product 2',
//       }
//     // Add more data as needed
//   ];

//   const renderItem = ({ item }) => (
//     <View style={styles.bidContainer}>
//       <Image source={require('./image.jpg')} style={styles.image} />
//       <View style={styles.productInfo}>
//         <Text style={styles.productName}>{item.productName}</Text>
//         <Text>Quantity: {item.quantity}</Text>
//         <Text>Unit: {item.unit}</Text>
//         {/* <Text>Description: {item.description}</Text> */}
//       </View>
//       <View style={styles.priceContainer}>
//         <Text style={styles.initialPrice}>{item.initialPrice}</Text>
//       </View>
//       <TouchableOpacity style={styles.detailsButton} onPress={navigateToDetailedView}>
//         <Text style={styles.buttonText}>Details</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const navigateToDetailedView = () => {
//     navigation.navigate('ItemDetailsScreen');
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//       />
      
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   bidContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginRight: 10,
//     borderRadius: 10,
//   },
//   bidInfo: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: 'gray',
//     marginBottom: 10,
//   },
//   detailsButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#3498db',
//     padding: 10,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   initialPrice: {
//     color: '#000',
//     fontWeight: 'bold',
//   },
// });

// export default BidsView;

import {React, useCallback,useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity , TextInput} from 'react-native';

import { getDatabase, orderByChild, ref as databaseRef, push, get, set, remove, query, equalTo, child } from 'firebase/database';
import { getDownloadURL, ref as storageRef, uploadString } from 'firebase/storage';
import { getStorage, uploadBytes } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app, firebase } from '../../Firebase/FirebaseConfig';

const BidsView = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [request, setRequest] = useState(null);
  const [requests, setRequests] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [userLog, setUserLog] = useState(null);
  // Your data here


  // const data = [
  //   {
  //     id: 1,
  //     productName: 'Product 1',
  //     quantity: '10 Kg',
  //     category: 'Spices',
  //     initialPrice: '50',
  //     description: 'Description for Product 1',
  //   },
  //   {
  //     id: 2,
  //     productName: 'Product 2',
  //     quantity: '5 Lb',
  //     category: 'Spices',
  //     initialPrice: '30',
  //     description: 'Description for Product 2',
  //   },
  //   {
  //       id: 3,
  //       productName: 'Product 2',
  //       quantity: '5 Lb',
  //       category: 'Spices',
  //       initialPrice: '30',
  //       description: 'Description for Product 2',
  //     }
  //   // Add more data as needed
  // ];

  async function fetchLoggedInUserID() {
    const userUID = await AsyncStorage.getItem('loggedInUserId');
    console.log('USER ID: ', userUID);
    setUserId(userUID);
  }

  const database = getDatabase(app);


  const barterRef = databaseRef(database, `bids`);

  function userBarterRequests() {
    const barterQuery = query(barterRef);

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
            productName: data[id].productName,
            description: data[id].description,
            initialPrice: data[id].initialPrice,

            currentPrice: data[id].currentPrice,

            quantitySum: data[id].unit === 'N/A' ? `${data[id].unit}` : `${data[id].quantity} ${data[id].unit}`,

            quantity: data[id].quantity,
            unit: data[id].unit,
            userLog: data[id].userLog,
            // timestamp: data[id].timestamp,
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

  useFocusEffect(
    useCallback(() => {
      fetchLoggedInUserID();
      if (userId !== null) {
        //loggedInUserData();
        userBarterRequests();
      }
    }, [userId])
  );

  console.log(requests);

  const filteredData = requests ? requests.filter((item) =>
  item.productName.toLowerCase().includes(searchText.toLowerCase())
) : [];

// const filteredData = requests;

// const filteredData = requests;

  const renderItem = ({ item }) => (
    <View style={styles.bidContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text>Quantity: {item.quantity} {item.unit}</Text>
        <Text>{item.category}</Text>
        {/* <Text>Description: {item.description}</Text> */}
      </View>
      <View style={styles.detailsButtonContainer}>
        <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('ItemDetailsScreen', { item })}>
          <Text style={styles.buttonText}>Bid</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.initialPrice}>{item.currentPrice}.00 LKR</Text>
      </View>
    </View>
    
  );


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bidContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    position: 'relative',
    backgroundColor: '#e4f7d0',
    padding: 10,
    paddingTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
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
  detailsButtonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 5,
  },
  detailsButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 10,
    paddingLeft:30,
    paddingRight:30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default BidsView;

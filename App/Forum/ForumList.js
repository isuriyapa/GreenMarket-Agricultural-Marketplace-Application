import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { MenuProvider } from 'react-native-popup-menu';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
// import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
import { getDatabase, ref, onValue, serverTimestamp } from 'firebase/database';
import {app} from '../Firebase/FirebaseConfig';
import Header from '../SharedComponents/Header';
//import TabNavigation from '../BottomTabNavigation'

const ForumList = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  // const [likeCount, setLikeCount] = useState(0);
  // const [UnLikeCount, setUnLikeCount] = useState(0);
  // const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const database = getDatabase(app);
    const forumRef = ref(database, 'forum');
  
    onValue(forumRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const currentTime = Date.now();
        const questionList = Object.keys(data).map((key) => {
          const timestamp = data[key].timestamp; // Assuming 'timestamp' is the property in your data
          const timeAgo = Math.floor((currentTime - timestamp) / (1000 * 60)); // Convert to minutes
          return {
            id: key,
            title: data[key].title,
            question: data[key].question,
            timeAgo,
          };
        });
        
        // Sort the questionList based on the timeAgo value in ascending order
        questionList.sort((a, b) => a.timeAgo - b.timeAgo);
        setQuestions(questionList);
      }
    });
  }, [searchQuery]);
  

  const handleSearch = () => {
    const filtered = questions.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredQuestions(filtered);
  };

  // const handleLike = () => {
  //   setLikeCount(likeCount + 1);
  // };

  // const handleUnLike = () => {
  //   setLikeCount(UnLikeCount + 1);
  // };

  // const handleComment = () => {
  //   setShowCommentModal(true);
  // };


  const renderQuestion = ({ item }) => (
    <TouchableOpacity
      style={styles.questionContainer}
      onPress={() => navigation.navigate('ForumDetail', { question: item })}
    >
      <View style={styles.titleBox}>
        <Text style={styles.titleText}>{item.title}</Text>
      </View>
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{item.question}</Text>
      </View>

      {/* <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLike}>
          <AntDesign name="like1" size={24} color="black" />
          <Text>{likeCount}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleUnLike}>
          <AntDesign name="unlike1" size={24} color="black" />
          <Text>{UnLikeCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleComment}>
          <MaterialIcons name="mode-comment" size={24} color="black" />
          <Text>{commentCount}</Text>
        </TouchableOpacity>

        
      </View> */}

    <View style={styles.timeAgoBox}>
      <Text style={styles.timeAgoText}>
        {item.timeAgo < 60
          ? `${item.timeAgo} minutes ago`
          : item.timeAgo < 1440
          ? `${Math.floor(item.timeAgo / 60)} hours ago`
          : `${Math.floor(item.timeAgo / 1440)} days ago`}
      </Text>
    </View>


    </TouchableOpacity>
  );

  // const renderQuestion = ({ item }) => (
  //   <TouchableOpacity
  //     style={{ marginBottom: 10, borderBottomWidth: 1, paddingBottom: 5 }}
  //     onPress={() => navigation.navigate('ForumDetail', { question: item })}
  //   >
  //     <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
  //     <Text>{item.question}</Text>
  //     <Text>{item.timeAgo} minutes ago</Text>
  //   </TouchableOpacity>
  // );

  return (
    <><Header/>
    <MenuProvider>
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>All Questions</Text>
        <View style={styles.menuIcon}>
        <Menu>
          <MenuTrigger>
            <MaterialCommunityIcons name="menu" size={30} color="black" />
          </MenuTrigger>
          <MenuOptions customStyles={menuOptionsStyles}>
            <MenuOption onSelect={() => navigation.navigate('ForumPost')}>
              <Text style={styles.menuOption}>New</Text>
            </MenuOption>
            <MenuOption onSelect={() => navigation.navigate('MyQuestions')}>
              <Text style={styles.menuOption}>Posted</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        
        </View>
      </View>

      
      <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
    <FlatList
      data={searchQuery.length > 0 ? filteredQuestions : questions}
      renderItem={renderQuestion}
      keyExtractor={(item) => item.id}
    />
    </View>
    </MenuProvider>
    
    </>
    
  );
};

const menuOptionsStyles = {
  optionsContainer: {
    padding: 5,
  },
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    //fontFamily: '',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  menuIcon: {
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    //borderRadius: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  menuOption: {
    fontSize: 20,
    padding: 10,
    color: 'white',
    backgroundColor: 'grey',
    //borderRadius: 5,
  },
  questionContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  titleBox: {
    backgroundColor: '#e3deb3',
    padding: 10,
    marginBottom: 5,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  questionBox: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    marginBottom: 5,
  },
  questionText: {
    // Add your custom styles for the question text
  },
  timeAgoBox: {
    //backgroundColor: '#d9d9d9',
    padding: 10,
    alignItems: 'flex-end',
  },
  timeAgoText: {
    // Add your custom styles for the time ago text
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
  },
});

export default ForumList;





// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { getDatabase, ref, onValue, serverTimestamp } from 'firebase/database';
// import app from '../firebaseConfig';

// const ForumList = ({ navigation }) => {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const database = getDatabase(app);
//     const forumRef = ref(database, 'forum');

//     onValue(forumRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const currentTime = Date.now();
//         const questionList = Object.keys(data).map((key) => {
//           const timeAgo = Math.floor((currentTime - data[key].timestamp) / (1000 * 60));
//           return {
//             id: key,
//             title: data[key].title,
//             question: data[key].question,
//             timeAgo,
//           };
//         });
//         setQuestions(questionList);
//       }
//     });
//   }, []);

//   const renderQuestion = ({ item }) => (
//     <TouchableOpacity
//       style={{ marginBottom: 10, borderBottomWidth: 1, paddingBottom: 5 }}
//       onPress={() => navigation.navigate('ForumDetails', { question: item })}
//     >
//       <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
//       <Text>{item.question}</Text>
//       <Text>{item.timeAgo} minutes ago</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View>
//       <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 10 }}>
//         <Text style={{ fontSize: 24, fontWeight: 'bold' }}>All Questions</Text>
//         {/* Add your menu icon here */}
//       </View>
//       {/* Add your search bar here */}
//       <FlatList
//         data={questions}
//         renderItem={renderQuestion}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// export default ForumList;






// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import app from '../firebaseConfig';

// const ForumList = () => {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const database = getDatabase(app);
//     const forumRef = ref(database, 'forum');

//     onValue(forumRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const questionList = Object.keys(data).map((key) => ({
//           id: key,
//           title: data[key].title,
//           question: data[key].question,
//         }));
//         setQuestions(questionList);
//       }
//     });
//   }, []);

//   const renderQuestion = ({ item }) => (
//     <View style={{ marginBottom: 10, borderBottomWidth: 1, paddingBottom: 5 }}>
//       <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
//       <Text>{item.question}</Text>
//     </View>
//   );

//   return (
//     <View>
//       <FlatList
//         data={questions}
//         renderItem={renderQuestion}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// export default ForumList;

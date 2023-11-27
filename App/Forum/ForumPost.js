import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { getDatabase, ref, push, set, serverTimestamp } from 'firebase/database';
import {app} from '../Firebase/FirebaseConfig';
import Header from '../SharedComponents/Header';

const ForumPost = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  
  useEffect(() => {
    if (title && question) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [title, question]);

  // const handlePost = () => {
  //   const database = getDatabase(app);
  //   const forumRef = ref(database, 'forum');

  //   push(forumRef, { title, question });

  //   // Clear the fields after posting
  //   setTitle('');
  //   setQuestion('');

  //   // Navigate to the ForumList page after posting
  //   navigation.navigate('ForumList');
  // };

  const handlePost = (title, question) => {
    const database = getDatabase(app);
    const forumRef = ref(database, 'forum');

    // Set the data with serverTimestamp
    const newQuestionRef = push(forumRef);
    set(newQuestionRef, {
      title: title,
      question: question,
      timestamp: serverTimestamp(), // Add the timestamp here
      like: 0,
      dislike: 0,
      
    });

    // Clear the fields after posting
    setTitle('');
    setQuestion('');

    // Navigate to the ForumList page after posting
    navigation.navigate('Forum');
  };

  const onCancel = () => {
    // Clear the fields after canceling
    setTitle('');
    setQuestion('');
  };

  return (
    <><Header/>
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/background.avif')} // Change the path to your image
        style={styles.backgroundImage}
        blurRadius={2}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.pageTitle}>You Can Ask Now !!!</Text>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder="Enter title"
          />
          <Text style={styles.label}>Question:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={question}
            onChangeText={(text) => setQuestion(text)}
            placeholder="Enter your question"
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.postButton,
                { backgroundColor: isDisabled ? 'grey' : 'blue' },
              ]}
              onPress={() => handlePost(title, question)}
              disabled={isDisabled}
            >
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
            </View>
        </View>
      </ImageBackground>
    </View>
    </>
  );
};

// Styles...
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.5)', // Adjust the alpha value for the desired opacity
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    opacity: 0.8,
  },
  textArea: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  postButton: {
    //backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: 90, // Set the desired width here
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: 90, // Set the desired width here
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ForumPost;











// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import { getDatabase, ref, push } from 'firebase/database';
// import app from '../firebaseConfig';

// const ForumPost = ({ onCancel, navigation }) => {
//   const [title, setTitle] = useState('');
//   const [question, setQuestion] = useState('');

//   const handlePost = () => {
//     const database = getDatabase(app);
//     const forumRef = ref(database, 'forum');

//     push(forumRef, { title, question });

//     // Clear the fields after posting
//     setTitle('');
//     setQuestion('');

//     // Navigate to the ForumList page after posting
//     navigation.navigate('ForumList');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Title:</Text>
//       <TextInput
//         style={styles.input}
//         value={title}
//         onChangeText={(text) => setTitle(text)}
//         placeholder="Enter title"
//       />
//       <Text style={styles.label}>Question:</Text>
//       <TextInput
//         style={[styles.input, styles.textArea]}
//         value={question}
//         onChangeText={(text) => setQuestion(text)}
//         placeholder="Enter your question"
//         multiline
//       />
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.postButton} onPress={handlePost}>
//           <Text style={styles.buttonText}>Post</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
//           <Text style={styles.buttonText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// // Updated Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     height: 40,
//     width: '100%',
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//   },
//   textArea: {
//     height: 100,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   postButton: {
//     backgroundColor: '#3AB918',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   cancelButton: {
//     backgroundColor: 'red',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//   },
// });

// export default ForumPost;
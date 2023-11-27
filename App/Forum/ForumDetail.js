import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Header from '../SharedComponents/Header';

import {app} from '../Firebase/FirebaseConfig'; // Import the Firebase app instance
import { getDatabase, ref, push, onValue } from 'firebase/database';

const db = getDatabase(app);

const ForumDetails = ({ route }) => {
  const { question } = route.params;
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const commentInputRef = useRef(null);

  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  const [comments, setComments] = useState([]);

  //const [count, setCount] = useState([]);

  const handleLike = () => {
    if (!likeClicked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(0);
    }
    setLikeClicked(!likeClicked);
    if (dislikeClicked) setDislikeClicked(false);
  };

  const handleDisLike = () => {
    if (!dislikeClicked) {
      setDislikeCount(dislikeCount + 1);
    } else {
      setDislikeCount(0);
    }
    setDislikeClicked(!dislikeClicked);
    if (likeClicked) setLikeClicked(false);
  };

  const handleComment = () => {
    setShowCommentModal(true);
  };

  const handleModalClose = () => {
    setShowCommentModal(false);
  };

  // const saveCount = () => {
  //   const count = 
  // }

  // const handleCommentSubmit = () => {
  //   const comment = commentInputRef.current.value;
  //   setComments([...comments, comment]);
  //   setCommentCount(commentCount + 1);
  //   setShowCommentModal(false);
  // };

  const handleCommentSubmit = () => {
    const comment = commentInputRef.current.value;
    // Save comment to Firebase Realtime Database
    const dbRef = ref(db, `comments/${question.id}`);
    push(dbRef, comment);
    setCommentCount(commentCount + 1);
    setShowCommentModal(false);
  };

  useEffect(() => {
    // Retrieve comments from Firebase Realtime Database
    const dbRef = ref(db, `comments/${question.id}`);
    onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const commentList = Object.values(data);
        setComments(commentList);
      }
    });
  }, [question.id]);

  return (
    <><Header/>
    <View style={styles.container}>
      <Text style={styles.title}>{question.title}</Text>
      <View style={styles.box}>
        <Text style={styles.question}>{question.question}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: likeClicked ? 'skyblue' : 'lightgray' }]}
            onPress={handleLike}
          >
            <AntDesign name="like1" size={24} color={likeClicked ? 'white' : 'black'} />
            <Text style={styles.buttonIcons}>{likeCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: dislikeClicked ? 'white' : 'lightgrey' }]}
            onPress={handleDisLike}
          >
            <AntDesign name="dislike1" size={24} color={dislikeClicked ? 'red' : 'black'} />
            <Text style={styles.buttonIcons}>{dislikeCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: 'lightgray' }]} onPress={handleComment}>
            <MaterialIcons name="mode-comment" size={24} color="black" />
            <Text style={styles.buttonIcons}>{commentCount}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentsContainer}>
            {comments.map((comment, index) => (
              <Text key={index} style={styles.comment}>
                {comment}
              </Text>
            ))}
          </View>

        
      </View>

      

      <Modal visible={showCommentModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            ref={commentInputRef}
            placeholder="Write your comment here..."
            style={styles.commentInput}
            multiline
          />
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleModalClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <TouchableOpacity style={styles.submitButton} onPress={saveCount}>
              <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity> */}

    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    
  },
  box: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 'auto',
    marginTop: 10,
    width: '95%', // Make the view wider
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    //marginBottom: 'auto',
    marginTop: 15
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: 'white'
  },
  buttonIcons: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',//'rgba(0, 0, 0, 0.5)',
    marginHorizontal: 25,
    marginVertical: 250,
    borderRadius: 20
  },
  commentInput: {
    backgroundColor: 'white',
    width: '90%',
    height: 150,
    padding: 10,
    marginBottom: 20,
    borderRadius: 15,
    borderColor: 'black'
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  space: {
    width: 20,
  },
  // comment: {
  //   fontSize: 16,
  //   marginTop: 10,
  // },
  comment: {
    fontSize: 16,
    marginTop: 10,
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
  },
  commentsContainer: {
    marginTop: 20,
    width: '100%',
  },
  
});

export default ForumDetails;







// // ForumDetail.js
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';

// const ForumDetails = ({ route }) => {
//   const { question } = route.params;
//   const [likeCount, setLikeCount] = useState(0);
//   const [commentCount, setCommentCount] = useState(0);

//   const handleLike = () => {
//     setLikeCount(likeCount + 1);
//   };

//   const handleComment = () => {
//     setCommentCount(commentCount + 1);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{question.title}</Text>
//       <Text style={styles.question}>{question.question}</Text>

//       <View style={styles.buttonsContainer}>

//         <TouchableOpacity style={styles.button} onPress={handleLike}>
//           <AntDesign name="like1" size={24} color="black" />
//           <Text>{likeCount}</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity style={styles.button} onPress={handleComment}>
//           <MaterialIcons name="mode-comment" size={24} color="black" />
//           <Text>{commentCount}</Text>
//         </TouchableOpacity>

//         {/* Add your rating icon here */}
//       </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   question: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   buttonsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   button: {
//     backgroundColor: 'lightblue',
//     padding: 10,
//     borderRadius: 5,
//   },
// });

// export default ForumDetails;


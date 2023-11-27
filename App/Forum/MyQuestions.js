import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Modal, Pressable, Alert } from 'react-native';
import { getDatabase, ref, onValue, remove, update } from 'firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';

import {app} from '../Firebase/FirebaseConfig';
import Header from '../SharedComponents/Header';

const MyQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedQuestion, setEditedQuestion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const database = getDatabase(app);
    const forumRef = ref(database, 'forum');

    onValue(forumRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const questionList = Object.keys(data).map((key) => ({
          id: key,
          title: data[key].title,
          question: data[key].question,
        }));
        setQuestions(questionList);
      }
    });

    if (editingQuestion && (editedTitle !== editingQuestion.title || editedQuestion !== editingQuestion.question)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [editedTitle, editedQuestion, editingQuestion]);

  const handleDelete = (id) => {
    const confirmDelete = () => {
      const database = getDatabase(app);
      const forumRef = ref(database, `forum/${id}`);
      remove(forumRef)
        .then(() => {
          const updatedQuestions = questions.filter((question) => question.id !== id);
          setQuestions(updatedQuestions);
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    };

    Alert.alert(
      'Confirmation',
      'Are you sure to delete this?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: confirmDelete,
        },
      ],
      { cancelable: false }
    );
  };

  const handleEdit = (item) => {
    setEditingQuestion(item);
    setEditedTitle(item.title);
    setEditedQuestion(item.question);
    setModalVisible(true);
  };

  const handleUpdate = () => {
    const database = getDatabase(app);
    const forumRef = ref(database, `forum/${editingQuestion.id}`);

    const updates = {
      title: editedTitle,
      question: editedQuestion,
    };

    update(forumRef, updates)
      .then(() => {
        setEditingQuestion(null);
        setEditedTitle('');
        setEditedQuestion('');
        setModalVisible(false);
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };

  const renderQuestion = ({ item }) => (
    <View style={styles.questionContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.questionText}>{item.question}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
            <Icon name="trash" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
            <Icon name="pencil" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <><Header/>
    <View style={styles.container}>
      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={(item) => item.id}
      />
      {editingQuestion && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.label}>Title:</Text>
              <TextInput
                value={editedTitle}
                onChangeText={setEditedTitle}
                style={styles.input}
                placeholder="Edit Title"
              />
              <Text style={styles.label}>Question:</Text>
              <TextInput
                value={editedQuestion}
                onChangeText={setEditedQuestion}
                style={styles.input}
                placeholder="Edit Question"
              />
              <View style={styles.buttonContainer}>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.updateButton,
                    { backgroundColor: isDisabled ? 'grey' : 'green' },
                  ]}
                  onPress={() => {
                    Alert.alert(
                      'Confirmation',
                      'Are you sure you want to update?',
                      [
                        {
                          text: 'Cancel',
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: handleUpdate,
                        },
                      ],
                      { cancelable: false }
                    );
                  }}
                  disabled={isDisabled}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  questionContainer: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionText: {
    color: '#555',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ff6347',
  },
  editButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  label: {
    textAlign: 'left',  // Align labels to the left
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',  // Make input fields the same length
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  updateButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyQuestions;

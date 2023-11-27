// import React, { useState } from 'react';
// import { View, Text, TextInput, FlatList, Button } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import { useEffect, useCallback } from 'react';
// import { app } from '../Firebase/FirebaseConfig';
// import { getDatabase, onChildAdded, ref, set, push } from 'firebase/database';

// import Header from '../SharedComponents/Header';

// function ChatScreen() {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');

//     const database = getDatabase(app);
//     const chatRef = ref(database, 'chatMessages');

//     // Listen for new messages
//     /*onChildAdded(chatRef, (snapshot) => {
//         const message = snapshot.val();
//         setMessages([...messages, message]);
//     });*/

//     const sendMessage = (messageText, sender) => {
//         const newMessageRef = push(chatRef); // Generates a new unique key for the message

//         const message = {
//             text: messageText,
//             sender: sender,
//             timestamp: Date.now(), // You can add a timestamp if needed
//         };

//         setMessages([...messages, message]); // Update the UI optimistically

//         setNewMessage(''); // Clear the input field

//         // Push the message to the database
//         set(newMessageRef, message)
//             .then(() => {
//                 console.log('Message sent successfully');
//             })
//             .catch((error) => {
//                 console.error('Error sending message:', error);
//             });
//     };

//     /*const handleSend = () => {
//         if (newMessage) {
//             setMessages([...messages, { text: newMessage, sender: 'user' }]);
//             setNewMessage('');
//         }
//     };*/

//     useFocusEffect(
//         useCallback(() => {

//         }, [messages])
//     );

//     return (
//         <View>
//             <Header />
//             <FlatList
//                 data={messages}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <Text>{item.text}</Text>
//                 )}
//             />


//             {/* Input field for typing a new message */}
//             <TextInput
//                 value={newMessage}
//                 onChangeText={setNewMessage}
//                 placeholder="Type a message..."
//             />

//             {/* Send button to trigger the sendMessage function */}
//             <Button title="Send" onPress={sendMessage} />
//         </View>
//     );
// }

// export default ChatScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { app } from '../Firebase/FirebaseConfig';
import { getDatabase, ref, push, onValue } from 'firebase/database';

import Header from '../SharedComponents/Header';

function ChatScreen() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const database = getDatabase(app);
    const chatRef = ref(database, 'chatMessages');

    useEffect(() => {
        // Listen for new messages
        const unsubscribe = onValue(chatRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert data to an array of messages
                const messageArray = Object.values(data);
                setMessages(messageArray);
            }
        });

        return () => {
            // Unsubscribe from the database when the component unmounts
            unsubscribe();
        };
    }, []);

    const sendMessage = () => {
        if (newMessage) {
            const message = {
                text: newMessage,
                sender: 'user',
                timestamp: Date.now(),
            };

            // Push the message to the database
            const newMessageRef = push(chatRef, message);
            
            // Clear the input field
            setNewMessage('');

            newMessageRef
                .then(() => {
                    console.log('Message sent successfully');
                })
                .catch((error) => {
                    console.error('Error sending message:', error);
                });
        }
    };

    useFocusEffect(
        () => {
            // You can perform additional actions when the component gains focus here
        }
    );

    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                style={styles.messageList}
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.messageText}>{item.text}</Text>
                )}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message..."
                />

                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //padding: 16,
        backgroundColor: '#fff',
    },
    messageList: {
        flex: 1,
        marginBottom: 16,
    },
    messageText: {
        fontSize: 16,
        padding: 8,
        backgroundColor: '#EDEDED',
        borderRadius: 8,
        //marginBottom: 8,
        marginVertical: 8,
        marginHorizontal: 64,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 8,
        borderRadius: 8,
        margin: 16,
    },
    input: {
        flex: 1,
        height: 40,
        marginRight: 8,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
});

export default ChatScreen;
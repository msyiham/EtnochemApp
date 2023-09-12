import { Pressable, TouchableOpacity, Linking, View, FlatList, useWindowDimensions, StyleSheet, Button, TextInput, Text, KeyboardAvoidingView, ScrollView, Platform, ImageBackground, Image } from 'react-native';
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { DocumentData, addDoc, where, getDocs, collection, onSnapshot, orderBy, query, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../../../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import theme from '../../../../theme';
const groupPath = 'ChatGroups/general';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId } from 'react-native-device-info';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LockScreen from '../../LockScreen/LockScreen';

const ChatPage = ({navigation}) => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<any>(null); // Replace 'any' with the correct user data type if available
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE_DB;
  const linkRegex = /(?:^|\s)((?:https?:\/\/)[^\s]+)/gi;

  const isDeviceRegistered = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      console.log(deviceId);
      // Replace 'uniqueCodes' with the collection path where device information is stored in Firestore.
      const codesCollectionRef = collection(firestore, 'uniqueCodes');

      // Query the collection to check if the given 'deviceId' exists in the 'device' array field.
      const q = query(codesCollectionRef, where('device', 'array-contains', deviceId));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking device registration:', error);
      return false;
    }
  };

  useLayoutEffect(() => {
    const checkDeviceRegistration = async () => {
      const registered = await isDeviceRegistered();
      if (!registered) {
        navigation.replace('LockScreen');
      }
    };
    checkDeviceRegistration();
  }, []);

  const flatListRef = useRef<FlatList>(null); // Create a ref for FlatList

  // ... Other functions ...
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToBottom();
    }, 100); // Adjust the delay as needed
  
    return () => clearTimeout(timeout);
  }, []);
  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
    setShowScrollToBottomButton(false);
  };
  
  
  

  const renderTextWithLinks = (text) => {
    const parts = text.split(linkRegex);
    return parts.map((part, index) => {
      if (linkRegex.test(part)) {
        return (
          <Text key={index} style={{ color: '#2980b9' }} onPress={() => Linking.openURL(part)}>
            {part}
          </Text>
        );
      } else {
        return <Text key={index}>{part}</Text>;
      }
    });
  };
  
  const sendMessage = async () => {
    const msg = message.trim();
    if (msg.length === 0) return;

    const msgCollectionRef = collection(FIRESTORE_DB, `${groupPath}/messages`);

    await addDoc(msgCollectionRef, {
      message: msg,
      sender: user.uid,
      createdAt: serverTimestamp(),
    });

    setMessage('');
  };

  useLayoutEffect(() => {
    const msgCollectionRef = collection(FIRESTORE_DB, `${groupPath}/messages`);
    const q = query(msgCollectionRef, orderBy('createdAt', 'asc'));
  
    const unsubscribe = onSnapshot(q, async (groups: DocumentData) => {
      const messages = await Promise.all(
        groups.docs.map(async (messageDoc) => {
          const messageData = messageDoc.data();
          try {
            const userDocRef = doc(FIRESTORE_DB, 'users', messageData.sender);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              // Merge messageData and userData
              return { id: messageDoc.id, ...messageData, username: userData.username, photoURL: userData.photoURL };
            } else {
              return { id: messageDoc.id, ...messageData, username: 'Unknown User', photoURL: 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/default_photo.png?alt=media&token=0dbd1725-a978-427f-a47f-e2ce3f489d1b' };
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
            // In case of error, you might choose to handle it differently or provide a fallback username.
            return { id: messageDoc.id, ...messageData, username: 'Unknown User' };
          }
        })
      );
      setMessages(messages);
    });
  
    return unsubscribe;
  }, []);
  
  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  const renderMessage = ({ item, index }: { item: DocumentData; index: number }) => {
    const myMessage = item.sender === auth.currentUser?.uid;
    const currentDate = new Date(item.createdAt?.toDate());
    const prevItem = index > 0 ? messages[index - 1] : null;
    const prevDate = prevItem ? new Date(prevItem.createdAt?.toDate()) : null;
    const isSameDate =
      prevDate &&
      currentDate.getDate() === prevDate.getDate() &&
      currentDate.getMonth() === prevDate.getMonth() &&
      currentDate.getFullYear() === prevDate.getFullYear();
  
    return (
      <View>
        {!isSameDate && (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{currentDate.toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year:'numeric' })}</Text>
          </View>
        )}
        <View style={[styles.messageContainer, myMessage ? styles.userMessageContainer : styles.otherMessageContainer]}>
        <View style={{flexDirection:'row'}}>
          <Image source={{ uri: item.photoURL || 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/default_photo.png?alt=media&token=0dbd1725-a978-427f-a47f-e2ce3f489d1b' }} style={styles.avatar} />
          <Text style={[styles.userName, {marginTop: height*0.015, marginEnd: width*0.05}]}>{item.username}</Text>
        </View>
        <View style={[ myMessage ? styles.userMessageContent : styles.otherMessageContent]}>
          <Text style={styles.messageText}>{renderTextWithLinks(item.message)}</Text>
          <Text style={styles.time}>{currentDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</Text>
        </View>
        </View>
      </View>

    );
  };

  

  if (!auth.currentUser) {
    return null; // or show a loading screen or a login screen
  }

  return (
    <ImageBackground style={styles.container} source={require('../../../../asset/bg-putih.png')}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior='height'
        keyboardVerticalOffset={30} // Adjust this value as needed
      >
        <View style={[styles.headerContainer, { height: height * 0.07 }]}>
          <Text style={styles.title}>AYO DISKUSI</Text>
        </View>
        <View style={{flex: 1}}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          onContentSizeChange={scrollToBottom}
          onLayout={scrollToBottom}
          onScroll={(event) => {
            const offsetY = event.nativeEvent.contentOffset.y;
            if (offsetY > 10) {
              setShowScrollToBottomButton(false);
            } else {
              setShowScrollToBottomButton(true);
            }
          }}
        />
        </View>
        {showScrollToBottomButton && (
          <TouchableOpacity
            onPress={scrollToBottom}
            style={[styles.buttonScrollToBottom, { width: width * 0.07, top: height * 0.8, left: width * 0.9, height: width * 0.07, borderRadius: width * 0.07 }]}
          >
            <FontAwesome5 name={'chevron-down'} size={19} color={'black'} />
          </TouchableOpacity>
        )}
        <View style={styles.inputContainer}>
          <TextInput multiline value={message} onChangeText={(text) => setMessage(text)} placeholder="Ketik Pesan.." placeholderTextColor={'black'} style={styles.messageInput} />
          <TouchableOpacity onPress={sendMessage} style={{width: width*0.06, paddingTop:height*0.01,}}>
            <FontAwesome5 name={'paper-plane'} size={20} color={'black'} solid={message !== ''} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    backgroundColor: '#746555',
  },
  messageInput: {
    color:'white',
    width: '90%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
  },
  messageContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  buttonScrollToBottom:{
    position: 'absolute',
    backgroundColor:'gray',
    alignItems: 'center',
    justifyContent:'center',
  },
  userMessageContainer: {
    alignSelf: 'flex-start',
  },
  userMessageContent: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '100%',
    borderWidth: 1,
    backgroundColor: '#C9B8A8',
  },
  otherMessageContent: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '100%',
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  otherMessageContainer: {
    alignSelf: 'flex-end',
  },
  userName: {
    fontSize: 14,
    fontFamily: theme.font.bold,
    color: 'black',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageText: {
    fontSize: 14,
    fontFamily: theme.font.regular,
    color: 'black',
  },
  time: {
    fontSize: 10,
    fontFamily: theme.font.regular,
    color: 'black',
    alignSelf: 'flex-end',
  },
  dateContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor:'gray',
    width: '40%',
    borderRadius: 20,
  },
  dateText: {
    fontSize: 10,
    color: 'white',
    fontFamily: theme.font.regular,
  },
  title:{
    fontFamily: theme.font.bold,
    fontSize: 15,
    color: 'white'
  },
  headerContainer: {
    padding: 10,
    backgroundColor: '#746555',
    alignItems: 'center',
  },
});

export default ChatPage;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import theme from '../../../../../../../theme';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../../../../../../FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';

const BeforePreTest = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    const auth = FIREBASE_AUTH;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can access the UID
        const uid = user.uid;
        fetchTotalPointsFromFirestore(uid);
        console.log('User UID:', uid);
      } else {
        // User is signed out
        console.log('User is signed out.');
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const fetchTotalPointsFromFirestore = async (uid) => {
    try {
      const firestore = FIRESTORE_DB;
      const docRef = doc(firestore, 'users', uid);

      // Check if the document exists in Firestore for the given UID
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const totalPointsPreTest = userData.totalPointsPreTest || 0;
        setTotalPoints(totalPointsPreTest);
      }
    } catch (error) {
      console.error('Error fetching total points from Firestore:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../../../../../../asset/bg-coklat-tua.png')}
      style={styles.container}
    >
      <View style={[styles.card, { width: width * 0.8, height: height * 0.65 }]}>
        <View style={[styles.cardHeader, { width: width * 0.8, height: height * 0.08 }]}>
          <Image
            style={[styles.wrapperLayout, { width: width * 0.17, height: height * 0.056 }]}
            resizeMode="cover"
            source={require('../../../../../../../asset/logo-panjang.png')}
          />
          <View style={[styles.garis, { height: height * 0.04 }]}></View>
          <View style={[styles.titleBox, { width: width * 0.5, height: height * 0.078 }]}>
            <Text style={styles.title}>Pre-Test</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', justifyContent:'center', height:height*0.5 }}>
          {totalPoints > 0 ? (
            
            <Text style={styles.text}>Anda sudah mengerjakan Pre-Test{'\n'}Point Anda Sebelumnya{'\n'} <Text style={{fontSize: 30, fontFamily:theme.font.bold}}>{totalPoints*20}/100</Text> </Text>
          ) : (
            <Text style={styles.text}>Anda belum mengerjakan tes</Text>
          )}
          <TouchableOpacity
            style={[styles.button, { width: width * 0.3, height: height * 0.05, marginTop: height * 0.05 }]}
            onPress={() => navigation.replace('PreTest')}
          >
            <Text style={styles.buttonText}>Pergi Tes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapperLayout: {
    marginEnd: 5,
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
  garis: {
    flexDirection: 'column',
    borderEndWidth: 2,
    marginEnd: 5,
    marginTop: 15,
    borderEndColor: 'black',
  },
  title: {
    fontSize: 18,
    margin: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: theme.font.bold,
    color: 'black',
  },
  titleBox: {
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 10,
    fontSize: 20,
    fontFamily: theme.font.regular,
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#C9B8A8',
    marginTop: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
    fontFamily: theme.font.bold,
  },
});

export default BeforePreTest;

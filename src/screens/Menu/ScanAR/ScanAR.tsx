import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId } from 'react-native-device-info';
import { where, getDocs, collection, query } from 'firebase/firestore';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../../../FirebaseConfig';
// import { UnityModule, UnityView }  from 'react-native-unity-view';

const AFrameView = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE_DB;
  
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

  const onMessage = (event) => {
    console.log('OnUnityMessage: ' + event.nativeEvent.message); // OnUnityMessage: click
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

  return (
    <View style={styles.container}>
      {/* <UnityView
        style={styles.unity}
        onMessage={onMessage}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  unity: {
    flex: 1, // You can adjust this style as needed
  },
});

export default AFrameView;

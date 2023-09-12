import React, {useLayoutEffect} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId } from 'react-native-device-info';
import { where, getDocs, collection, query } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../../FirebaseConfig';
const ChemAI = ({navigation}) => {
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
      <WebView style={styles.webview}
        source={{ uri: 'https://nimble-custard-087481.netlify.app/bot' }}
        originWhitelist={['*']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDE0B3",
    width: "100%",
    height: "100%",
  },
  webview:{
    flex: 1,
  },
});

export default ChemAI;
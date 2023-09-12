import { StyleSheet, Text, View, ImageBackground, TextInput, useWindowDimensions, Alert, TouchableOpacity } from 'react-native'; // Import Alert to handle errors
import React, { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIRESTORE_DB } from '../../../FirebaseConfig';
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import theme from '../../../theme';
import Spinner from 'react-native-loading-spinner-overlay';
import SweetAlert from "react-native-sweet-alert";

const UniqueCode = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const firestore = FIRESTORE_DB;

  const [inputCode, setInputCode] = useState('');

  console.log("firestore: ", firestore);
  console.log("FIRESTORE_DB: ", FIRESTORE_DB);

  const saveCode = async () => {
    try {
      setLoading(true);
      const deviceId = await DeviceInfo.getUniqueId();
      //const deviceId = "device5";
      console.log("deviceId: ", deviceId);

      // Check if the document already exists in the Firestore collection
      const codeDocRef = doc(firestore, 'uniqueCodes', inputCode);
      const codeDocSnapshot = await getDoc(codeDocRef);

      if (!codeDocSnapshot.exists()) {
        // If the document does not exist, create a new document with the initial device ID
        SweetAlert.showAlertWithOptions({
          style:'error',
          title: 'Error',
          subTitle: 'Kode Tidak Valid',
          confirmButtonTitle: 'OK',
        });
      } else {
        // If the document already exists, check if the deviceId is already registered
        const existingDevices = codeDocSnapshot.data()?.device || [];

        if (existingDevices.includes(deviceId)) {
          // Show SweetAlert if deviceId is already registered for this code
          SweetAlert.showAlertWithOptions({
            title: 'Perangkat Sudah Terdaftar',
            subTitle: 'Perangkat dengan ID ini sudah terdaftar untuk kode ini.',
            confirmButtonTitle: 'OK',
          });
        } else if (existingDevices.length >= 4) {
          // Show SweetAlert if the maximum limit of devices (4) has been reached
          SweetAlert.showAlertWithOptions({
            title: 'Batas Jumlah Perangkat',
            subTitle: 'Jumlah perangkat sudah mencapai batas maksimum (4).',
            confirmButtonTitle: 'OK',
          });
        } else {
          // Add the new device to the Firestore document
          const updatedDevices = [...existingDevices, deviceId];
          await updateDoc(codeDocRef, {
            device: updatedDevices,
          });
          navigation.replace('Home');
          SweetAlert.showAlertWithOptions({
            style: 'success',
            title: 'Selamat',
            subTitle: 'Semua fitur sudah bisa anda akses',
            confirmButtonTitle: 'OK',
          });
          console.log("berhasil");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <ImageBackground source={require('../../../asset/bg-putih.png')} style={styles.imageBg}>
      <Spinner visible={loading} />
      <View style={[styles.container, { width: width * 0.7, height: height * 0.3 }]}>
        <Text style={styles.title}>KODE UNIK</Text>
        <View style={[styles.inputContainer, { width: width * 0.65 }]}>
          <TextInput
            placeholder='Masukkan Kode'
            placeholderTextColor={'gray'}
            style={styles.input}
            value={inputCode}
            onChangeText={setInputCode}
          />
        </View>
        <TouchableOpacity style={[styles.button, { width: width * 0.5, height: height * 0.05, marginTop: height * 0.03 }]} onPress={saveCode}>
          <Text style={styles.buttonText}>Simpan Kode</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default UniqueCode;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'black',
    fontFamily: theme.font.regular,
  },
  title: {
    color: 'black',
    fontFamily: theme.font.bold,
    fontSize: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  container: {
    backgroundColor: '#C9B8A8',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#8D7B68',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontFamily: theme.font.regular,
    fontSize: 15,
  },
});

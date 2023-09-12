import React, {useLayoutEffect, useState} from "react";
import { Image, TouchableOpacity, StyleSheet, View, ScrollView, Text, ImageBackground, FlatList,useWindowDimensions } from "react-native";
import Button from "../../../../../components/ButtonPanjang/ButtonPanjang";
import theme from "../../../../../../theme";
import Pdf from 'react-native-pdf';
import { FIRESTORE_DB } from "../../../../../../FirebaseConfig";
import { DocumentData, addDoc, where, getDocs, collection, onSnapshot, orderBy, query, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId } from 'react-native-device-info';
const FlipBook = ({navigation}) => {

  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [isRegistered, setIsRegistered] = useState(false);
  const firestore = FIRESTORE_DB;

  const viewPressed = () => {
    
    if (!isRegistered) {
      navigation.navigate('LockedPdf');
    } if (isRegistered) {
      navigation.navigate('PdfViewer');
    }
  };
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
      setIsRegistered(registered); // Set the state based on whether the device is registered or not
    };
    checkDeviceRegistration();
  }, []);
  const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/PEMBELAJARAN%20ASAM%20BASA.pdf?alt=media&token=e60397d5-1b71-4ada-af74-228390f7356f', cache: true };
  console.log(source);
  return (
    <ImageBackground source={require('../../../../../../asset/bg-coklat-tua.png')} style={styles.container}>
          <View style={[styles.card, {width : width * 0.88, height: height *0.8}]}>
            <View style={[styles.cardHeader, {width : width * 0.8, height: height *0.08}]}>
                <Image
                      style={[styles.wrapperLayout, {width : width * 0.17, height : height * 0.056}]}
                      resizeMode="cover"
                      source={require("../../../../../../asset/logo-panjang.png")}
                />
                <View style={[styles.garis, {height: height*0.04}]}></View>
                <View style={[styles.titleBox, {width: width*0.5, height: height*0.078}]}>
                  <Text style={styles.title}>Flip Book</Text>
                </View>
            </View>
            <View style={{height:height*0.6, marginTop: height*0.03}}>
                  <Pdf
                    trustAllCerts={false}
                    source={source}
                    singlePage={true}
                    style={{width:width*0.8, height:height*0.6}}/>
            </View>
            <Button onPress={viewPressed} title="buka"/>
          </View>     
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapperLayout: {
    marginEnd:5,
    marginTop: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor:'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection:'row',
    justifyContent:'center',
    borderBottomColor:'black',
    borderBottomWidth: 2,
  },
  garis: {
    flexDirection:'column',
    borderEndWidth: 2,
    marginEnd:5,
    marginTop: 15,
    borderEndColor: 'black',
  },
  title: {
    fontSize: 17,
    margin:5,
    fontFamily: theme.font.bold,
    textAlignVertical:'center',
    textAlign:'center',
    color: 'black',
  },
  titleBox:{
    justifyContent:'center',
  },

});

export default FlipBook;

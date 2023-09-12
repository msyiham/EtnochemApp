import React, { useState, useEffect, useRef } from 'react';
import { Animated, Alert, View, Image, Text, StyleSheet, Dimensions, useWindowDimensions, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView ,ScrollView } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CustomeBar from '../../components/CustomBar';
import CustomInput from '../../components/CustomInput2/CustomInput2';
import theme from '../../../theme';
import { FIREBASE_AUTH, FIRESTORE_DB, FIREBASE_STORAGE } from '../../../FirebaseConfig';
import { doc, getDoc, updateDoc, query } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import * as ImagePicker from 'react-native-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import LoadingScreen from '../../components/Loading';

const EditProfile = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [alamat, setAlamat] = useState('');
  const [fullName, setFullName] = useState('');
  const [userDataPhotoURL, setuserDataPhotoURL] = useState(null);
  const [noHp, setNoHp] = useState('');
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [user, setUser] = useState();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE_DB;
  const storage = FIREBASE_STORAGE;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserData(user.uid);
      }
    });
    return () => unsubscribe();
  }, [user]);
  const [selectedImage, setSelectedImage] = useState(null);
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/default_photo.png?alt=media&token=0dbd1725-a978-427f-a47f-e2ce3f489d1b';

// handleImagePicker function
// Separate function to handle image upload
const uploadImage = async (imageBlob) => {
  try {
    const uid = user.uid;
    const imageRef = ref(storage, `${uid}.jpg`);

    // Upload the Blob to Firebase Storage
    await uploadBytes(imageRef, imageBlob, { contentType: 'image/jpeg' });

    // Get the download URL for the uploaded image
    const photoURL = await getDownloadURL(imageRef);

    return photoURL;
  } catch (error) {
    console.log('Error uploading image:', error);
    throw error;
  }
};
const changePassword= () => {
  navigation.reset({
    index: 0,
    routes: [{ name: 'ForgotPassword' }],
  });
};
// handleImagePicker function
const handleImagePicker = async () => {
  const options = {
    mediaType: 'photo',
  };

  try {
    const response = await ImagePicker.launchImageLibrary(options);

    console.log('Response:', response); // Check the response in the console

    if (!response.didCancel && !response.error) {
      const image = { uri: response.assets[0].uri };
      setSelectedImage(image);

      console.log('Selected Image:', image); // Check the selected image in the console

      const imageResponse = await fetch(image.uri);
      const blob = await imageResponse.blob();

      console.log('Blob:', blob); // Check the blob in the console

      const photoURL = await uploadImage(blob);
      console.log('Photo URL:', photoURL); // Check the photo URL in the console

      await updatePhoto(photoURL);
    }
  } catch (error) {
    console.log('Error handling image picker:', error);
    // Handle error if needed
  }
};



  
  
const fetchUserData = async (uid) => {
  try {
    const userDocRef = doc(firestore, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      setUserName(userData.username);
      setAlamat(userData.alamat);
      setFullName(userData.fullName);
      setNoHp(userData.noHp);

      // Check if photoURL exists before setting selectedImage
      if (userData.photoURL) {
        setuserDataPhotoURL(userData.photoURL);
      } else {
        setuserDataPhotoURL(null); // Set selectedImage to null if photoURL is empty
      }

      console.log("photoURL: " + userData.photoURL);
    }
  } catch (error) {
    console.log('Error fetching user data:', error);
  }
};

  

  const showConfirmUpdate = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin memperbarui pengguna?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Ya', onPress: updateUser },
      ]
    );
  };

  const updateUser = async () => {
    
    try {
      const uid = user.uid;
      const userDocRef = doc(firestore, 'users', uid);
      setLoading(true);
      await updateDoc(userDocRef, {
        username: userName,
        alamat: alamat, // Gunakan URL foto yang diperoleh dari uploadImage
        fullName: fullName,
        noHp: noHp,
      });
  
      // Show success alert
      SweetAlert.showAlertWithOptions({
        title: 'Selamat',
        subTitle: 'Anda Berhasil Mengupdate',
        confirmButtonTitle: 'OK',
        style: 'success',
        cancellable: false,
      });
  
      console.log('User updated successfully!');
    } catch (error) {
      setLoading(true);
      console.log('Error updating user:', error);
  
      // Show error alert
      SweetAlert.showAlertWithOptions({
        title: 'Error',
        subTitle: `Update Failed: ${error.message}`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#746555',
      });
    } finally {
      setLoading(false);
    }
  };
  const updatePhoto = async (photoURL) => {
    
    try {
      const uid = user.uid;
      const userDocRef = doc(firestore, 'users', uid);
      setLoading(true);
      await updateDoc(userDocRef, {
        photoURL: photoURL, // Gunakan URL foto yang diperoleh dari uploadImage
      });
  
      // Show success alert
      SweetAlert.showAlertWithOptions({
        title: 'Selamat',
        subTitle: 'Anda Berhasil Mengupdate Foto Profil',
        confirmButtonTitle: 'OK',
        style: 'success',
        cancellable: false,
      });
  
      console.log('User updated successfully!');
    } catch (error) {
      console.log('Error updating user:', error);
      setLoading(true);
      // Show error alert
      SweetAlert.showAlertWithOptions({
        title: 'Error',
        subTitle: `Update Failed: ${error.message}`,
        confirmButtonTitle: 'OK',
        confirmButtonColor: '#746555',
      });
    }finally {
      setLoading(false);
    }
  };
  
  
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
    isMenuVisible ? rotateIconClose() : rotateIconOpen();
  };  
  const rotationValue = useRef(new Animated.Value(0)).current;
  const rotateIconOpen = () => {
    Animated.timing(rotationValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const rotateIconClose = () => {
    Animated.timing(rotationValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <ImageBackground source={require('../../../asset/bg-putih.png')} style={styles.imageBg}> 
        <LoadingScreen visible={isLoading}/>
        <View style={styles.header}>
          <TouchableOpacity style={{width:width*0.1}} onPress={()=>navigation.goBack()}>
            <Icon name="arrow-left" size={25} color="#fff"/>
          </TouchableOpacity>
          <View style={{width:width*0.9}}>
          <Text style={styles.headerText}>Edit Profil Pengguna</Text>
          </View>
        </View>
        <KeyboardAvoidingView style={{justifyContent:'center', height:height*0.9}}>
          <View style={styles.containerProfile}>
            <TouchableOpacity onPress={handleImagePicker} style={[styles.editIconContainer, { width: width * 0.09, height: height * 0.05, marginEnd: width*0.07, right: width * 0.19, top: height * 0.15 }]}>
              <Icon name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
            <Image
              source={
                selectedImage
                  ? { uri: selectedImage.uri } // Menggunakan URI dari selectedImage
                  : (userDataPhotoURL ? { uri: userDataPhotoURL } : { uri: defaultImage })
              }
              style={styles.image}
            />

            </View>
            <View style={[styles.UserNameContainer, { width: width * 0.8, height: height * 0.1 }]}>
              <View style={{ height: height * 0.08, width: width * 0.9 }}>
                <TextInput
                  value={userName}
                  onChangeText={setUserName}
                  placeholder={"Nama Pengguna"}
                  placeholderTextColor="#8D7B68"
                  style={styles.userName}
                />
              </View>
            </View>
            <View>
              <CustomInput
                placeholder="Nama Lengkap"
                value={fullName}
                setValue={setFullName}
              />
              <CustomInput
                placeholder="No. HP"
                value={noHp}
                setValue={setNoHp}
              />
              <CustomInput
                placeholder="Alamat"
                value={alamat}
                setValue={setAlamat}
              />
            </View>
            <TouchableOpacity onPress={showConfirmUpdate} style={[styles.button, { width: width * 0.4, height: height * 0.06 }]}>
              <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    right: 10,
    backgroundColor: '#C9B8A8',
    padding: 10,
    borderRadius: 10,
    zIndex: 2,
  },
  menuItem: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  menuItemText: {
    color: 'black',
    fontFamily: theme.font.regular,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: '#C9B8A8',
    marginBottom: 10,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  menuBar: {
    margin: 10,
  },
  menuText: {
    textAlign: 'center',
    color: 'black',
    fontFamily: theme.font.regular,
  },
  menuTextActive: {
    textAlign: 'center',
    color: 'white',
    textDecorationLine: 'underline',
    fontFamily: theme.font.bold,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBg: {
    flex: 1,
  },
  userName: {
    fontSize: 23,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: theme.font.bold,
    color: '#8D7B68',
  },
  containerProfile: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  UserNameContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  editIconContainer: {
    position: 'absolute',
    backgroundColor: '#8E7C68',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  menu: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  menuIconContainer: {
    transform: [{ rotate: '0deg' }],
  },
  editNameContainer: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  imageContainer: {
    width: 170,
    height: 170,
    borderRadius: 85,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#746555',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: theme.font.bold,
  },
  header:{
    backgroundColor:'#8E7C68',
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerText: {
    textAlign:'center',
    fontFamily: theme.font.bold,
    color:'black',
    fontSize: 20,
  }
});

export default EditProfile;

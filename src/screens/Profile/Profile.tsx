import React, { useState, useCallback } from 'react';
import { Animated, Alert, View, Image, Text, StyleSheet, Dimensions, useWindowDimensions, TextInput, ImageBackground, TouchableOpacity, KeyboardAvoidingView ,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import SweetAlert from 'react-native-sweet-alert';
import theme from '../../../theme';
import { useFocusEffect } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH, FIRESTORE_DB, FIREBASE_STORAGE } from '../../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import {CommonActions} from '@react-navigation/native';
const Profile = ({ navigation }) => {

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE_DB;
  const [user, setUser] = useState();
  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoUrl] = useState(null);
  useFocusEffect(
    useCallback(() => {
      // Mengambil semua dokumen dari koleksi "DataBook"
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          setEmail(user.email);
          fetchUserData(user.uid);
        }
      });
      return () => unsubscribe();
    }, [user])
  );

  const fetchUserData = async (uid) => {
    try {
      const userDocRef = doc(firestore, 'users', uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUserName(userData.username);
        setFullName(userData.fullName);
        if (userData.photoURL) {
          setPhotoUrl(userData.photoURL);
        } else {
          setPhotoUrl(null); // Set selectedImage to null if photoURL is empty
        }
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };
  // LOGOUT
  const showConfirmLogOut = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah Anda yakin ingin keluar akun?',
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Ya', onPress: logout },
      ]
    );
  };
  const logout = () => {
    signOut(auth).then(() => navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      })
    ));
    console.log('Logged out');
    SweetAlert.showAlertWithOptions(
      {
        subTitle: 'Anda Berhasil Keluar Akun',
        confirmButtonTitle: 'YA',
        confirmButtonColor: '#000',
        style: 'success',
        cancellable: true
      },
    );
  };
  const changePassword= () => {
    navigation.navigate('ForgotPassword');
  };
  
  return (
    <ImageBackground source={require('../../../asset/bg-putih.png')} style={styles.container}> 
        <View style={[styles.bar, { width: windowWidth * 0.9, height: windowHeight * 0.05, marginTop: windowHeight * 0.08, }]}>
            <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.menuText}>Beranda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('TentangKami')}>
              <Text style={styles.menuText}>Tentang Kami</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('Profil')}>
              <Text style={styles.menuTextActive}>Akun</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.cardProfile, {width: width*0.9, borderRadius: width*0.05, paddingVertical: height*0.03, marginVertical: height*0.02}]}>
          <Image source={{ uri: photoURL || 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/default_photo.png?alt=media&token=0dbd1725-a978-427f-a47f-e2ce3f489d1b' }} style={[styles.avatar, {width: width*0.25, height:width*0.25, borderRadius:width*0.25, marginStart: width*0.02}]}/>
          <View style={{paddingLeft:10, flex:1}}>
            <View style={{alignItems:'flex-end', marginRight:width*0.05}}>
                <Icon name="pencil" size={20} color="#4A4A4A" onPress={()=>navigation.navigate('EditProfile')}/>
            </View>
            <Text style={styles.userName}>Halo <Text style={{fontFamily:theme.font.bold}}>{userName}</Text></Text>
            <Text style={styles.fullName}>{fullName}</Text>  
            <Text style={styles.email}>{email.length > 25 ? email.slice(0, 25) + '...' : email}</Text>  
          </View>
        </View>
        <View style={[styles.cardVip, {width:width*0.9}]}>
          <View style={styles.cardVipHeader}>
            <Text style={styles.cardVipTitle}>Dapatkan Semua Akses Fitur</Text>
            <Image style={{width:width*0.07, height:width*0.07}} source={require('../../../asset/crown.png')}/>
          </View>
          <Text style={styles.cardVipText}>Anda dapat mengakses semua fitur yang dibatasi. Anda tinggal memasukkan kode yang anda dapatkan dalam kit ETNOCHEM untuk dapatkan pembelajaran yang lebih menarik..!</Text>
          <View style={[styles.cardVipButtonContainer, {paddingHorizontal: width*0.1, paddingVertical: height*0.01}]}>
            <TouchableOpacity style={[styles.cardVipButton, {width: width*0.32, height:height*0.04}]} onPress={()=>navigation.navigate('UniqueCode')}>
              <Text style={styles.cardVipButtonText}>Masukkan Kode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cardVipButton, {width: width*0.32, height:height*0.04}]}>
              <Text style={styles.cardVipButtonText}>Dapatkan Kit <Icon name="shopping-cart" size={18} color="#000"/></Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width:width*0.9, marginTop: height*0.08}}>
          <View style={styles.settingHeader}>
            <Text style={styles.settingTitle}>Pengaturan Akun</Text>
          </View>
          <TouchableOpacity onPress={changePassword}  style={[styles.settingButton, styles.changePasswordButton]}>
            <Text style={styles.settingButtonText}>Ubah Kata Sandi</Text>
            <Icon name="key" size={18} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={showConfirmLogOut} style={[styles.settingButton, styles.logoutButton]}>
            <Text style={styles.settingButtonText}>Keluar Akun</Text>
            <Icon name="sign-out" size={18} color="#000" />
          </TouchableOpacity>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'center',
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
  userName:{
    color:'black',
    fontSize: 20,
    fontFamily: theme.font.regular,
  },
  fullName:{
    color:'black',
    fontSize: 15,
    fontFamily: theme.font.regular,
  },
  email:{
    color:'black',
    fontSize: 12,
    fontFamily: theme.font.regular,
  },
  avatar:{
    borderWidth: 1,
    borderColor:"black",
  },
  cardProfile:{
    flexDirection:'row',
    borderWidth: 1,
    backgroundColor: 'rgba(142, 124, 104, 0.7)',
  },
  cardVip:{
    backgroundColor: '#8E7C68',
    borderWidth: 5,
    borderColor: '#60564b',
    borderRadius: 10,
    padding:5,
  },
  cardVipHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  cardVipTitle:{
    fontSize: 16,
    color:"white",
    fontFamily: theme.font.bold,
  },
  cardVipText:{
    color:"#E4E5DB",
    fontFamily: theme.font.regular,
    fontSize: 13,
  },
  cardVipButtonContainer:{
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  cardVipButton:{
    backgroundColor:'white',
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
  },
  cardVipButtonText:{
    color:'black',
    fontSize: 14,
    fontFamily: theme.font.regular
  },
  settingHeader:{
    borderBottomWidth: 2,
    borderColor: 'black',
    marginBottom: 10,
  },
  settingTitle:{
    color:'black',
    fontSize: 18,
    fontFamily: theme.font.bold,
  },
  settingButton:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  settingButtonText:{
    color:'black',
    fontSize: 15,
    fontFamily: theme.font.regular,
  },
  changePasswordButton:{
    backgroundColor:'white',
  },
  logoutButton:{
    backgroundColor:'#B29E87',
  }
  
});

export default Profile;

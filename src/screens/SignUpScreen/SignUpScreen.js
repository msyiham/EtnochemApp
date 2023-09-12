import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import theme from '../../../theme';
import { createUserWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../FirebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import SweetAlert from "react-native-sweet-alert";
import Spinner from 'react-native-loading-spinner-overlay';
import PasswordInput from '../../components/PasswordInput';
import LoadingScreen from '../../components/Loading';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const firestore = FIRESTORE_DB;
  const [loading, setLoading] = useState(false);

  const onPasswordChange = (text) => {
    setPassword(text); // Set the password in the state
  };
  const onSignUpPressed = async () => {
    try {
      setLoading(true);
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
  
      // Add user data to Firestore with UID as the document ID
      await setDoc(doc(firestore, 'users', user.uid), {
        username: username,
        email: user.email,
        uid: user.uid,
        alamat: "",
        fullName: "",
        noHp: "",
        totalPointsPostTest: 0,
        totalPointsPreTest: 0,
      });
  
      console.log(response);
      navigation.replace('SignIn');
      SweetAlert.showAlertWithOptions({
        title: 'Selamat',
        subTitle: `Anda Berhasil Mendaftar, ${username}!`, // Add username here
        confirmButtonTitle: 'OK',
        style: 'success',
        cancellable: false,
      });
    } catch (error) {
      console.log(error);
      if (!email || !password || !username) {
        SweetAlert.showAlertWithOptions({
          title: 'Gagal',
          subTitle: 'Tolong lengkapi input!',
          confirmButtonTitle: 'OK',
          style: 'error',
          cancellable: false,
        });
      }  else if (error.code === 'auth/email-already-in-use') {
        SweetAlert.showAlertWithOptions({
          title: 'Gagal',
          subTitle: 'Email anda sudah terdaftar, silahkan Login!',
          confirmButtonTitle: 'OK',
          style: 'error',
          cancellable: false,
        });
      } else if (error.code === 'auth/invalid-email') {
        SweetAlert.showAlertWithOptions({
          title: 'Gagal',
          subTitle: 'Gunakan email yang valid',
          confirmButtonTitle: 'OK',
          style: 'error',
          cancellable: false,
        });
      } else {
        SweetAlert.showAlertWithOptions({
          title: 'Error',
          subTitle: `Sign up failed: ${error.message}`,
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#746555',
        });
      }

    } finally {
      setLoading(false);
    }
  };
  

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
      <ImageBackground source={require('../../../asset/bg-putih.png')} style={styles.root}>
        <View style={styles.card}>
          <LoadingScreen visible={loading} />
          <Text style={styles.title}>Buat Akun</Text>

          <CustomInput keyboardType='email-address' placeholder="Email" value={email} setValue={setEmail} />
          <CustomInput placeholder="Username" value={username} setValue={setUsername} />
          <PasswordInput onPasswordChange={onPasswordChange}/>
          <CustomButton bgColor={'#746555'} text="Register" onPress={onSignUpPressed} />


          <View style={{flexDirection:'row', alignItems: 'center',justifyContent: 'center', margin:15}}>
            <Text style={styles.text}>Sudah Punya Akun? </Text>
            <TouchableOpacity onPress={onSignInPress}><Text style={styles.link}>Masuk</Text></TouchableOpacity>
          </View>
        </View>

      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily:theme.font.bold,
    color: '#746555',
    alignSelf:'center',
    margin: 10,
  },
  text: {
    color: 'gray',
    fontFamily: theme.font.regular,
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
    fontFamily: theme.font.bold,
  },
  card: {
    padding: 20,
    backgroundColor:'#C9B8A8',
    width: '90%',
    borderRadius: 20,
  },
  text: {
    alignSelf:"center",
    color: "black",
  },
  link: {
    fontFamily: theme.font.bold,
    color: "black",
  },
});

export default SignUpScreen;

import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Modal,
  StyleSheet,
  useWindowDimensions,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
} from 'react-native';
import Logo from '../../../asset/LOGO.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import theme from '../../../theme';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../../FirebaseConfig';
import {signInWithEmailAndPassword} from "firebase/auth";
import SweetAlert from "react-native-sweet-alert";
import Spinner from 'react-native-loading-spinner-overlay';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PasswordInput from '../../components/PasswordInput';
import LoadingScreen from '../../components/Loading';
import * as Animatable from 'react-native-animatable';
const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const auth = FIREBASE_AUTH;
  const {height} = useWindowDimensions();
  const {width} = useWindowDimensions();
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const firestore = FIRESTORE_DB;
  const onPasswordChange = (text) => {
    setPassword(text); // Set the password in the state
  };
  const onSignInPressed = () => {
    if (!email || !password) {
      // Validate if email or password is empty
      SweetAlert.showAlertWithOptions({
        title: 'Login Gagal',
        subTitle: 'Tolong lengkapi input email & password ',
        confirmButtonTitle: 'OK',
        style: 'error',
        cancellable: false,
      });
      return;
    }
  
    setLoading(true); // Assuming you have a setLoading function to handle loading state
  
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Sign-in successful
      const user = userCredential.user;
      console.log('User signed in:', user.uid);

      // Fetch the user data from Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const username = userData.username;

        // Navigate to the Home screen or perform any other actions
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        SweetAlert.showAlertWithOptions({
          title: 'Login Berhasil',
          subTitle: `Selamat datang, ${username}!`, // Display the username here
          confirmButtonTitle: 'OK',
          style: 'success',
          cancellable: false,
        });
      }
    })
      .catch((error) => {
        // Handle sign-in error
        console.error('Sign-in error:', error.code, error.message);
  
        // Display an alert with the error message
        if (error.code === 'auth/invalid-email') {
          SweetAlert.showAlertWithOptions({
            title: 'Login Gagal',
            subTitle: 'Masukkan email dengan benar',
            confirmButtonTitle: 'OK',
            style: 'error',
            cancellable: false,
          });
        } else if (error.code === 'auth/user-not-found') {
          SweetAlert.showAlertWithOptions({
            title: 'Login Gagal',
            subTitle: 'Email anda belum terdaftar',
            confirmButtonTitle: 'OK',
            style: 'error',
            cancellable: false,
          });
        } else if (error.code === 'Failed to get document because the client is offline.') {
          SweetAlert.showAlertWithOptions({
            title: 'Login Gagal',
            subTitle: 'coba ulangi lagi, masalah terdapat pada jaringan',
            confirmButtonTitle: 'OK',
            style: 'error',
            cancellable: false,
          });
        } else if (error.code === 'auth/wrong-password') {
          SweetAlert.showAlertWithOptions({
            title: 'Login Gagal',
            subTitle: 'Password Anda Salah!',
            confirmButtonTitle: 'OK',
            style: 'error',
            cancellable: false,
          });
        } else {
          SweetAlert.showAlertWithOptions({
            title: 'Gagal',
            subTitle: error.message,
            confirmButtonTitle: 'OK',
            style: 'error',
            cancellable: false,
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  
  
  

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };
  const animationRef = useRef();
  return (
      <ImageBackground source={require('../../../asset/bg-putih.png')} style={styles.root}>
          <LoadingScreen visible={loading}/>
          <View style={[styles.card, {height:height*0.53,}]}>
            <Animatable.View animation="fadeInUp" duration={2000} style={[styles.logoContainer, {bottom: height*0.45, left: width*0.235, width: width * 0.42, height: width * 0.42, borderRadius: width * 0.42 }]}>
              <Image source={require('../../../asset/logo-login.png')} style={[styles.logo, { width: width * 0.4, height: width * 0.4 }]} />
            </Animatable.View>
            <Text style={styles.title}>MASUK</Text>
            <KeyboardAvoidingView behavior='padding'>
              <CustomInput
                placeholder="Email"
                value={email}
                setValue={setEmail}
                keyboardType='email-address'
              />
              <PasswordInput onPasswordChange={onPasswordChange}/>
            </KeyboardAvoidingView>
            <View style={{flexDirection:'row', alignItems: 'center',justifyContent: 'center', margin:15}}>
              <Text style={styles.text}>Lupa Kata Sandi Klik </Text>
              <TouchableOpacity onPress={onForgotPasswordPressed}><Text style={styles.link}>disini</Text></TouchableOpacity>
            </View>

            <CustomButton style={{width:'30%'}}  bgColor={'#746555'} text="Masuk" onPress={onSignInPressed} />
            
            <View style={{marginTop:10}}>
              <Text style={styles.text}>Belum Punya Akun? </Text>
              <View style={{flexDirection:'row', alignItems: 'center',justifyContent: 'center'}}>
                <Text style={styles.text}>Daftar Sekarang! </Text>
                <TouchableOpacity onPress={onSignUpPress}><Text style={styles.link}>Daftar</Text></TouchableOpacity>
              </View>
            </View>

          </View>
        
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    padding: 5,
  },
  logo: {
    width: '100%',
  },
  logoContainer:{
    backgroundColor:'#746555',
    alignItems: 'center',
    position:'absolute',
    borderWidth: 1,
  }, 
  card: {
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor:'#C9B8A8',
    width: '90%',
    borderRadius: 20,
    justifyContent:'center',
    borderWidth: 1,
  },
  title: {
    alignSelf:"center",
    fontFamily: theme.font.bold,
    color: "black",
    fontSize: 18,
    margin:5,
    marginTop: 10,
  },
  text: {
    alignSelf:"center",
    color: "black",
    fontFamily: theme.font.regular,
  },
  link: {
    fontFamily:theme.font.bold,
    color: "black",

  },
});

export default SignInScreen;

import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import theme from '../../../theme';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import SweetAlert from "react-native-sweet-alert";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;
  const onSubmitPressed = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      SweetAlert.showAlertWithOptions({
        title: 'Berhasil',
        subTitle: `Kami Mengirim Link Reset Password Ke Email Anda`, // Display the username here
        confirmButtonTitle: 'OK',
        style: 'success',
        cancellable: false,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      SweetAlert.showAlertWithOptions({
        title: 'Gagal',
        subTitle: errorMessage, // Display the username here
        confirmButtonTitle: 'OK',
        style: 'error',
        cancellable: false,
      });
    });
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ImageBackground source={require('../../../asset/bg-putih.png')} style={styles.container}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subTitle}>Kami akan mengirim link reset password pada email anda</Text>

        <CustomInput placeholder="Masukkan Email" value={email} setValue={setEmail} keyboardType='email-address'/>


        <CustomButton text="Kirim Email" onPress={onSubmitPressed} />

        <CustomButton
          text="Kembali Ke Login"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: theme.font.bold,
    color: '#8E7C68',
    margin: 10,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: theme.font.regular,
    color: '#051C60',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ForgotPasswordScreen;

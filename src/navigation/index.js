import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';

import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';

import TentangKami from '../screens/TentangKami';
import Profile from '../screens/Profile/Profile';
import EditProfile from '../screens/EditProfile';
import ForumDiskusiScreen from '../screens/Menu/ForumDiskusi';
import WawasanScreen from '../screens/Menu/Wawasan';
import ScanARScreen from '../screens/Menu/ScanAR';
import KompetensiScreen from '../screens/Menu/Kompetensi';
import ChemAIScreen from '../screens/Menu/ChemAI';
import PetaKonsepScreen from '../screens/Menu/PetaKonsep';

import PembelajaranScreen from '../screens/Menu/Pembelajaran/Pembelajaran';
import LKPD from '../screens/Menu/Pembelajaran/Menu/LKPD';
import PreTest from '../screens/Menu/Pembelajaran/Menu/Pre-Test/Kuis/PreTest';
import HasilPreTest from '../screens/Menu/Pembelajaran/Menu/Pre-Test/Hasil/HasilPreTest';
import BeforePreTest from '../screens/Menu/Pembelajaran/Menu/Pre-Test/Awal/BeforePreTest';

import PostTestScreen from '../screens/Menu/Pembelajaran/Menu/Post-Test/Kuis';
import HasilPostTest from '../screens/Menu/Pembelajaran/Menu/Post-Test/Hasil/HasilPostTest';
import BeforePostTest from '../screens/Menu/Pembelajaran/Menu/Post-Test/Awal/BeforePostTest';

import PermainanScreen from '../screens/Menu/Pembelajaran/Menu/Permainan';
import VideoPembelajaranScreen from '../screens/Menu/Pembelajaran/Menu/VideoPembelajaran';
import FlipBookScreen from '../screens/Menu/Pembelajaran/Menu/FlipBook';
import VideoPlayer from '../screens/Menu/Pembelajaran/Menu/VideoPembelajaran/VideoPlayer';
import FullScreenImage from '../components/ImageCarousel/Index';
import PDFExample from '../screens/Menu/Pembelajaran/Menu/FlipBook/PdfViewer/PdfViewer';
import LockedPdf from '../screens/Menu/Pembelajaran/Menu/FlipBook/LockedPdf/LockedPdf';
import LockScreen from '../screens/LockScreen/LockScreen';
const Stack = createNativeStackNavigator();

import UniqueCode from '../screens/UniqueCode/UniqueCode';
const Navigation = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="UniqueCode" component={UniqueCode} />
        <Stack.Screen name="LockScreen" component={LockScreen} />
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="Pembelajaran" component={PembelajaranScreen} />
        <Stack.Screen name="Kompetensi" component={KompetensiScreen} />
        <Stack.Screen name="ChemAI" component={ChemAIScreen} />
        <Stack.Screen name="PetaKonsep" component={PetaKonsepScreen} />
        <Stack.Screen name="ForumDiskusi" component={ForumDiskusiScreen} />
        <Stack.Screen name="Wawasan" component={WawasanScreen} />
        <Stack.Screen name="ScanAR" component={ScanARScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BeforePreTest" component={BeforePreTest} />
        <Stack.Screen name="PreTest" component={PreTest} />
        <Stack.Screen name="HasilPreTest" component={HasilPreTest} />
        <Stack.Screen name="HasilPostTest" component={HasilPostTest} />
        <Stack.Screen name="BeforePostTest" component={BeforePostTest} />
        <Stack.Screen name="PostTest" component={PostTestScreen} />
        <Stack.Screen name="Permainan" component={PermainanScreen} />
        <Stack.Screen name="FlipBook" component={FlipBookScreen} />
        <Stack.Screen name="PdfViewer" component={PDFExample} />
        <Stack.Screen name="LockedPdf" component={LockedPdf} />
        <Stack.Screen name="VideoPembelajaran" component={VideoPembelajaranScreen} />
        <Stack.Screen name="TentangKami" component={TentangKami} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="LKPD" component={LKPD} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
        <Stack.Screen name="FullScreenImage" component={FullScreenImage} />
      </Stack.Navigator>
  );
};

export default Navigation;

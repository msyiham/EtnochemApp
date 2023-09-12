import React, {useEffect} from 'react';
import { View, Image, Text, StyleSheet, useWindowDimensions, ImageBackground } from 'react-native';
import theme from '../../../theme';
const App = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  useEffect(() =>{
    setTimeout(() =>{
        navigation.navigate('SignIn')
    }, 2000);
  });
  return (
    <ImageBackground source={require('../../../asset/Splash_BG.png')} resizeMode="stretch" style={styles.container}>
        <Image style={[styles.logo, {width:width*0.6, height:height*0.2}]} resizeMode='cover' source={require('../../../asset/logo_putih.png')}/>
        <Text style={styles.text}>Aplikasi Pembelajaran Kimia Materi</Text>
        <Text style={styles.text}>Asam Basa Berbasis Kearifan Lokal</Text>
        <View style={{alignItems:'center', marginTop: height*0.5}}>
            <Text style={styles.text2}>Support By:</Text>
            <Text style={styles.text}>@kemahasiswaan.dikti</Text>
            <Text style={styles.text}>@ditjen.dikti</Text>
            <Text style={styles.text}>@dit.belmawadikti</Text>
            <Text style={styles.text}>@universitasnegerimalang</Text>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },  
  logo: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color:'white',
    fontFamily: theme.font.regular,
  },
  text2: {
    fontSize: 20,
    fontFamily: theme.font.bold,
    color:'white'
  },
});

export default App;

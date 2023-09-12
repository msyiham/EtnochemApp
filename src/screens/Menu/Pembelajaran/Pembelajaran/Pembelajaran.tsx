import * as React from "react";
import { Image, StyleSheet, View, Text, ImageBackground, useWindowDimensions } from "react-native";
// import { FontFamily, FontSize, Color } from "../GlobalStyles";
import CustomeBar from '../../../../components/CustomBar';
import CustomeCard from '../../../../components/CustomeCard';
import ButtonPanjang from '../../../../components/ButtonPanjang';
import { useNavigation } from '@react-navigation/native';
import theme from "../../../../../theme";
const Pembelajaran = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  return (
    <ImageBackground source={require('../../../../../asset/bg-coklat-tua.png')} style={styles.container}>
          <CustomeCard title={'Ayo Belajar'}/>
          <View style={{marginTop: 30, justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'white', textAlign:'center', marginBottom: 30, fontFamily: theme.font.bold}}>Di menu Ayo Belajar, kita akan menguji kemampuan awalmu, memberikan materi dan melihat perkembanganmu! Jangan lupa latihan dengan coba Permainan ya!</Text>
            <ButtonPanjang title="Pre-Test" onPress={()=> navigation.navigate('BeforePreTest')}/>
            <ButtonPanjang title="LKPD" onPress={() => navigation.navigate("LKPD")}/>
            <ButtonPanjang title="Flip Book" onPress={() => navigation.navigate("FlipBook")}/>
            <ButtonPanjang title="Video Pembelajaran" onPress={() => navigation.navigate("VideoPembelajaran")}/>
            <ButtonPanjang title="Post-Test" onPress={() => navigation.navigate("BeforePostTest")}/>
            <ButtonPanjang title="Permainan" onPress={() => navigation.navigate("Permainan")}/>
          </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Pembelajaran;

import React from 'react';
import { View, Image, Text, StyleSheet, useWindowDimensions, ImageBackground, TouchableOpacity} from 'react-native';
import Logo from '../../../asset/logo-panjang.png';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import CustomeBar from '../../components/CustomBar';
import theme from '../../../theme';
const Index = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();

  return (
    <ImageBackground source={require('../../../asset/bg-coklat-tua.png')} style={styles.container}>
      <CustomeBar navigation={navigation} activeScreen="Beranda"  contentMarginTop={10}>
        <View style={styles.cardLogo}>
          <Image
            source={Logo}
            style={[styles.logo, { height: height * 0.3, width: width * 0.7}]}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.text}>Aplikasi Pembelajaran Kimia Materi</Text>
        <Text style={styles.text}>Asam Basa Berbasis Kearifan Lokal</Text>
        <View style={{flexDirection:'row', width:"90%", marginTop:20, }}>
            <Button
              title="Kompetensi"
              onPress={() => navigation.navigate("Kompetensi")}
            />
            <Button
              title="Peta Konsep"
              onPress={() => navigation.navigate("PetaKonsep")}
            />
        </View>
        <View style={{flexDirection:'row', width:"90%"}}>
            <Button
              title="Ayo Belajar"
              onPress={() => navigation.navigate("Pembelajaran")}
            />
            <Button
              title="Ayo Berwawasan"
              onPress={() => navigation.navigate("Wawasan")}
            />
        </View>
        <View style={{flexDirection:'row', width:"90%"}}>
            <Button
              title="Ayo Berdiskusi"
              onPress={() => navigation.navigate("ForumDiskusi")}
            />
            <Button
              title="Scan AR"
              onPress={() => navigation.navigate("ScanAR")}
            />
        </View>
          <Button
            title="Chem-Ai"
            onPress={() => navigation.navigate("ChemAI")}
          />
      </CustomeBar>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
  },
  logo: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 200,
    alignSelf: 'center',
  },
  cardLogo: {
    margin: 10,
    justifyContent: 'center',
    width: '70%',
    height:'20%',
    backgroundColor:'white',
    borderRadius: 15,
  },
  text:{
    fontFamily: theme.font.bold,
  },
});

export default Index;

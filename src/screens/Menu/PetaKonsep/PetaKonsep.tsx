import * as React from "react";
import { Image, StyleSheet, View, Text, ImageBackground, useWindowDimensions } from "react-native";
// import { FontFamily, FontSize, Color } from "../GlobalStyles";
import CustomeBar from '../../../components/CustomBar';
import CustomeCard from '../../../components/CustomeCard';
import MyCarousel  from "../../../components/Carousel/Carousel";
const PetaKonsep = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  return (
    <ImageBackground source={require('../../../../asset/bg-coklat-tua.png')} style={styles.container}>
          <CustomeCard title={'Peta Konsep'}/>
          <View style={{ height: height*0.7 }}>
            <MyCarousel />
          </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PetaKonsep;

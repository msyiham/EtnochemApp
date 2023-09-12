import React from "react";
import { Image, StyleSheet, View, Text, useWindowDimensions, ScrollView } from "react-native";

const CustomeCard2 = ({ title, content }) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.card, {width : width * 0.8, height: height *0.7}]}>
        <View style={[styles.cardHeader, {width : width * 0.8, height: height *0.08}]}>
            <Image
                style={[styles.wrapperLayout, {width : width * 0.17, height : height * 0.056}]}
                resizeMode="cover"
                source={require("../../../asset/logo-panjang.png")}
            />
            <View style={[styles.garis, {height: height*0.04}]}></View>
            <View style={[styles.titleBox, {width: width*0.5, height: height*0.078}]}>
            <Text style={styles.title}>{title}</Text>
            </View>
        </View>
        <ScrollView style={{flex:1}}>{content}</ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
    wrapperLayout: {
        marginEnd:5,
        marginTop: 5,
      },
      container: {
        flex: 1,
      },
      card: {
        backgroundColor:'white',
        borderRadius: 10,
        alignItems: 'center',
      },
      cardHeader: {
        flexDirection:'row',
        justifyContent:'center',
        borderBottomColor:'black',
        borderBottomWidth: 2,
      },
      garis: {
        flexDirection:'column',
        borderEndWidth: 2,
        marginEnd:5,
        marginTop: 15,
        borderEndColor: 'black',
      },
      title: {
        fontSize: 18,
        margin:5,
        textAlignVertical:'center',
        textAlign:'center',
        fontWeight:'bold',
        color: 'black',
      },
      titleBox:{
        justifyContent:'center',
      },
});

export default CustomeCard2;

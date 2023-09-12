import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, useWindowDimensions } from 'react-native'
import React from 'react'
import theme from '../../../theme';
const LockScreen = ({navigation}) => {
    const { height } = useWindowDimensions();
    const { width } = useWindowDimensions();
  return (
    <ImageBackground style={styles.container} source={require('../../../asset/bg-putih.png')}>
        <View style={[styles.headerContainer, { height: height * 0.07 }]}>
            <Text style={styles.title}>Perhatian</Text>
        </View>
        <View style={[styles.lockedContainer, {width:width*0.8, height:height*0.1}]}>
            <Text style={styles.lockedText}>Anda tidak dapat mengakses fitur ini, masukkan kode untuk membuka semua fitur.</Text>
            <TouchableOpacity onPress={() => navigation.replace('UniqueCode')} style={[styles.navigateButton, {width:width*0.7, height:height*0.06}]}>
                <Text style={styles.navigateButtonText}>Masukkan Kode</Text>
            </TouchableOpacity>
        </View>
  </ImageBackground>
  )
}

export default LockScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    lockedContainer:{
        justifyContent:'center',
        alignItems: 'center',
    },
    title:{
        color:'black',
        fontSize: 15,
        fontFamily: theme.font.bold,
    },
    lockedText:{
        color:'black',
        fontSize: 15,
        textAlign:'center',
        fontFamily: theme.font.regular,
    },
    navigateButton:{
        marginTop: 10,
        backgroundColor:'#C9B8A8',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    navigateButtonText:{
        color:'black',
        fontFamily: theme.font.bold,
        fontSize: 15,
    },
})
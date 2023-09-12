import * as React from "react";
import { Image, StyleSheet, View, Text, ImageBackground, ScrollView, useWindowDimensions } from "react-native";
// import { FontFamily, FontSize, Color } from "../GlobalStyles";
import CustomeBar from '../../../components/CustomBar';
import CustomeCard from '../../../components/CustomeCard';
import theme from "../../../../theme";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { FIRESTORE_DB } from "../../../../FirebaseConfig";
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
const Kompetensi = () => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const firestore = FIRESTORE_DB;
  const [dataList, setDataList] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        collection(firestore, 'Kompetensi')
      );
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDataList(data);
      console.log(data);
    };
    fetchData();
  }, []);
  
  return (
    <ImageBackground source={require('../../../../asset/bg-coklat-muda.png')} style={styles.container}>
      <ScrollView style={{marginTop: 30, marginBottom: 5,}}>
        <View style={{alignItems:'center'}}>
          <CustomeCard title={'Kompetensi'}/>
          {/* Capaian */}
          <View style={[styles.capaianContainer, {width: width*0.9}]}>
            <View style={styles.capaianHeader}>
              <Text style={styles.headerTitle}>Capaian Pembelajaran</Text>
              <View style={[styles.bookImage, {left: width*0.53, bottom: height*0.001, width:width*0.15, height:width*0.15, borderRadius:width*0.15}]}>
                <FontAwesome5 name="book-open" size={35} color="#60564B"/>
              </View>
              
            </View>
            <View style={styles.capaianContent}>
              <Text style={styles.text}>Peserta didik mampu menerapkan operasi matematika dalam perhitungan kimia; mempelajari sifat, struktur dan interaksi partikel dalam membentuk berbagai senyawa; memahami dan menjelaskan aspek energi, laju dan kesetimbangan reaksi kimia; <Text style={styles.boldText}>menggunakan konsep asam-basa dalam keseharian;</Text></Text>
            </View>
          </View>
          {/* Keterampilan */}
          <View style={[styles.keterampilanContainer, {width:width*0.9}]}>
            <View style={styles.keterampilanHeader}>
              <Text style={styles.headerTitle}>Keterampilan Proses</Text>
              <View style={[styles.bookImage, {left: width*0.48, bottom: height*0.001, width:width*0.15, height:width*0.15, borderRadius:width*0.15}]}>
                <FontAwesome5 name="book-reader" size={34} color="#60564B"/>
              </View>
            </View>
            <View style={styles.keterampilanContent}>
              {dataList.map((item, index) => (
                <View style={{marginBottom: 5,}} key={item.id}>
                  <Text style={styles.title}>{index + 1}. {item.title}</Text>
                  <Text style={styles.text}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>  
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  capaianContainer:{
    marginTop: 30,
  },
  capaianHeader: {
    backgroundColor: '#8E7C68',
    width: '75%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  title: {
    fontFamily: theme.font.bold,
    color: 'black',
    fontSize: 15,
  },
  capaianContent: {
    backgroundColor: 'white',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    padding: 10,
  },
  text: {
    color: 'black',
    fontSize: 12,
    fontFamily: theme.font.regular,
    textAlign: 'justify',
  },
  boldText:{
    fontFamily: theme.font.bold,
  },
  keterampilanContainer:{
    marginTop: 20,
  },
  keterampilanHeader:{
    backgroundColor: '#8E7C68',
    width: '70%',
    padding: 10,
    marginBottom: 5,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
  headerTitle:{
    color: 'white',
    fontFamily: theme.font.bold,
    fontSize: 15,
  },
  keterampilanContent:{
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  bookImage:{
    position: 'absolute',
    backgroundColor: '#C9B8A8',
    justifyContent:'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor:"#60564B",
  },
});

export default Kompetensi;

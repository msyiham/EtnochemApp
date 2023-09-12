import React, { useState, useEffect  } from 'react';
import { Linking } from 'react-native';
import { View, ScrollView, Text, StyleSheet, useWindowDimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Logo from '../../../asset/logo_putih.png';
import Button from '../../components/Button';
import CustomeBar from '../../components/CustomBar';
import Icon from 'react-native-vector-icons/dist/FontAwesome6';
import theme from '../../../theme';
import { FIRESTORE_DB } from '../../../FirebaseConfig';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
const Index = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [showFullText, setShowFullText] = useState(false);
  const firestore = FIRESTORE_DB;
  const [dataList, setDataList] = useState([]);
  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        query(collection(firestore, 'Team'), orderBy('number', 'asc'))
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
    <ImageBackground source={require('../../../asset/bg-putih.png')} style={styles.container}>
      <CustomeBar navigation={navigation} activeScreen="TentangKami" contentMarginTop={100} />
      <ScrollView style={styles.scrollView}>
        <View style={styles.containerScroll}>
          <View style={[styles.titleBox, { width: width * 0.7, height: height * 0.047 }]}>
            <Text style={styles.title}>Tentang </Text>
            <Text style={styles.titleBold}>ETNOCHEM</Text>
          </View>
          <Text style={styles.textContent}>
            <Text style={{ fontWeight: 'bold' }}>ETNOCHEM</Text> adalah sebuah aplikasi digital untuk materi kimia "asam basa" yang mengusung konsep inovasi kit edukasi AR (Augmented Reality) berbasis kearifan lokal.
            {showFullText ? (
              <>
                {"\n"}{"\n"}
                Aplikasi ini menggunakan pendekatan STEAM-2C (Science, Technology, Engineering, Arts, Mathematics, Culture, dan Communication) untuk meningkatkan kemampuan kreativitas siswa dalam memahami konsep-konsep kimia, khususnya asam basa melalui penerapan pengetahuan lokal yaitu Batik Sidomukti Malang.
                {"\n"}{"\n"}
                Aplikasi EtnoChem dirancang untuk memperkaya proses pembelajaran kimia dengan menggunakan kearifan lokal yang ada di kota Malang sebagai konteks dan sumber belajar. Melalui pendekatan STEAM-2C, siswa tidak hanya belajar tentang konsep asam basa secara teoritis, tetapi juga terlibat dalam kegiatan praktis dan kreatif yang melibatkan berbagai disiplin ilmu.
                {"\n"}
              </>
            ) : null}
              <Text style={styles.readMore}  onPress={toggleText}>{showFullText ? 'Lebih Sedikit' : ' Lebih Banyak'}</Text>
          </Text>
          <View style={[styles.titleBox, { width: width * 0.5, height: height * 0.05 }]}>
            <Text style={styles.title}>Info </Text>
            <Text style={styles.titleBold}>Pengembang</Text>
          </View>
          {dataList.map((item, index) => (
            <View style={[styles.card, {width: width*0.8, height: height*0.25}]} key={index}>
              <View style={{ justifyContent: 'center' }}>
                <Image style={[styles.cardImage, {width:width*0.30, height:height*0.15, borderRadius: width*0.2}]} source={{uri: item.image}} />
              </View>
              <View style={{ width:width*0.6 }}>
                <Text style={styles.cardTitle}>{item.id}</Text>
                <Text style={styles.cardTitle2}>as {item.role}</Text>
                <Text style={styles.cardText}>Merupakan <Text>{item.status}</Text> Universitas Negeri Malang. Kamu bisa menyapanya di instagram <Text style={styles.cardTextBold}>{item.instagram}</Text> atau emailnya <Text style={styles.cardTextBold}>{item.email}</Text></Text>
              </View>
            </View>
          ))}
          <View style={{paddingBottom: 10}}>
            <View style={styles.infoTitleContainer}>
              <Text style={styles.infoTitle}>Temukan Kami</Text>
            </View>
            <View>
              <Text style={[styles.infoSubTitle, {marginTop: height*0.01}]}>Link Media Sosial</Text>
              <Text style={styles.infoText}>
                <Icon size={15} name="instagram" solid/> :{' '}
                <Text
                  style={[styles.infoSubTitle]}
                  onPress={() => {
                    // Handler saat teks diklik
                    // Tempatkan logika navigasi atau tindakan yang sesuai di sini
                    Linking.openURL('https://www.instagram.com/etnochem.pkmk');
                  }}>
                  @etnochem.pkmk
                </Text>
              </Text>
              <Text style={styles.infoText}>
                <Icon size={15} name="globe" /> :{' '}
                <Text
                  style={[styles.infoText, {textDecorationLine: 'underline'}]}
                  onPress={() => {
                    // Handler saat teks diklik
                    // Tempatkan logika navigasi atau tindakan yang sesuai di sini
                    Linking.openURL('https://nimble-custard-087481.netlify.app/');
                  }}>
                  https://nimble-custard-087481.netlify.app/
                </Text>
              </Text>
              <Text style={[styles.infoSubTitle, {marginTop: height*0.01}]}>E-commerse</Text>
              <Text style={styles.infoText}>
                Shopee{' '}
                <Text
                  style={[styles.infoSubTitle]}
                  onPress={() => {
                    // Handler saat teks diklik
                    // Tempatkan logika navigasi atau tindakan yang sesuai di sini
                    Linking.openURL('http://shopee.co.id/etnochem');
                  }}>
                  @ETNOCHEM
                </Text>
              </Text>
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
  containerScroll: {
    height: 'auto',
    alignItems: 'center',
  },
  scrollView: {
    width: '95%',
    marginTop: 120,
    marginStart: 5,
    height: '100%',
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    alignSelf: 'center',
  },
  bar:{
    flexDirection:'row',
    backgroundColor:"#C9B8A8",
    marginTop: 80,
    marginBottom: 10,
    borderRadius: 20,
    width:"80%",
    justifyContent: 'center',
  },
  title: {
    textAlign:'center',
    textAlignVertical:'center',
    color:'black',
    fontSize: 18,
    fontFamily: theme.font.regular,
  },
  titleBold: {
    textAlign:'center',
    textAlignVertical:'center',
    color:'black',
    fontFamily:theme.font.bold,
    fontSize: 18,
  },
  titleBox:{
    flexDirection:'row',
    backgroundColor:"#C9B8A8",
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
  },
  textContent: {
    textAlign: 'left',
    color:'black',
    fontSize: 14,
    fontFamily: theme.font.regular,
  },
  readMore: {
    textAlign: 'left',
    color:'black',
    fontSize: 14,
    fontFamily: theme.font.bold,
  },
  card:{
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'rgba(0, 0, 0, 0.0)',
  },
  cardImage:{
    marginEnd: 10,
    marginBottom: 10,
  },
  cardTitle: {
    textAlign: 'left',
    color:'black',
    fontSize: 16,
    fontFamily:theme.font.bold,
  },
  cardTitle2: {
    textAlign: 'left',
    color:'black',
    marginBottom: 7,
    fontSize: 14,
    fontFamily:theme.font.regular,
  },
  cardText: {
    textAlign: 'left',
    color:'black',
    fontSize: 12,
    fontFamily:theme.font.regular,
  },
  cardTextBold: {
    textAlign: 'left',
    color:'black',
    fontSize: 12,
    fontFamily:theme.font.bold,
  },
  infoTitleContainer:{
    borderBottomWidth: 2,
    padding: 3,
  },
  infoTitle:{
    color:'black',
    fontSize: 18,
    fontFamily:theme.font.bold,
  },
  infoSubTitle:{
    color:'black',
    fontSize: 13,
    fontFamily:theme.font.bold,
  },
  infoText:{
    fontFamily:theme.font.regular,
    color:'black',
    fontSize: 13,
  },

});

export default Index;

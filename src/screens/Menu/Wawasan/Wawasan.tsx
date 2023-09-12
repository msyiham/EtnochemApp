import React, {useState, useCallback} from "react";
import { Image, Alert, StyleSheet, View, ScrollView, Text, ImageBackground, FlatList,useWindowDimensions } from "react-native";
// import { FontFamily, FontSize, Color } from "../GlobalStyles";
import CustomeBar from '../../../../../components/CustomBar';
import Button from '../../../../../components/ButtonPanjang';
import { Thumbnail } from 'react-native-thumbnail-video';
import YoutubePlayer from "react-native-youtube-iframe";
import theme from "../../../../theme";
const videoData = [
  {
    id: 'lCAM8_bJK7k',
    title: '1.  Batik sebagai Warisan Budaya Indonesia yang Mendunia',
    description: 'Batik sangat erat kaitannya dengan kehidupan masyarakat Indonesia, bahkan dari sejak zaman majapahit sampai saat ini. Sering kali batik diturunkan di dalam keluarga dari generasi ke generasi selama bertahun-tahun. Pada perkembangannya, batik Indonesia memiliki beragam motif yang berbeda disetiap daerahnya yang didalamnya mengandung makna-makna filosofis tersendiri. Menurut SNI 0239 - 2019: Batik - Pengertian dan Istilah, batik diartikan dalam kerajinan tangan sebagai hasil pewarnaan secara perintangan menggunakan malam (lilin batik) panas sebagai perintang warna dengan alat utama pelekat lilin batik berupa canting tulis dan atau canting cap untuk membentuk motif tertentu yang memiliki makna.',
  },
  {
    id: 'XAPqQRlgO1A',
    title: '2.	Kearifan Lokal Malang: Batik Malangan ',
    description: 'Batik Malangan merupakan budaya yang turun-menurun sejak adanya Kerajaan Mataram Kuno yang telah Kerajaan Singosari pada tahun 1222 M (Lidi, 2019). Batik malangan memiliki corak khusus yang dinamakan. Batik jenis ini memiliki tiga ciri utama dalam masing-masing motifnya, menurut (Miranti, 2021) mengklasifikasikan motifnya menjadi tiga bagian. \n1.	Bagian pertama dari motif dasar berupa motif batik dari Candi Badut yang berada di Kota Malang. \n2.	Bagian kedua berupa motif isen-isen yang berisi gambar Tugu Malang dan beriringan dengan rambut singa dengan warna putih menggambarkan lambang Kabupaten Malang. \n3.	Bagian terakhir berupa bagiat boket yang berada dipinggiran kain yang berisi tigas buah sulur-sulur bunga yang membentuk pola rantai yang menggambarkan kota Malang sebagai kota bunga.',
  },
];
const Wawasan = ({navigation}) => {
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [playing, setPlaying] = useState(false);


  const renderVideoItem = ({ item }) => (
    <View style={[styles.VideoContainer, {width: width*0.85,marginBottom: height*0.02 }]}>
      <Text style={styles.VideoTitle}>{item.title}</Text>
      <YoutubePlayer
        height={height*0.25}
        width= {width*0.8}
        play={playing}
        videoId={item.id}
        onChangeState={onStateChange}
      />     
      <View style={[styles.videoTextContainer, {width: width*0.8, marginStart: width*0.025}]}>
        <Text style={styles.VideoDescription}>
            {item.description}
        </Text>
      </View>
    </View>
  );
  return (
    <ImageBackground source={require('../../../../asset/bg-coklat-tua.png')} style={styles.container}>
          <View style={[styles.card, {width : width * 0.9, height: height *0.7}]}>
            <View style={[styles.cardHeader, {width : width * 0.8, height: height *0.08}]}>
                <Image
                      style={[styles.wrapperLayout, {width : width * 0.17, height : height * 0.056}]}
                      resizeMode="cover"
                      source={require("../../../../asset/logo-panjang.png")}
                />
                <View style={[styles.garis, {height: height*0.04}]}></View>
                <View style={[styles.titleBox, {width: width*0.5, height: height*0.078}]}>
                  <Text style={styles.title}>Ayo Berwawasan</Text>
                </View>
            </View>
            <View style={{flex:1,}}>
              <FlatList
                data={videoData}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>     
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapperLayout: {
    marginEnd:5,
    marginTop: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 17,
    margin:5,
    fontFamily: theme.font.bold,
    textAlignVertical:'center',
    textAlign:'center',
    color: 'black',
  },
  titleBox:{
    justifyContent:'center',
  },
  VideoContainer:{
    margin: 5,
    borderRadius: 10,
  },
  VideoTitle:{
    color: 'black',
    fontFamily: theme.font.bold,
    fontSize: 15,
  },
  VideoDescription:{
    color: 'black',
    fontSize: 13,
    textAlign:'justify',
    fontFamily: theme.font.regular,
  },
  videoTextContainer:{
    textAlign:'left',
  },
  Thumbnail:{
    borderRadius:20,
  },
});

export default Wawasan;

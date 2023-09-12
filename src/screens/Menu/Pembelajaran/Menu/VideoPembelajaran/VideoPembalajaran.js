import React, {useState, useEffect} from "react";
import { Image, TouchableOpacity, StyleSheet, View, ScrollView, Text, ImageBackground, FlatList,useWindowDimensions } from "react-native";
// import { FontFamily, FontSize, Color } from "../GlobalStyles";
import CustomeBar from '../../../../../components/CustomBar';
import Button from '../../../../../components/ButtonPanjang';
import { Thumbnail } from 'react-native-thumbnail-video';
import YoutubePlayer from "react-native-youtube-iframe";
import theme from "../../../../../../theme";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../../../../FirebaseConfig";
import { collection, getDocs, orderBy, arrayUnion, where, query } from 'firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId } from 'react-native-device-info';
import RenderHtml from 'react-native-render-html';
const VideoPembelajaran = ({navigation}) => {

  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [playing, setPlaying] = useState(false);
  const firestore = FIRESTORE_DB;
  const [videoData, setVideoData] = useState([]); // Deklarasi videoData sebagai state dengan inisialisasi array kosong
  const handleVideoPress = (videoId) => {
    navigation.navigate('VideoPlayer', { videoId, videoData });
  };
  const isDeviceRegistered = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      console.log(deviceId);
      // Replace 'uniqueCodes' with the collection path where device information is stored in Firestore.
      const codesCollectionRef = collection(firestore, 'uniqueCodes');

      // Query the collection to check if the given 'deviceId' exists in the 'device' array field.
      const q = query(codesCollectionRef, where('device', 'array-contains', deviceId));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking device registration:', error);
      return false;
    }
  };
  const [allVideos, setAllVideos] = useState(true);
  useEffect(() => {
    const checkDeviceRegistration = async () => {
      const registered = await isDeviceRegistered();
      if (!registered) {
        setAllVideos(false);
      } 
    };
    checkDeviceRegistration();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(firestore, 'AyoBelajarVideos');
        const q = query(collectionRef, orderBy('createdAt', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => doc.data());
        console.log('data', data);
        setVideoData(data);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchData();
  }, []);
    

  const maxDescriptionLength = 50; // Panjang maksimum deskripsi yang ingin ditampilkan

  const renderVideoItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.VideoContainer, { width: width * 0.8, height: height * 0.12, marginBottom: height * 0.02 }]}
      onPress={() => handleVideoPress(item.id)}
    >
      <Text style={styles.itemNumber}>{index + 1}. </Text>
      <Thumbnail url={item.thumbnail} borderRadius={10} imageWidth={width * 0.27} imageHeight={height * 0.12} showPlayIcon={false} />
      <View style={[styles.videoTextContainer, { width: width * 0.47, marginStart: width * 0.025 }]}>
        <Text style={styles.VideoTitle}>{item.title}</Text>
        <RenderHtml
          source={{
            html: item.description.length > maxDescriptionLength
              ? `${item.description.substring(0, maxDescriptionLength)}..`
              : item.description
          }}
          baseStyle={styles.VideoDescription}
        />
      </View>
    </TouchableOpacity>
  );
  
  return (
    <ImageBackground source={require('../../../../../../asset/bg-coklat-tua.png')} style={styles.container}>
          <View style={[styles.card, {width : width * 0.85, height: height *0.8}]}>
            <View style={[styles.cardHeader, {width : width * 0.8, height: height *0.08}]}>
                <Image
                      style={[styles.wrapperLayout, {width : width * 0.17, height : height * 0.056}]}
                      resizeMode="cover"
                      source={require("../../../../../../asset/logo-panjang.png")}
                />
                <View style={[styles.garis, {height: height*0.04}]}></View>
                <View style={[styles.titleBox, {width: width*0.5, height: height*0.078}]}>
                  <Text style={styles.title}>Video Pembelajaran</Text>
                </View>
            </View>
            <View>
            {allVideos ? ( // Jika perangkat terdaftar, tampilkan FlatList
              <FlatList
                data={videoData}
                renderItem={renderVideoItem}
                keyExtractor={(item) => item.id}
              />
              ) : ( // Jika perangkat belum terdaftar, tampilkan teks pemberitahuan
              <View>
                  <View style={{height:height*0.4}}>
                    <FlatList
                      data={videoData.slice(0, 1)}
                      renderItem={renderVideoItem}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
                  <View style={styles.infoTextContainer}>
                    <Text style={styles.infoText}>Anda hanya bisa melihat 1 video. {'\n'}Jika ingin melihat semua silahkan anda harus memasukkan kode yang ada dalam kit ETNOCHEM</Text>
                    <TouchableOpacity style={styles.buttonInfo} onPress={()=>navigation.replace('UniqueCode')}>
                      <Text style={styles.buttonInfoText}>Masukkan Kode</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                )}
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
    flexDirection:'row',
    margin: 5,
    borderRadius: 10,
  },
  itemNumber:{
    color: 'black',
    fontFamily: theme.font.bold,
    fontSize: 15,
  },
  VideoTitle:{
    color: 'black',
    fontFamily: theme.font.bold,
    fontSize: 15,
  },
  VideoDescription:{
    color: 'black',
    fontSize: 14,
    fontFamily: theme.font.regular,
  },
  videoTextContainer:{
    textAlign:'left',
  },
  Thumbnail:{
    borderRadius:20,
  },
  infoTextContainer:{
    alignItems: 'center',
  },
  infoText:{
    color:'black',
    fontFamily: theme.font.regular,
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
  },
  buttonInfo:{
    backgroundColor: '#C9B8A8',
    width: '50%',
    padding: 10,
    borderRadius: 20,
    alignItems:'center',
    justifyContent: 'center',
  },
  buttonInfoText:{
    color:'black',
    fontFamily: theme.font.bold,
    fontSize:15,
  }
});

export default VideoPembelajaran;

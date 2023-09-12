import React, { useState, useCallback, useRef } from "react";
import { ScrollView, View, Alert, Text, Image, ImageBackground, StyleSheet, useWindowDimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import RenderHtml from 'react-native-render-html';

export default function VideoPlayer({ route }) {
  const { videoId, videoData } = route.params;
  const data = videoData.find((item) => item.id === videoId);
  
  const [playing, setPlaying] = useState(false);
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Video has finished playing!");
    }
  }, []);

  return (
    <ImageBackground source={require('../../../../../../../asset/bg-coklat-tua.png')} style={styles.container}>
      
      <View style={[styles.card, {width : width * 0.9, height: height *0.7}]}>
            <View style={[styles.cardHeader, {width : width * 0.8, height: height *0.08}]}>
                <Image
                      style={[styles.wrapperLayout, {width : width * 0.17, height : height * 0.056}]}
                      resizeMode="cover"
                      source={require("../../../../../../../asset/logo-panjang.png")}
                />
                <View style={[styles.garis, {height: height*0.04}]}></View>
                <View style={[styles.titleBox, {width: width*0.5, height: height*0.078}]}>
                  <Text style={styles.title}>Video Pembelajaran</Text>
                </View>
            </View>
            <ScrollView style={{flex:1,}}>
              
              <View style={{alignItems:'center'}}>
                <Text style={styles.videoTitle}>{data.title}</Text>
                <YoutubePlayer
                  height={height*0.2}
                  width= {width*0.7}
                  play={playing}
                  videoId={videoId}
                  onChangeState={onStateChange}
                />
              </View>
              <RenderHtml
                  source={{ html: data.description }}
                  baseStyle={styles.description}
                />
            </ScrollView>
          </View>  
      
    </ImageBackground>
  );
}
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
    fontSize: 15,
    margin:10,
    textAlignVertical:'center',
    textAlign:'center',
    fontWeight:'bold',
    color: 'black',
  },
  titleBox:{
    justifyContent:'center',
  },
  videoContainer: {
    marginTop: 10,
    backgroundColor:'#F1DEC9',
    paddingTop: 10,
    borderRadius: 10,
    borderWidth: 4,
    alignItems:'center',
    borderColor:'#3F2305',
  },
  description: {
    color:'black',
    fontSize: 18,
    textAlign:'auto',
  },
  videoTitle: {
    color:'black',
    fontSize: 20,
    fontWeight:'bold',
  },
});
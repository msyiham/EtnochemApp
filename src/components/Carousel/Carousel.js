import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from "react-native-snap-carousel-v4";
import theme from '../../../theme';
import { useNavigation } from '@react-navigation/native';
import { FIRESTORE_DB } from '../../../FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const sliderWidth = windowWidth;
const itemWidth = windowWidth * 0.8;

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
    marginBottom: 0,
  },
  slide: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    height: windowHeight * 0.57,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.font.bold,
    color: 'black',
  },
  text: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: theme.font.regular,
    color: 'black',
  },
  image: {
    height: windowHeight * 0.4,
    width: windowWidth * 0.7,
  },
  paginationContainer: {
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

const MyCarousel = () => {
  const navigation = useNavigation();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const carouselRef = useRef(null);

  const firestore = FIRESTORE_DB;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Peta Konsep"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        data.sort((a, b) => a.id - b.id);
        console.log('data', data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('FullScreenImage', { image: item.image })}>
          <Image source={{uri: item.image}} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Carousel
        data={data}
        ref={carouselRef}
        renderItem={_renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        containerCustomStyle={styles.carouselContainer}
        contentContainerStyle={{ alignItems: 'center' }}
        onSnapToItem={(index) => setActiveSlideIndex(index)}
      />
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={activeSlideIndex}
          dotStyle={styles.dot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.6}
          inactiveDotScale={0.7}
        />
      </View>
    </View>
  );
};

export default MyCarousel;

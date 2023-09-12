import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, ImageBackground } from 'react-native';
import Draggable from 'react-native-draggable';
import CustomeBar from '../../../../../components/CustomeCard/CustomeCard';
import theme from '../../../../../../theme';
import { WebView } from 'react-native-webview';

const QuizApp = () => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();

  const [selectedAnswers, setSelectedAnswers] = useState({
    A: null,
    B: null,
    C: null,
  });

  const handleDrop = (answer, draggable) => {
    const { x, y } = draggable;
  
    // Menghitung posisi tengah answerBox
    const answerBoxWidth = width * 0.23;
    const answerBoxHeight = height * 0.1;
    const answerBoxX = (width - answerBoxWidth) / 2;
    const answerBoxY = (height - answerBoxHeight) / 2;
  
    // Jarak toleransi untuk menentukan bahwa draggable berada di dekat answerBox
    const tolerance = width * 0.05;
  
    // Menghitung posisi target (titik di mana draggable akan tergeser)
    const targetX = answerBoxX + (answerBoxWidth - draggable.renderSize) / 2;
    const targetY = answerBoxY + (answerBoxHeight - draggable.renderSize) / 2;
  
    // Cek apakah draggable berada di dekat answerBox
    if (x >= answerBoxX - tolerance && x <= answerBoxX + answerBoxWidth + tolerance &&
        y >= answerBoxY - tolerance && y <= answerBoxY + answerBoxHeight + tolerance) {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [answer]: draggable.renderText,
      }));
  
      // Menggeser draggable ke posisi target dengan animasi
      draggable.transitionTo({ x: targetX, y: targetY }, 300);
    }
  };
  
  const handleCheck = () => {
    // Memeriksa jawaban yang dipilih
    const correctAnswers = {
      'Soal Satu': 'A',
      'Soal Dua': 'B',
      'Soal Tiga': 'C',
    };
  
    let score = 0;
  
    // Menghitung skor berdasarkan jawaban yang benar
    Object.keys(selectedAnswers).forEach((question) => {
      if (selectedAnswers[question] === correctAnswers[question]) {
        score += 1;
      }
    });
  
    // Menampilkan skor ke dalam console
    console.log('Score:', score);
  };
  

  return (
    <View style={styles.container}>
      <View style={{height:0.2, backgroundColor:'yellow', width:width}}>
        <Text>Flip Book</Text>
      </View>
      <WebView
        source={{ uri: 'https://otiumgames.com/jewel-burst/' }}
        originWhitelist={['*']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerQuestion: {
    flexDirection: 'column',
  },
  boxQuestion: {
    backgroundColor: '#C9B8A8',
    margin: 5,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
  },
  answerBox: {
    backgroundColor: 'white',
  },
  questionText: {
    fontFamily: theme.font.regular,
    fontSize: 15,
    color: 'black',
  },
  text: {
    fontFamily: theme.font.bold,
    color: 'black',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
  },
  draggableContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  checkButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  checkButtonText: {
    color: 'white',
    fontFamily: theme.font.bold,
    fontSize: 13,
  },
});

export default QuizApp;

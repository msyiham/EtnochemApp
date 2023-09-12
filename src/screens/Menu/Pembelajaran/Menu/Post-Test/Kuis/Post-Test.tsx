import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import theme from "../../../../../../../theme";

const PostTest = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Larutan 0,74 gram Ca(OH)2 (Mr = 74) dalam 2 L air, mempunyai pH ",
      choices: [
        { id: 1, text: "2-log 2" },
        { id: 2, text: "3-log 2" },
        { id: 3, text: "12+log 2" },
        { id: 4, text: "12" },
        { id: 5, text: "2" },
      ],
      correctAnswerId: 2, // ID of the correct answer choice
    },
    {
      id: 2,
      question: "100 cm3 larutan HCl 0,1 M ditambah air sampai volume larutan menjadi 250 cm3 . Perubahan harga pH larutan HCl setelah diencerkan adalah dari…",
      choices: [
        { id: 1, text: "2 menjadi 3-log 25" },
        { id: 2, text: "1 menjadi 2-log 6,7" },
        { id: 3, text: "1 menjadi 2-2log 2" },
        { id: 4, text: "2 menjadi 2-log 2" },
        { id: 5, text: "1 menjadi 3-log 25" },
      ],
      correctAnswerId: 3,
    },
    {
      id: 3,
      question: "Jika 5 mL asam bervalensi 1, dengan konsentrasi 0,1 M dapat dinetralkan oleh 10 mL larutan KOH (Mr = 56) maka 1 liter larutan KOH tersebut mengandung…",
      choices: [
        { id: 1, text: "2,8 gram KOH" },
        { id: 2, text: "0,28 gram KOH" },
        { id: 3, text: "0,56 gram KOH" },
        { id: 4, text: "1,4 gram KOH" },
        { id: 5, text: "5,6 gram KOH" },
      ],
      correctAnswerId: 4,
    },
    {
      id: 4,
      question: "Data trayek pH dan perubahan warna indikator di atas. Bagaimanakah warna indikator metil jingga dan phenolphtalein dalam larutan ammonium klorida ?",
      image: require("../../../../../../../asset/tabel_soal.png"),
      choices: [
        { id: 1, text: "Merah - Kuning" },
        { id: 2, text: "Kuning - Kuning" },
        { id: 3, text: "Kuning - Biru" },
        { id: 4, text: "Kuning - Tak berwarna" },
        { id: 5, text: "Kuning - Merah" },
      ],
      correctAnswerId: 4,
    },
    {
      id: 5,
      question: "20 ml 0,1 N larutan KOH dinetralkan dengan 20 ml 0,1 larutan asam asetat. Indikator yang paling tepat untuk digunakan adalah…",
      choices: [
        { id: 1, text: "Jingga Metil (menunjukkan pH 3,1 - 4,4) " },
        { id: 2, text: "Metil Merah (menunjukkan pH 4,2 - 6,2) " },
        { id: 3, text: "Bromtrimol biru (menunjukkan pH 6,0 - 7,6) " },
        { id: 4, text: "Fenolttalein (menunjukkan pH 8 - 10) " },
        { id: 5, text: "Bukan salah satu dari penunjuk diatas" },
      ],
      correctAnswerId: 4,
    },
    // Add more questions as needed
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    questions.map(() => null)
  );


  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handleSave = () => {
    // Menghitung total point yang terkumpul
    let totalPoints = 0;
    for (let i = 0; i < questions.length; i++) {
      if (
        selectedAnswers[i] &&
        selectedAnswers[i].id === questions[i].correctAnswerId
      ) {
        totalPoints++;
      }
    }
  
    if (currentQuestionIndex === questions.length - 1) {
      // Navigasi ke halaman baru untuk menampilkan total point dan total soal
      navigation.replace("HasilPostTest", {
        totalPoints,
        selectedAnswers,
        questions,
      });
    }else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBoxPress = (choice) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = choice;
    setSelectedAnswers(updatedAnswers);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex];

  return (
    <ImageBackground
      source={require("../../../../../../../asset/bg-coklat-tua.png")}
      style={styles.container}
    >
      <View>
        <View style={[styles.card, { width: width * 0.8, height: height * 0.65 }]}>
          <View style={[styles.cardHeader, { width: width * 0.8, height: height * 0.08 }]}>
            <Image
              style={[styles.wrapperLayout, { width: width * 0.17, height: height * 0.056 }]}
              resizeMode="cover"
              source={require("../../../../../../../asset/logo-panjang.png")}
            />
            <View style={[styles.garis, { height: height * 0.04 }]}></View>
            <View style={[styles.titleBox, { width: width * 0.5, height: height * 0.078 }]}>
              <Text style={styles.title}>Post-Test</Text>
            </View>
          </View>
          <ScrollView>
            <View style={{ marginTop: width * 0.02 }}>
              <Text style={styles.pageText}>
                Soal no <Text style={{fontWeight:'bold'}}>{currentQuestionIndex + 1}</Text>/ <Text style={{fontWeight:'bold'}}>{questions.length}</Text>
              </Text>
              {currentQuestion.image && (
                <ScrollView horizontal >
                  <View style={{width:width*1.2, height:height*0.3}}>
                    <Image source={currentQuestion.image} style={{ height: height * 0.25, width: width*1.2 }} resizeMode="stretch" />
                  </View>
                  
                </ScrollView>
              )}
              <Text style={styles.question}>{currentQuestion.question}</Text>
              <View style={[styles.boxesContainer, { marginBottom: height * 0.02 }]}>
                {currentQuestion.choices.map((choice) => (
                  <TouchableOpacity
                    key={choice.id}
                    style={[
                      styles.box,
                      selectedAnswer === choice ? styles.selectedBox : null,
                      { width: width * 0.74, height: height * 0.06 },
                    ]}
                    onPress={() => handleBoxPress(choice)}
                  >
                    <Text
                      style={[
                        styles.answer,
                        selectedAnswer === choice ? styles.selectedAnswer : null,
                      ]}
                    >
                      {choice.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          {currentQuestionIndex > 0 && (
            <TouchableOpacity
              style={[styles.button, { width: width * 0.25, height: height * 0.05 }]}
              onPress={handleBack}
            >
              <Text style={styles.buttonText}>Kembali</Text>
            </TouchableOpacity>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <TouchableOpacity
              style={[styles.button, { width: width * 0.25, height: height * 0.05 }]}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>Lanjut</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, { width: width * 0.25, height: height * 0.05 }]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Simpan</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  wrapperLayout: {
    marginEnd: 5,
    marginTop: 5,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  garis: {
    flexDirection: "column",
    borderEndWidth: 2,
    marginEnd: 5,
    marginTop: 15,
    borderEndColor: "black",
  },
  title: {
    fontSize: 18,
    margin: 5,
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: theme.font.bold,
    color: "black",
  },
  titleBox: {
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  question: {
    fontSize: 15,
    color: "black",
    marginBottom: 20,
    textAlign:'justify',
    margin: 5,
    fontFamily: theme.font.regular
  },
  boxesContainer: {
    justifyContent: "space-between",
    alignItems:'center'
  },
  box: {
    backgroundColor: "#C9B8A8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderRadius: 25,
    padding: 3,
  },
  selectedBox: {
    backgroundColor: "#746555",
  },
  answerFind: {
    color: "black",
    fontSize: 16,
    
  },
  pageText: {
    color: "#746555",
    fontSize: 14,
    textAlign:'center',
    fontFamily: theme.font.bold
  },
  answer: {
    color: "black",
    fontSize: 14,
    fontFamily: theme.font.regular,
  },
  selectedAnswer: {
    color: "white",
    fontSize: 14,
    fontFamily: theme.font.bold
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#C9B8A8",
    marginTop: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 15,
    color: "black",
    fontFamily: theme.font.regular,
  },
});

export default PostTest;

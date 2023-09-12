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

const PreTest = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Kelompok senyawa hidroksida yang merupakan asam adalah…...",
      choices: [
        { id: 1, text: "Al(OH)3 ;Si(OH)4; PO(OH)3" },
        { id: 2, text: "Si(OH)4; SO2(OH)2; Mg(OH)2" },
        { id: 3, text: "Mg(OH)2;SO2(OH)2 ; ClO3(OH)" },
        { id: 4, text: "ClO3(OH); PO(OH)3 ; SO2(OH)2" },
        { id: 5, text: "ClO3(OH); SO2(OH)2 ;Mg(OH)2" },
      ],
      correctAnswerId: 2, // ID of the correct answer choice
    },
    {
      id: 2,
      question: "Spesi H2O yang yang berfungsi sebagai basa menurut Bronsted Lowry, terdapat pada ",
      choices: [
        { id: 1, text: "H2SO4 (aq) + H2O (l) ⇌ HSO4- (aq) + H3O+ (aq) " },
        { id: 2, text: "NH4+ (aq) + H2O (l) ⇌ H3O+ (aq) + NH3 (aq) " },
        { id: 3, text: "CO32- (aq) + H2O (l) ⇌ HCO3- (aq) + OH- (aq) " },
        { id: 4, text: "HCl (aq) + H2O (l) ⇌ Cl- (aq) + H3O+ (aq) " },
        { id: 5, text: "H2PO4- + H2O (l)  ⇌ HPO42- (aq) + H3O+ (aq)" },
      ],
      correctAnswerId: 3,
    },
    {
      id: 3,
      question: "H2CO3 mengion melalui 2 tahap yaitu:\nH2CO3 + H2 O  ⇌ H3O+ + HCO3-\nHCO3- + H2O ⇌  H3O+ + CO32-\nPada reaksi ini yang membentuk pasangan asam-basa konjugasi adalah . . . .",
      choices: [
        { id: 1, text: "H2O dan HCO3-" },
        { id: 2, text: "HCO3- dan H3O+" },
        { id: 3, text: "H2O dan CO32-" },
        { id: 4, text: "H2O dan H3O+" },
        { id: 5, text: "H2CO3 dan CO32-" },
      ],
      correctAnswerId: 4,
    },
    {
      id: 4,
      question: "Identifikasi mana yang berfungsi sebagai asam, basa, asam konjugasi, dan basa konjugasi dari reaksi-reaksi berikut?",
      choices: [
        { id: 1, text: "NH3 + H2O ⇌ NH4+ + OH-" },
        { id: 2, text: "HCO3- + H3O+ ⇌ H2CO3 + H2O" },
        { id: 3, text: "S2- + H2O ⇌ HS- + OH-" },
        { id: 4, text: "CH3NH2 + HCl ⇌ CH3NH3+ + Cl" },
        { id: 5, text: "HCO3- + H2O ⇌  H3O+ + CO32-" },
      ],
      correctAnswerId: 4,
    },
    {
      id: 5,
      question: "Campuran antara 50 mL larutan NaOH (pH = 10) dengan 50 mL larutan HCl (pH = 2) diperoleh larutan dengan..",
      choices: [
        { id: 1, text: "pH = 2" },
        { id: 2, text: "pH = 3" },
        { id: 3, text: "2 < pH < 3" },
        { id: 4, text: "3 < pH < 4" },
        { id: 5, text: "4 < pH < 5" },
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
      navigation.replace("HasilPreTest", {
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
              <Text style={styles.title}>Pre-Test</Text>
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
                      { width: width * 0.76, height: height * 0.07 },
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

export default PreTest;

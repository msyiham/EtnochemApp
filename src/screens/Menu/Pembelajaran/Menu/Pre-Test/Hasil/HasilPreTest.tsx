import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet, ImageBackground, ScrollView, useWindowDimensions, Image, TouchableOpacity } from "react-native";
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../../../../../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, FieldValue, doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import LoadingScreen from "../../../../../../components/Loading";
const HasilPreTest = ({ route, navigation }) => {
  const { totalPoints, selectedAnswers, questions} = route.params;
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
    const saveTotalPointToFirestore = async (uid) => {
      try {
        setLoading(true);
        const firestore = FIRESTORE_DB;
        const docRef = doc(firestore, "users", uid);
    
        // Check if the document exists in Firestore for the given UID
        const docSnapshot = await getDoc(docRef);
    
        if (docSnapshot.exists()) {
          // If the document already exists, update the totalPoints field
          await updateDoc(docRef, {
            totalPointsPreTest: totalPoints,
          });
        }
    
        console.log("Total points saved to Firestore successfully!");
        navigation.replace('Pembelajaran');
      } catch (error) {
        console.error("Error saving total points to Firestore:", error);
      }finally{
        setLoading(false);
      }
    };
  return (
    <ImageBackground source={require("../../../../../../../asset/bg-coklat-tua.png")} style={styles.container}>
        <LoadingScreen visible={loading}/>
        <View style={[styles.card, { width: width * 0.8, height: height * 0.65 }]}>
          <View style={[styles.cardHeader, { width: width * 0.8, height: height * 0.08 }]}>
            <Image
              style={[styles.wrapperLayout, { width: width * 0.17, height: height * 0.056 }]}
              resizeMode="cover"
              source={require("../../../../../../../asset/logo-panjang.png")}
            />
            <View style={[styles.garis, { height: height * 0.04 }]}></View>
            <View style={[styles.titleBox, { width: width * 0.5, height: height * 0.078 }]}>
              <Text style={styles.title}>Hasil Post-Test</Text>
            </View>
          </View>
          <ScrollView style={{ flex: 1, alignContent:'center' }}>
            <Text style={styles.text}>Total Skormu!</Text>
            <View style={[styles.circlePoint, {width:width*0.6, height:height*0.3, borderStyle: 'dashed', borderRadius:width*0.6, borderWidth:4 }]}>
              <Text style={styles.point}>{totalPoints*20}/100</Text>
            </View>
            <View style={[styles.resultContainer, {width:width*0.8}]}>
              <Text style={styles.resultText}>Pembahasan:</Text>
              <View style={styles.pembahasanContainer}>
                  {questions.map((question, index) => {
                  const selectedAnswer = selectedAnswers[index];
                  if (
                      selectedAnswer &&
                      selectedAnswer.id !== question.correctAnswerId
                  ) {
                      return (
                      <View key={question.id} style={[styles.questionContainer, {marginBottom: height*0.03}]}>
                          <Text style={styles.questionCheck}>{question.id}. <Text style={{color:'red'}}>SALAH</Text></Text>
                          <Text style={styles.question}>{question.question}</Text>
                          <Text style={styles.correctAnswer}>
                          Jawaban yang Benar: {question.choices.find(choice => choice.id === question.correctAnswerId)?.text}
                          </Text>
                      </View>
                      );
                  }else if(                      
                    selectedAnswer &&
                    selectedAnswer.id == question.correctAnswerId
                  ) {
                    return (
                      <View key={question.id} style={[styles.questionContainer, {marginBottom: height*0.03}]}>
                          <Text style={styles.questionCheck}>{question.id}. <Text style={{color:'green'}}>BENAR</Text></Text>
                          <Text style={styles.question}>{question.question}</Text>
                          <Text style={styles.correctAnswer}>
                          Jawabannya: {question.choices.find(choice => choice.id === question.correctAnswerId)?.text}
                          </Text>
                      </View>
                      );
                  }
                  return null;
                  })}
              </View>

            </View>
          </ScrollView>

        </View>
              <TouchableOpacity
                  style={[styles.button, { width: width * 0.3, height: height * 0.05, marginTop: height*0.05 }]}
                  onPress={() => {
                    // Call the saveTotalPointToFirestore function when the button is pressed
                    const auth = FIREBASE_AUTH;
                    const user = auth.currentUser;
                    if (user) {
                      // If the user is signed in, get the UID and call the saveTotalPointToFirestore function
                      const uid = user.uid;
                      saveTotalPointToFirestore(uid);
                      console.log("User UID:", uid);
                    } else {
                      console.log("User is signed out.");
                    }
                  }}
              >
                  <Text style={styles.buttonText}>Simpan</Text>
              </TouchableOpacity>
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
    fontWeight: "bold",
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
  text: {
    margin:10,
    fontSize: 20,
    color:'#C9B8A8',
    textAlign:'center',
    marginBottom: 10,
  },
  circlePoint:{
    backgroundColor:'#C9B8A8',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  point: {
    fontSize: 48,
    textAlign:'center',
    fontWeight: "bold",
    color: "black",
  },
  resultContainer: {
    marginTop: 20,
    backgroundColor:'white',
    borderRadius: 10,
    padding: 5,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color:'black',
  },
  questionContainer: {
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    marginBottom: 5,
    color:'gray',
  },
  questionCheck: {
    fontSize: 16,
    marginBottom: 5,
    color:'black',
    fontWeight:'700',
  },
  correctAnswer: {
    fontSize: 14,
    fontStyle: "italic",
    color: "green",
  },
  button: {
    backgroundColor: "#C9B8A8",
    marginTop: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 15,
    color: "black",
    fontWeight:'700'
  },
});

export default HasilPreTest;

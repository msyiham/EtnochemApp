import React, { useState, useCallback, useLayoutEffect } from "react";
import { Dimensions, TouchableOpacity, StyleSheet, View, ScrollView, Text, ImageBackground, FlatList, useWindowDimensions } from "react-native";
import Button from "../../../../../../components/ButtonPanjang/ButtonPanjang";
import theme from "../../../../../../../theme";
import Pdf from 'react-native-pdf';


const PdfViewer = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(0); // State untuk melacak halaman saat ini
  const [showButton, setShowButton] = useState(false); // State untuk menampilkan tombol

  const goToEnterCode = () => {
    navigation.replace('UniqueCode');
  };
  const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/PEMBELAJARAN%20ASAM%20BASA.pdf?alt=media&token=e60397d5-1b71-4ada-af74-228390f7356f', cache: true };

  const handlePageChange = useCallback((page, numberOfPages) => {
    setCurrentPage(page); // Perbarui state saat halaman berubah
    setShowButton(page > 4);
    // Menyembunyikan tombol jika halaman kurang dari atau sama dengan 4 and not registered
    console.log(`Current page: ${page}`);
  }, []);

  return (
    <View style={styles.container}>
      {/* PDF Viewer */}
      <Pdf
        trustAllCerts={false}
        source={source}
        showsVerticalScrollIndicator={true}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
          setShowButton(numberOfPages > 4); // Menyembunyikan tombol jika jumlah halaman kurang dari atau sama dengan 4
        }}
        onPageChanged={handlePageChange} // Gunakan fungsi handlePageChange untuk memperbarui state
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />

      {/* Closed Container */}
      {showButton && (
        <View style={[styles.closedContainer, {padding:width*0.1}]}>
            <View>
                <Text style={styles.text}>Anda tidak dapat membaca semua halaman, anda harus memasukkan kodenya terlebih dahulu</Text>
                <View style={{flexDirection:'row', marginStart: width*0.1}}>
                    <TouchableOpacity style={styles.button} onPress={goToEnterCode}>
                        <Text style={styles.buttonText}>Masukkan Kode</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                        <Text style={styles.buttonText}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    height: 50, // Adjust the height as needed
    backgroundColor: "#8D7B68",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 5
  },
  buttonText:{
    opacity: 2,
    color:'black',
    fontSize: 15,
    fontFamily: theme.font.bold,
  },
  text:{
    opacity: 2,
    color:'black',
    fontSize: 15,
    fontFamily: theme.font.bold,
  },
  closedContainer: {
    backgroundColor: 'gray', // Membuat closedContainer transparan
    opacity: 0.7,
    justifyContent: 'center', // Untuk mengatur posisi di tengah sumbu vertikal
    alignItems: 'center', // Untuk mengatur posisi di tengah sumbu horizontal
    position: 'absolute', // Menggunakan position: 'absolute' agar tampil di atas PDF
    top: '50%', // Menggeser ke posisi tengah sumbu vertikal
    left: '50%', // Menggeser ke posisi tengah sumbu horizontal
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    transform: [{ translateX: -Dimensions.get('window').width / 2 }, { translateY: -Dimensions.get('window').height / 2 }], // Mengatur posisi relatif terhadap tengah halaman
  }
});

export default PdfViewer;

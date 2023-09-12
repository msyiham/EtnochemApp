import { StyleSheet, Dimensions, View } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf';
const LKPD = () => {
    const source = { uri: 'https://firebasestorage.googleapis.com/v0/b/etnochem-696d8.appspot.com/o/DIKTAT%20ETNOCHEM_removed.pdf?alt=media&token=e7bcecce-d188-45f1-92a3-d1a863d85768', cache: true };
  return (
    <View style={styles.container}>
      {/* PDF Viewer */}
      <Pdf
        trustAllCerts={false}
        source={source}
        showsVerticalScrollIndicator={true}
        style={styles.pdf}
      />
    </View>
  )
}

export default LKPD

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    pdf: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
import React from 'react';
import { View, StyleSheet, Text, useWindowDimensions} from 'react-native';
import { WebView } from 'react-native-webview';

const PdfViewer = () => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View style={{height:0.2, backgroundColor:'yellow', width:width}}>
        <Text>Flip Book</Text>
      </View>
      <WebView
        source={{ uri: 'https://online.fliphtml5.com/ajyyy/vowx/' }}
        originWhitelist={['*']}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EDE0B3",
    width: "100%",
    height: "100%",
  },
});

export default PdfViewer;
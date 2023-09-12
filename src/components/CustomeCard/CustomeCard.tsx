import React from "react";
import { Image, StyleSheet, View, Text, useWindowDimensions } from "react-native";
import theme from "../../../theme";
const CustomeBar = ({ title }) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.card, { width: width * 0.8, height: height * 0.090 }]}>
        <Image
          style={[styles.wrapperLayout, { width: width * 0.2, height: height * 0.05 }]}
          resizeMode="cover"
          source={require("../../../asset/logo-panjang.png")}
        />
        <View style={[styles.garis, { height: height * 0.04 }]}></View>
        <View style={[styles.titleBox, { width: width * 0.5, height: height * 0.078 }]}>
          <Text style={[styles.title]}>{title}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperLayout: {
    marginStart: 5,
    marginEnd: 5,
    marginTop: 5,
  },
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    alignSelf: 'center',
  },
  garis: {
    flexDirection: 'column',
    borderEndWidth: 2,
    marginStart: 5,
    borderEndColor: 'black',
  },
  title: {
    fontSize: 18,
    fontFamily: theme.font.bold,
    margin: 5,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'black',
  },
  titleBox: {
    justifyContent: 'center',
  },
});

export default CustomeBar;

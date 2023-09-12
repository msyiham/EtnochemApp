import React from 'react';
import { View, Text, TextInput, StyleSheet, useWindowDimensions } from 'react-native';
import theme from '../../../theme';
const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, {width:width*0.7, height:height*0.05}]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor="#fff" // Apply custom color to the placeholder text
        style={styles.input}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C9B8A8',
    borderColor: 'black',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 10,
  },
  input: {
    color: 'black', // Customize the input text color
    fontSize: 16, // Customize the input font size
    paddingVertical: 8, // Customize the vertical padding of the input
    fontFamily: theme.font.regular,
  },
});

export default CustomInput;

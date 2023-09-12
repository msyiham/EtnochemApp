import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../../../theme';
const CustomInput = ({ value, setValue, placeholder, secureTextEntry, keyboardType }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor="#808080" // Apply custom color to the placeholder text
        style={styles.input}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom: 10,
  },
  input: {
    color: 'black', // Customize the input text color
    fontSize: 16, // Customize the input font size
    paddingVertical: 8, // Customize the vertical padding of the input
    fontFamily: theme.font.regular
  },
});

export default CustomInput;

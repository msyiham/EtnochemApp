import React, { useState } from 'react';
import { View, Pressable, TextInput, StyleSheet, useWindowDimensions } from 'react-native';
import theme from '../../../theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PasswordInput = ({ onPasswordChange }) => {
  const { width } = useWindowDimensions();
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    // Pass the password value to the parent component
    if (onPasswordChange) {
      onPasswordChange(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        name="password"
        placeholder="Masukkan Password"
        placeholderTextColor={'gray'}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="newPassword"
        secureTextEntry={passwordVisibility}
        value={password}
        enablesReturnKeyAutomatically
        onChangeText={handlePasswordChange} // Call the handlePasswordChange function
      />
      <Pressable onPress={handlePasswordVisibility} style={{ justifyContent: 'center' }}>
        <FontAwesome5 name={passwordVisibility ? 'eye' : 'eye-slash'} size={20} color="#232323" />
      </Pressable>
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
    flexDirection: 'row',
  },
  input: {
    width: '90%',
    color: 'black', // Customize the input text color
    fontSize: 16, // Customize the input font size
    paddingVertical: 8,
    fontFamily: theme.font.regular,
  },
});

export default PasswordInput;

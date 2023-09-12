import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import theme from '../../../theme';
const MenuBar = ({ navigation, activeScreen, children, contentMarginTop }) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: windowWidth * 0.9, height: windowHeight * 0.05, marginTop: windowHeight * 0.08, }]}>
        <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('Home')}>
          <Text style={activeScreen === 'Beranda' ? styles.menuTextActive : styles.menuText}>Beranda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('TentangKami')}>
          <Text style={activeScreen === 'TentangKami' ? styles.menuTextActive : styles.menuText}>Tentang Kami</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBar} onPress={() => navigation.navigate('Profile')}>
          <Text style={activeScreen === '' ? styles.menuTextActive : styles.menuText}>Akun</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.content, { marginTop: windowHeight * 0.05 }]}>{children}</View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: '#C9B8A8',
    marginBottom: 10,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  menuBar: {
    margin: 10,
  },
  menuText: {
    textAlign: 'center',
    color: 'black',
    fontFamily: theme.font.regular,
  },
  menuTextActive: {
    textAlign: 'center',
    color: 'white',
    textDecorationLine: 'underline',
    fontFamily: theme.font.bold,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default MenuBar;

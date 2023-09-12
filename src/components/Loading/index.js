import React from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = ({visible}) => {
  return (
    <View>
        <Modal visible={visible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <LottieView 
              style={styles.lottie}
              source={require("../../../asset/loading.json")} 
              loop={true}
              autoPlay={true}
            />
          </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  lottie:{
    width: 200,
    height: 200,
  },
});

export default LoadingScreen;

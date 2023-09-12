import React,{useState} from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ImageView from "react-native-image-viewing";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
const FullScreenImage = ({ route, navigation }) => {
  const { image } = route.params;
  const [visible, setIsVisible] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
    <ReactNativeZoomableView
      maxZoom={1.5}
      minZoom={0.5}
      zoomStep={0.5}
      initialZoom={1}
      bindToBorders={true}
      //onZoomAfter={this.logOutZoomState}
      style={{
        padding: 10,
        backgroundColor: '#000',
      }}
    >
      <Image 
        style={{ flex: 1, width: null, height: '100%' }}
        source={{uri: image}}
        resizeMode="contain" 
      />
    </ReactNativeZoomableView>
  </View>
  );
};



export default FullScreenImage;

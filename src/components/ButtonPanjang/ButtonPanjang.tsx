import React, { Component } from 'react';
import AwesomeButton from "react-native-really-awesome-button";
import { View, Image, Text, StyleSheet, useWindowDimensions, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../theme';

interface Props {
  title: string;
  onPress?: () => void;
  backgroundColor?: string; // Added backgroundColor prop
}

export default class Button extends Component<Props> {
  render() {
    const { height, width } = Dimensions.get('window');
    const { title, onPress, backgroundColor } = this.props;
    const buttonStyle = {
      margin: 5, // Default margin value
      // width: width * 0.4, // Responsive width (40% of the screen width)
    };
    const textStyle = {
      color: 'black',
      fontFamily: theme.font.regular
    };
    return (
      <AwesomeButton
        onPress={onPress}
        borderRadius={20}
        style={buttonStyle}
        width= {width * 0.75}
        backgroundShadow="#8D7B68"
        backgroundDarker="tranparent"
        borderWidth={width * 0.005}
        extra={
          <LinearGradient
            colors={["#C9B8A8", "#C9B8A8", "#C9B8A8", "#C9B8A8"]}
            style={{ ...StyleSheet.absoluteFillObject }}
          />
        }
      >
        <Text style={textStyle}>{title}</Text>
      </AwesomeButton>
    );
  }
}

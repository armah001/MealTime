import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import CustomButton from './CustomButton';

const Hero = () => {
    return (
        <ImageBackground source={require('../assets/burger.avif')} style={styles.container}>
          
        </ImageBackground>
    );
};

export default Hero;

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: "40%",
      alignItems: 'center',
      justifyContent: 'center',
      objectFit:'fill'
    },
});
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Platform, StatusBar } from 'react-native';

const TitleCard = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/burger.avif')} style={styles.cardImage}>
                <Text style={styles.text}>Digital Hub Ghana</Text>
                <Text style={styles.text}>Lunch Portal</Text>
            </ImageBackground>
        </View>
    );
};

export default TitleCard;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 120,
    },
    cardImage: {
        width: width * 0.9,
        height: height * 0.2,
        resizeMode: 'cover',
        borderRadius: 10, 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"red"
    },
    text: {
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
    }
});


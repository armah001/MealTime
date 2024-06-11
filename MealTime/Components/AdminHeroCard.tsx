import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Platform, StatusBar } from 'react-native';

const AdminHeroCard = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/burger.avif')} style={styles.cardImage} >
                <View style={styles.overlay}/>
                <Text style={styles.text}>Digital Hub Ghana</Text>
                <Text style={styles.subtext}>Lunch Portal</Text>
            </ImageBackground>
        </View>
    );
};

export default AdminHeroCard;

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {      
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 120,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
    },
    cardImage: {
        width: width * 0.95,
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
        fontWeight:"500",
        marginLeft:-150,
        marginBottom:-50
        
    },
    subtext: {
        color: "white",
        fontSize: 30,
        fontWeight:"500",
        marginLeft:-220,
        marginBottom:-150
        
    }
});


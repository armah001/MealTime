import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, StatusBar, TextInput, Keyboard, Animated, Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from './CustomButton';

const MealUpdateFail = ({  }) => {
    const [keyboardOffset, setKeyboardOffset] = useState(new Animated.Value(0));
        useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const keyboardDidShow = (event) => {
        Animated.timing(keyboardOffset, {
            duration: 50,
            toValue: -event.endCoordinates.height,
            useNativeDriver: false,
        }).start();
    };

    const keyboardDidHide = () => {
        Animated.timing(keyboardOffset, {
            duration: 300,
            toValue: 0,
            useNativeDriver: false,
        }).start();
    };

    return (
        <Animated.View style={[styles.mainContainer, { transform: [{ translateY: keyboardOffset }] }]}>
            <View style={styles.container}>
                <View style={styles.cardHeader}>
                    <Text style={styles.title}>New Meal</Text>
                    <TouchableOpacity style={styles.closeIcon} >
                        <Image 
                            style={styles.uploadIcon}
                            source={require('../assets/GroupFail.png')} />
                            <Text>Sorry, an error occurred while updating meal. Try again!!</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.line} />
               
                <View style={styles.buttonContainer}>
                    <CustomButton buttonWidth={370} title='Try Again' />
                </View>
            </View>
        </Animated.View>
    );
};

export default MealUpdateFail;

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    textInputStyle: {
        marginLeft: 20,
        marginBottom: 40,
        width: width * 0.9,
        height: height * 0.1,
        backgroundColor: "#F9F9F9",
        borderRadius: 10,
        paddingLeft: 20,
        paddingBottom: 30,
    },
    cardHeader: {
        width: width,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    inputSection: {
        width: width,
        height: height * 0.22
    },
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width,
        height: height * 0.4,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 50
    },
    title: {
        color: '#000033',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        color: "black",
        fontSize: 18,
        textAlign: "left",
        fontWeight: "500",
        margin: 20,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10
    },
    cancelButton: {
        borderColor: '#000033',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: '45%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#000033',
    },
    closeIcon: {
        paddingBottom: 16,
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: '#000033',
        borderRadius: 5,
        padding: 10,
        width: '45%',
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(217,217,217,1)',
        marginBottom: 10,
        marginTop: -10
    },
    imageUploadSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    uploadIcon: {
        marginLeft: 20,
    },
    
});

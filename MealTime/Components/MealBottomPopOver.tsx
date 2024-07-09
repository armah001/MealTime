import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, TextInput, Keyboard, Animated, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 
import CustomButton from './CustomButton';
import { REACT_NATIVE_BASE_URL } from '@env';

interface MealBottomPopOverProps {
    onConfirm: () => Promise<void>;
    onCancel: () => void;
    compHeight: number;
    initialMealName: string; // Define initialMealName as string
    initialMealImage: string; // Define initialMealImage as string
}

const MealBottomPopOver: React.FC<MealBottomPopOverProps> = ({ onConfirm, onCancel, compHeight, initialMealName, initialMealImage }) => {
    const [mealName, setMealName] = useState(initialMealName); // Initialize with initialMealName
    const [mealImage, setMealImage] = useState(initialMealImage); // Initialize with initialMealImage
    const [keyboardOffset, setKeyboardOffset] = useState(new Animated.Value(0));

    const handleMealChange = (text: string) => {
        setMealName(text);
    };

    const handleImageUpload = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert('Permission Denied', 'You need to grant permission to access photos.');
                return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                allowsMultipleSelection: false,
            });

            if (!pickerResult.canceled) {
                setMealImage(pickerResult.assets[0].uri); // Update state with selected image URI
            }
        } catch (error) {
            console.error('Error picking images', error);
        }
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);
        
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const keyboardDidShow = (event: any) => {
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

    const handleConfirm = async () => {
        try {
            const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/Meal/AddMeal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newMeal: mealName,
                    mealImage: mealImage,
                }),
            });

            if (response.ok) {
                console.log('Meal added successfully with status code:', response.status);
                onConfirm(); // Optional: Call a callback function upon successful addition
            } else {
                console.log('Failed to add meal:', response.status);
                // Handle failure scenario here if needed
            }
        } catch (error) {
            console.error('Error adding meal:', error);
            // Handle error scenario here if needed
        }
    };

    return (
        <Animated.View style={[styles.mainContainer, { transform: [{ translateY: keyboardOffset }] }]}>
            <View style={styles.container}>
                <View style={styles.cardHeader}>
                    <Text style={styles.title}>Edit Meal</Text>
                    <TouchableOpacity style={styles.closeIcon} onPress={onCancel}>
                        <MaterialCommunityIcons name="window-close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.line} />
                <View style={styles.inputSection}>
                    <Text style={styles.text}>Meal Image</Text>
                    <TouchableOpacity style={styles.imageUploadSection} onPress={handleImageUpload}>
                        {mealImage ? (
                            <Image source={{ uri: mealImage }} style={styles.uploadedIcon} />
                        ) : (
                            <Image style={styles.uploadIcon} source={require('../assets/addmeal.png')} />
                        )}
                    </TouchableOpacity>
                    <Text style={styles.text}>Meal Name</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Enter name of the Meal'
                        value={mealName}
                        onChangeText={handleMealChange}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton buttonWidth={370} title='Save Changes' onPress={handleConfirm}/>
                </View>
            </View>
        </Animated.View>
    );
};

export default MealBottomPopOver;

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
        height: height * 0.5,
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
        marginTop: 110
    },
    closeIcon: {
        paddingBottom: 16,
        fontWeight: 'bold',
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
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    uploadedIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover',
        marginRight: 10,
    },
});

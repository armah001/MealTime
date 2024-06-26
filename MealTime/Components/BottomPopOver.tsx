import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, StatusBar, TextInput, Keyboard, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from './CustomButton';
import { REACT_NATIVE_BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    AllMenuPage: any;
  };

type NavigationProp = StackNavigationProp<RootStackParamList, 'AllMenuPage'>;

const BottomPopOver = ({ onConfirm, onCancel, compHeight }) => {
    const [menuName, setMenuName] = useState('');
    const [keyboardOffset, setKeyboardOffset] = useState(new Animated.Value(0));
    const navigation = useNavigation<NavigationProp>();

    const handleMenuChange = (text) => {
        setMenuName(text);
    };

    const addMenu = async () => {
        try {
            const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/Menu/AddMenu`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    menuName: menuName,
                }),
            });

            if (response.ok) {
                console.log('Menu added successfully with status code:', response.status);
                onConfirm(); // Optional: Call a callback function upon successful addition
            } else {
                console.log('Failed to add menu:', response.status);
                // Handle failure scenario here if needed
            }
        } catch (error) {
            console.error('Error adding menu:', error);
            // Handle error scenario here if needed
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
                    <Text style={styles.title}>New Menu</Text>
                    <TouchableOpacity style={styles.closeIcon} onPress={onCancel}>
                        <MaterialCommunityIcons name="window-close" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.line} />

                <View style={styles.inputSection}>
                    <Text style={styles.text}>Menu Name</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        placeholder='Enter name of the menu'
                        value={menuName}
                        onChangeText={handleMenuChange}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton buttonWidth={370} title='Create Menu' onPress={addMenu}/>
                </View>
            </View>
        </Animated.View>
    );
};

export default BottomPopOver;

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
    }
});

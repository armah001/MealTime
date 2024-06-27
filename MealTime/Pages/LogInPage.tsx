import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Dimensions, Modal, TouchableWithoutFeedback } from 'react-native';
import CustomButton from '../Components/CustomButton';
import TitleCard from '../Components/TitleCArd';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { REACT_NATIVE_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
import { AuthContext} from '../Components/AuthContext';
import { useFocusEffect } from '@react-navigation/native';


type RootStackParamList = {
    SignUp: any;
    HomePage:any;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const LogInPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp>();
    const [passwordError, setPasswordError] = useState('');
    const [logMessage, setLogMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [emailError, setEmailError] = useState('');
    
        useEffect(() => {
            const checkToken = async () => {
                const token = await SecureStore.getItemAsync("accessToken");
                if (token) {
                    console.log('User already logged in');
                    navigation.navigate('HomePage');
                }
            };

        checkToken();
    }, []);
    
    useFocusEffect(
        React.useCallback(() => {
          // This function will run every time the screen comes into focus
          setEmail('');
          setPassword('');
        }, [])
      );
      
    const handleEmailChange = (text: string) => {
        setEmail(text);
        validateEmail(text);
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
          setEmailError('Please enter a valid email address.');
        } else {
          setEmailError('');
        }
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (!text) {
            setPasswordError('Password is required');
        } else {
            setPasswordError('');
        }
    };

    const handleSubmit = async () => {

        // Clear existing token if it exists
        //await SecureStore.deleteItemAsync("accessToken");

        if (!email || !password) {
            setLogMessage('Please fill in all fields');
            return;
        }

        if (emailError) {
            setLogMessage('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch(`${REACT_NATIVE_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.accessToken;
                await SecureStore.setItemAsync("accessToken", token);

                console.log('User logged in successfully');
                navigation.navigate('HomePage');
            } else {
                console.log('Failed to log in:', data.message);
                setLogMessage('Failed to log in ');
                setModalVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setLogMessage('An error occurred: ' + error.message);
            setModalVisible(true);
        }
    };

    return (
        <AuthContext.Provider value={{ clearFields: () => { setEmail(''); setPassword(''); } }}>

        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.container}
                automaticallyAdjustKeyboardInsets
                showsVerticalScrollIndicator={false}
            >
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{logMessage}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <TitleCard/>
                <View style={styles.innerContainer}>
                    {logMessage ? <Text style={{color: 'red'}}>{logMessage}</Text> : null}

                    <Text style={styles.textStyle}>Login </Text>
                    <View>
                        <TextInput style={styles.textInputStyle}
                            placeholder='Email'
                            value={email}
                            onChangeText={handleEmailChange}
                        />
                        {emailError ? <Text style={{color: 'red'}}>{emailError}</Text> : null}
                        <TextInput style={styles.textInputStyle}
                            placeholder='Password'
                            value={password}
                            onChangeText={handlePasswordChange}
                            secureTextEntry
                        />
                        {passwordError ? <Text style={{color: 'red'}}>{passwordError}</Text> : null}
                    </View>
                    <Text style={styles.linkTextStyle2}>Forgot Password? </Text>
                    <CustomButton 
                        buttonWidth={width * 0.95} 
                        title="Log In" 
                        onPress={handleSubmit }
                    />       
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.linkTextStyle}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.linkTextStyle3}>SignUp </Text>
                    </TouchableOpacity>
                </View>    
            </ScrollView>
        </KeyboardAvoidingView>
        </AuthContext.Provider>
    );
};

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop:70
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    textInputStyle: {
        fontSize: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width: width * 0.95,
        marginBottom: 25 
    },
    linkTextStyle:{
        marginTop: 10,
    },
    linkTextStyle3:{
        marginTop: 10,
        color: 'blue'
    },
    linkTextStyle2:{
        marginBottom: 5,
        textAlign: 'right',
        color: 'blue',
        alignSelf: 'flex-end',
        marginRight: 45
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0
            
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default LogInPage;
import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity,ScrollView, KeyboardAvoidingView,Platform, Dimensions, TouchableHighlight, Modal } from 'react-native';
import CustomButton from '../Components/CustomButton';
import TitleCard from '../Components/TitleCArd';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { REACT_NATIVE_BASE_URL } from '@env';


type RootStackParamList = {
  LogIn: any;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LogIn'>;

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp>();
    const [emailError, setEmailError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    useEffect(() => {
        if (emailError) {
            setErrorMessage(emailError);
            setModalVisible(true);
        }
    }, [emailError]);

    const handleSubmit = async () => {
        validateEmail(email);

        if (emailError) {
            console.log(emailError);
            return;
        }

        if (!email || !password) {
            // Replace with your own logic for handling empty fields
            console.log('Please fill in all fields');
            return;
        }
    
        try {
            const response = await fetch(`${REACT_NATIVE_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
    
            
    
            if (response.ok) {
                //const data = await response.json();
                console.log('User registered successfully with status code:', response.status);
                navigation.navigate('LogIn');
            } else {
                console.log('Failed to register:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Sign up failed');
            setModalVisible(true);
        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
                <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>{errorMessage}</Text>
                <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                </TouchableHighlight>
            </View>
        </View>
    </Modal>
        <ScrollView contentContainerStyle={styles.container}
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
            >
            <TitleCard/>
            <View style={styles.innerContainer}>
            <Text style={styles.textStyle}>Sign Up </Text>
            <View>
                <TextInput style={styles.textInputStyle}
                    placeholder='Email'
                    value={email}
                    onChangeText={handleEmailChange}
                />
                <TextInput style={styles.textInputStyle}
                placeholder='Password'
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry
                />
           </View>
            <CustomButton buttonWidth={width * 0.95} title="Sign Up" onPress={handleSubmit}/>
            </View>

            <View style={{flexDirection:'row'}}>
                <Text style={styles.linkTextStyle}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                        <Text style={styles.linkTextStyle2}>Login </Text>
                    </TouchableOpacity>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignUpPage;

const {width} = Dimensions.get('screen');

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
        //marginLeft: 0
    },
    textInputStyle: {
        fontSize: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
       // width: 335,
        width: width * 0.95,
        marginBottom: 25 
    },
    linkTextStyle:{
        marginTop: 10,
        color: '#000000a0'
    },
    linkTextStyle2:{
        marginTop: 10,
        color: 'blue'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
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
            height: 2
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
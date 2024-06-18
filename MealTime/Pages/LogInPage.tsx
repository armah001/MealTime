import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView,Platform, Dimensions } from 'react-native';
import CustomButton from '../Components/CustomButton';
import TitleCard from '../Components/TitleCArd';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { REACT_NATIVE_BASE_URL } from '@env';

//import { REACT_NATIVE_BASE_URL} from '@env';

type RootStackParamList = {
    SignUp: any;
    HomePage:any;
    // Add other screen names here
  };

  type NavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const LogInPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp>();
    const [passwordError, setPasswordError] = useState('');
    const [logMessage, setLogMessage] = useState('');

    const handleEmailChange = (text: string) => {
        setEmail(text);
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
        if (!email || !password) {
            setLogMessage('Please fill in all fields');
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
                //await AsyncStorage.setItem('accessToken', data.accessToken);
                console.log('User logged in successfully');
                navigation.navigate('HomePage'); // Move this line here
            } else {
                console.log('Failed to log in:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setLogMessage('An error occurred: ' + error.message);

        }
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <ScrollView contentContainerStyle={styles.container}
            automaticallyAdjustKeyboardInsets
            showsVerticalScrollIndicator={false}
            >
98 
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
    );
};

const {width} = Dimensions.get('screen');

export default LogInPage;
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
        //marginLeft: 45
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
    }
  });
  
import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../Components/CustomButton';
import TitleCard from '../Components/TitleCArd';

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleSubmit = () => {
        
        console.log('Email:', email);
        //console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
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
            <CustomButton buttonWidth={335} title="Sign Up" />
            </View>

            <Text style={styles.linkTextStyle}>Already have an account? Login </Text>

        </View>
    );
};

export default SignUpPage;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
         
    },
    innerContainer: {
        width: '100%',
        marginTop:70
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    textInputStyle: {
        fontSize: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        width: 335,
        marginBottom: 25 
    },
    linkTextStyle:{
        marginTop: 10,
        color: '#000000a0'
    }
  });
  
import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity,ScrollView, KeyboardAvoidingView,Platform, Dimensions } from 'react-native';
import CustomButton from '../Components/CustomButton';
import TitleCard from '../Components/TitleCArd';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  LogIn: any;
  // Add other screen names here
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LogIn'>;

const SignUpPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NavigationProp>();

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
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
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
            <CustomButton buttonWidth={width * 0.95} title="Sign Up" onPress={()=>{}}/>
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
    }
});
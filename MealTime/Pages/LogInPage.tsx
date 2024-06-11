import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../Components/CustomButton';
import TitleCard from '../Components/TitleCArd';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    SignUp: any;
    // Add other screen names here
  };

  type NavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const LogInPage: React.FC = () => {
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
        // Add your login logic here
        console.log('Email:', email);
        //console.log('Password:', password);
    };

    return (
        <View style={styles.container}>
            <TitleCard/>
            <View style={styles.innerContainer}>
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
           </View>
           <Text style={styles.linkTextStyle2}>Forgot Password? </Text>
            <CustomButton buttonWidth={335} title="Log In" />
            </View>
            <View style={{flexDirection: 'row'}}>
            <Text style={styles.linkTextStyle}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.linkTextStyle3}>SignUp </Text>
                </TouchableOpacity>
                </View>    
        </View>
    );
};

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
        marginLeft: 45
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
  
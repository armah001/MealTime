import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
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
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
    validateEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      const validDomainSuffixes = ['.com', '.net', '.org'];
      const isValidDomain = validDomainSuffixes.some(suffix => email.toLowerCase().endsWith(suffix));
      
      if (!isValidDomain) {
        setEmailError('Email must end with .com, .net, or .org');
      } else {
        setEmailError('');
      }
    }
  };

  const validatePassword = (password: string) => {
    setPasswordError('');

    if (password.length < 8) {
      setPasswordError(prev => prev + 'Password must be at least 8 characters long.\n');
    }

    if (!/\d/.test(password)) {
      setPasswordError(prev => prev + 'Password must contain at least one digit (0-9).\n');
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordError(prev => prev + 'Password must contain at least one uppercase letter (A-Z).\n');
    }

    if (!/\W|_/.test(password)) {
      setPasswordError(prev => prev + 'Password must contain at least one non-alphanumeric character.\n');
    }
  };

  const handleSubmit = async () => {
    validateEmail(email);
    validatePassword(password);

    if (emailError) {
      console.log(emailError);
      return;
    }

    if (passwordError) {
      console.log(passwordError);
      return;
    }

    if (!email || !password) {
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
        console.log('User registered successfully with status code:', response.status);
        navigation.navigate('LogIn');
      } else {
        console.log('Failed to register:', response.status);
        // Handle failure scenario here if needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error scenario here if needed
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <TitleCard />
        <View style={styles.innerContainer}>
          <Text style={styles.textStyle}>Sign Up </Text>
          <View>
            <TextInput
              style={styles.textInputStyle}
              placeholder='Email'
              value={email}
              onChangeText={handleEmailChange}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <TextInput
              style={styles.textInputStyle}
              placeholder='Password'
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>
          <CustomButton buttonWidth={width * 0.95} title="Sign Up" onPress={handleSubmit} />
        </View>

        <View style={{ flexDirection: 'row' }}>
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

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 100,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 70,
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
    marginBottom: 25,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  linkTextStyle: {
    marginTop: 10,
    color: '#000000a0',
  },
  linkTextStyle2: {
    marginTop: 10,
    color: 'blue',
  },
});


import {useState} from 'react';
import { StyleSheet,View, Text, TouchableOpacity, Image } from 'react-native';
import CustomButton from './CustomButton';

//remove later 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TransparentButton from './TransparentButton';
import { REACT_NATIVE_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

type RootStackParamList = {
    HomePage: any
    // Add other screen names here
  };

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

const HandleRetrySubmission = async (selectedMeals: (string | null)[]) => {
    const payload = {
        mealNames: selectedMeals.filter(meal => meal !== null),
    
    };

    try {
        const token = await SecureStore.getItemAsync("accessToken"); 

        if (!token) {
            throw new Error('No token found');
        }

        const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/User/SelectMealBulk`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('Successfully submitted meal selections:', response.status);
            const data = await response.json();
            return data; // You can handle the response data as needed
        } else {
            console.log('Failed to submit meal selections:', response.status);
            // Handle failure scenario here if needed
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle error scenario here if needed
    }
};

const FailCard = ({}) => {  

    const navigation = useNavigation<NavigationProp>();

    const onRetry = async (selectedMeals) => {
        await HandleRetrySubmission(selectedMeals);
        console.log(selectedMeals);
    };

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../assets/cuate1.png')} 
            />
            <Text style={styles.text1}>Unsuccessful</Text>
            <Text style={styles.text}>The meals you have chosen for the week was not recorded sucessfuly!!!</Text>
            <View style={styles.button}>
            <View style={{ marginBottom: 10 }}>
                <CustomButton buttonWidth={355} title="Try Again" onPress={onRetry}  />       
                </View> 
                <CustomButton 
                buttonWidth={355} 
                title="Back To Choose Meals" 
                onPress={()=>navigation.navigate("HomePage")}
                //backgroundColor="transparent"
                //borderColor='#000033' // blue black color
                //textColor='#000033' // blue black color
                />            
            </View>
           
        </View>
        
    );
};

export default FailCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        height: 255,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        
        
    },
    image: {
        width: 200,
        height: 200,
    },
    text1: {
        color: '#D85151',
        fontSize: 20,
        fontWeight: '600',
        paddingLeft: 20,
        paddingTop: 20,
        textAlign: 'center',
        marginRight: 20
    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        paddingLeft: 20,
        paddingTop: 20,
        textAlign: 'center',
        marginRight: 20
    },
    button: {
        marginTop: 50,
        
    }
    
  });
  

import {useState} from 'react';
import { StyleSheet,View, Text, TouchableOpacity, Image } from 'react-native';
import CustomButton from './CustomButton';

//remove later 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    SuccessCard: any;
    // Add other screen names here
  };

type NavigationProp = StackNavigationProp<RootStackParamList, 'SuccessCard'>;

const SuccessCard : React.FC = () => {  

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../assets/cuate.png')} 
            />
            <Text style={styles.text}>Successful</Text>
            <Text style={styles.text}>The meals you have chosen for the week has sucessfuly been recorded!!!</Text>
            <View style={styles.button}>
                <CustomButton buttonWidth={355} title="View meals for the week" onPress={() => {}} />       
            </View>
           
        </View>
        
    );
};

export default SuccessCard;

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
  
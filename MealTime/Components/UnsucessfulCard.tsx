
import {useState} from 'react';
import { StyleSheet,View, Text, TouchableOpacity, Image } from 'react-native';
import CustomButton from './CustomButton';

//remove later 
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import TransparentButton from './TransparentButton';

type RootStackParamList = {
    HomePage: any
    // Add other screen names here
  };

type NavigationProp = StackNavigationProp<RootStackParamList, 'HomePage'>;

const FailCard : React.FC = () => {  

    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('../assets/cuate.png')} 
            />
            <Text style={styles.text}>Unsuccessful</Text>
            <Text style={styles.text}>The meals you have chosen for the week was not recorded sucessfuly!!!</Text>
            <View style={styles.button}>
            <View style={{ marginBottom: 10 }}>
                <CustomButton buttonWidth={355} title="Try Again" onPress={() => {}}  />       
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
  
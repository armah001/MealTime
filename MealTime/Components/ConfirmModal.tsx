import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import { REACT_NATIVE_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';


const submitMealSelections = async (selectedMeals: (string | null)[]) => {
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

    const ConfirmModal = ({ onConfirm, onCancel, selectedMeals }) => {
        const handleConfirm = async () => {
            await submitMealSelections(selectedMeals);
            console.log(selectedMeals);
            onConfirm();
        };

    return (
        <View style={styles.mainContainer}>
        <View style={styles.container}>
            <Text style={styles.title}>Confirm Meal</Text>
            <View style={styles.line} />
            <Text style={styles.text}>Please confirm the meals you have chosen for the week. 
                Once confirmed you can't undo it.</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    );
};

export default ConfirmModal;


const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {      
        alignItems: 'center',
        justifyContent: 'flex-start',
    
        //width: width * 0.95, // make the card smaller
        //height: height * 0.35,
        width: width * 0.95,
        height: height * 0.23,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    title: {
        color: '#000033', // blue black color
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        color: "black",
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        borderColor: '#000033', // blue black color
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        width: '45%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#000033', // blue black color
    },
    confirmButton: {
        backgroundColor: '#000033', // blue black color
        borderRadius: 5,
        padding: 10,
        width: '45%',
        alignItems: 'center',
    },
    confirmButtonText: {
        color: 'white',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(217,217,217,1)', // blue black color
        marginBottom: 10,
        marginTop: -10
    }
}); 
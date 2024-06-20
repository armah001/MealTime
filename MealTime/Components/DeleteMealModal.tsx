import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';

const DeleteMealModal = ({ onConfirm, onCancel }) => {

    return (
        <View style={styles.mainContainer}>
        <View style={styles.container}>
            <Text style={styles.title}>Delte Meal</Text>
            <View style={styles.line} />
            <Text style={styles.text}>Please confirm if you want to delete the meal. 
                Once deleted, action can't be undone.</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    );
};

export default DeleteMealModal;

// ... rest of your code

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
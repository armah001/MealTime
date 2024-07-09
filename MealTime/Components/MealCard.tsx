import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Platform } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import MealBottomPopOver from './MealBottomPopOver'; // Import the edit popover component
import { REACT_NATIVE_BASE_URL } from '@env';

const MealCard = ({ data, style, color, lightColor }) => {
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [mealName, setMealName] = useState(data.mealName); // Initialize with existing meal data
    const [mealImage, setMealImage] = useState(data.mealImage); // Initialize with existing meal data

    const handleDeleteMeal = async () => {
        try {
            const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/Meal/RemoveMeal?mealname=${encodeURIComponent(data.mealName)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log(`Menu '${data.mealName}' deleted successfully.`);
                setTimeout(() => { }, 2000);
            } else {
                console.error('Failed to delete meal:', response.status);
            }
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    const handleEditMeal = async () => {
        try {
            const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/Meal/EditMeal?mealId=${encodeURIComponent(data.mealId)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newMeal: mealName,
                    mealImage: mealImage
                }),
            });

            if (response.ok) {
                console.log(`Meal '${data.mealName}' Edited successfully.`);
                setIsPopoverVisible(false); // Close popover after editing
                setTimeout(() => { }, 2000);
            } else {
                console.error('Failed to edit meal:', response.status);
            }
        } catch (error) {
            console.error('Error editing meal:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
                <TouchableOpacity>
                    <View style={styles.iconAndName}>
                        <View style={[styles.imageView, { backgroundColor: lightColor }]}>
                            <SimpleLineIcons name="briefcase" size={20} color={color} />
                        </View>
                        <Text style={styles.mealName}>{data.mealName}</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity>
                        <EvilIcons name="trash" size={30} color="red" onPress={handleDeleteMeal} />
                        <EvilIcons name="pencil" size={30} color="red" onPress={() => setIsPopoverVisible(true)} />
                    </TouchableOpacity>
                </View>
            </View>
            {isPopoverVisible && (
                <MealBottomPopOver
                    onCancel={() => setIsPopoverVisible(false)}
                    onConfirm={handleEditMeal}
                    compHeight={height * 0.5} // Adjust as needed
                    initialMealName={mealName} // Pass current meal name to popover
                    initialMealImage={mealImage} // Pass current meal image to popover
                />
            )}
        </View>
    );
}

export default MealCard;

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        height: height * 0.10,
        paddingTop: 10,
        backgroundColor: "white",
        borderColor: "#F9F9F9",
        borderRadius: 5,
        marginBottom: 20,
        justifyContent: "space-between",
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    mealName: {
        fontSize: 10,
        fontWeight: "500",
    },
    firstRow: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginRight: 14,
        paddingHorizontal: 10,
    },
    imageView: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(34,97,171,0.11)",
        width: width * 0.10,
        height: height * 0.05,
        borderRadius: 5,
        marginRight: 10,
    },
    iconAndName: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
});

import { View, StyleSheet, Touchable, TouchableOpacity, Text, Image, Dimensions, Platform, Switch } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { SimpleLineIcons } from '@expo/vector-icons';
import { REACT_NATIVE_BASE_URL } from '@env';
import { useNavigation } from '@react-navigation/native';

const MealCard = ({ data,style, color,lightColor}) => {
    const [mealName, setMealName] = useState('');
    const [mealImage, setMealImage] = useState('');

    const handleDeleteMeal = async () => {
        try {
            const response = await fetch
            (`${REACT_NATIVE_BASE_URL}/api/Meal/RemoveMeal?mealname=${encodeURIComponent(data.mealName)}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Handle success scenario (e.g., remove menu from UI)
                console.log(`Menu '${data.mealName}' deleted successfully.`);
               setTimeout(()=> {},2000);
            } else {
                console.error('Failed to delete meal:', response.status);
                // Handle failure scenario if needed
            }
        } catch (error) {
            console.error('Error deleting meal:', error);
            // Handle error scenario if needed
        }
    };

    const handleEditMeal = async () => {
        try {
            const response = await fetch
            (`${REACT_NATIVE_BASE_URL}/api/Meal/EditMeal?mealId=${encodeURIComponent(data.mealId)}`, {
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
                // Handle success scenario (e.g., remove menu from UI)
                console.log(`Meal '${data.mealName}' Edited successfully.`);
               setTimeout(()=> {},2000);
            } else {
                console.error('Failed to edit meal:', response.status);
                // Handle failure scenario if needed
            }
        } catch (error) {
            console.error('Error editing meal:', error);
            // Handle error scenario if needed
        }
    };

    useEffect(()=>
        {
            if(handleDeleteMeal){
                //window.location.reload()
            }
        },[handleDeleteMeal])

    return (
        <View style={styles.container}>
            <View style={styles.firstRow}>
            <TouchableOpacity>
                    <View style={styles.iconAndName}>
                        <View style={[styles.imageView,{backgroundColor:lightColor}]}>
                        <SimpleLineIcons name="briefcase" size={20} color={color} />
                        </View>
                        <Text style={styles.mealName}>{data.mealName}</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity>
                        <EvilIcons name="trash" size={30} color="red"onPress={handleDeleteMeal} />
                        <EvilIcons name="pencil" size={30} color="red"onPress={handleEditMeal} />
                    </TouchableOpacity>
                </View>

            </View>
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
        marginBottom:20,
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
    toggleSwitch:{
        width:width *0.13,
    },
    switch: {
        transform: [{ scaleX: 0.65 }, { scaleY: 0.65 }],
      },
    vectorImange: {
        backgroundColor:"green",
        width: 40,
        height: 27,
        resizeMode: "cover"
    },
    subText: {
        fontSize: 16,
        fontWeight: "300",
        paddingLeft: 12
    },
    mealName: {
        fontSize: 7,
        fontWeight: "500"
    },
    firstRow: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginRight:14
    },
    secondRow: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 5
    },
    imageView: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(34,97,171,0.11)",
        width: width * 0.15,
        height: height * 0.05,
        borderRadius: 5,
        marginRight: 10,
        marginLeft: 12

    },
    iconAndName: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    }


})
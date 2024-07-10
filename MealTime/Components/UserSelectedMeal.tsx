import { View, StyleSheet, TouchableOpacity, Text, ImageBackground, Dimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const UserSelectedMeal = ({ data }) => {
    const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return (
        <View style={[styles.container]}>
            {data.map((meal, index) => {
                const imageUrl = meal.mealImage;
                return (
                    <View key={meal.Id}>
                        <Text style={styles.dayText}>{dayOfWeek[index % dayOfWeek.length]}</Text>
                        <TouchableOpacity onPress={() => {}}>
                            <View style={styles.radioView}>
                                <View style={styles.mealNameImage}>
                                    <View style={styles.backgroundImage}>
                                        <ImageBackground source={{ uri: imageUrl }} style={styles.cardImage} />
                                    </View>
                                    <Text style={styles.text}>{meal.mealName}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
};

export default UserSelectedMeal;

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        paddingTop: 20,
    },
    mealNameImage: {
        flexDirection: "row",
        justifyContent: "center",
        width: "90%",
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        width: "100%",
        paddingTop: 15,
        textAlign: "left",
        paddingLeft: 55,
    },
    radioView: {
        alignContent: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        height: 80,
        marginBottom: 10,
        paddingLeft: 25,
    },
    backgroundImage: {
        width: width * 0.09,
        height: height * 0.09,
        paddingLeft:18,
    },
    cardImage: {
        width: width * 0.15,
        height: height * 0.07,
        resizeMode: 'center',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0,0.5,0.4,0.2)",
    },

    dayText: {
        paddingLeft:20,
        fontSize: 18,
        fontWeight: '600',
        paddingBottom: 10,
    },
});

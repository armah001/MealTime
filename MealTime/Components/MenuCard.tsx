import { View, StyleSheet, Touchable, TouchableOpacity, Text, Image, Dimensions, Platform, Switch } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useState } from "react";
import { SimpleLineIcons } from '@expo/vector-icons';

const MenuCard = ({ data, checkedValue, style, onOpen,color,lightColor }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (

        <View style={styles.container}>
            <View style={styles.firstRow}>
                <TouchableOpacity>
                    <View style={styles.iconAndName}>
                        <View style={[styles.imageView,{backgroundColor:lightColor}]}>
                        <SimpleLineIcons name="book-open" size={24} color={color} />
                        </View>
                        <Text style={styles.menuName}>{data.title}</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity>
                        <EvilIcons name="trash" size={28} color="red" />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.secondRow}>
                <Text style={styles.subText}>Select menu for the week</Text>
                <View style={styles.toggleSwitch}>
                    <TouchableOpacity>
                        <Switch
                            trackColor={{ false: '#F1F1F1', true: '#035176' }}
                            thumbColor={isEnabled ? '#fff' : '#035176'}
                            ios_backgroundColor="#F1F1F1"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                            style={styles.switch}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}
export default MenuCard;
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
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
      },
    vectorImange: {
        backgroundColor:"green",
        width: 40,
        height: 27,
        resizeMode: "cover"
    },
    subText: {
        fontSize: 16,
        fontWeight: "400",
        paddingLeft: 12
    },
    menuName: {
        fontSize: 20,
        fontWeight: "500"
    },
    firstRow: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
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
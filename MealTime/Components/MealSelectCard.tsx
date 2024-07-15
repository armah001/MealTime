import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
  ImageBackground,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import MealBottomPopOver from "./MealBottomPopOver"; // Import the edit popover component
import { REACT_NATIVE_BASE_URL } from "@env";
import EditMealBottomPopOver from "./EditMealBottomPopOver";
import EditMealPage from "../Pages/EditMealPage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Radio from "./Radio";

type RootStackParamList = {
  AllMealPage: any;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "AllMealPage">;

const MealCard = ({ data, style, color, lightColor, imageUrl }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const [mealName, setMealName] = useState(data.mealName); // Initialize with existing meal data
  const [mealImage, setMealImage] = useState(data.mealImage); // Initialize with existing meal data

  const altImage = require("../assets/addmeal.png");

  const image = imageUrl || altImage;

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <TouchableOpacity>
          <View style={styles.iconAndName}>
            <View style={[styles.imageView, { backgroundColor: lightColor }]}>
              <ImageBackground
                source={{ uri: image }}
                style={styles.cardImage}
              ></ImageBackground>
            </View>
            <View style={styles.textbox}>
              <Text style={styles.mealName}>{data.mealName}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.iconstyle}>
            <Radio
              data={undefined}
              checkedValue={undefined}
              onChange={undefined}
              style={{ marginBottom: 15, fontSize: 30 }}
              checkIcon={"check-box-checked"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MealCard;

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#F9F9F9",
    borderRadius: 5,
    marginBottom: 20,
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  iconstyle: {
    flexDirection: "column",
    justifyContent: "space-between",
    height: "70%",
  },
  mealName: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "left",
  },
  textbox: {
    width: "80%",
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
    width: width * 0.1,
    height: height * 0.05,
    borderRadius: 5,
    marginRight: 10,
  },
  cardImage: {
    width: width * 0.12,
    height: height * 0.05,
    resizeMode: "center",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  iconAndName: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});

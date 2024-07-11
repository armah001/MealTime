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

type RootStackParamList = {
  EditMealPage: any;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "EditMealPage">;

const MealCard = ({ data, style, color, lightColor, imageUrl }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const [mealName, setMealName] = useState(data.mealName); // Initialize with existing meal data
  const [mealImage, setMealImage] = useState(data.mealImage); // Initialize with existing meal data
  const handleDeleteMeal = async () => {
    try {
      const response = await fetch(
        `${REACT_NATIVE_BASE_URL}/api/Meal/RemoveMeal?mealname=${encodeURIComponent(
          data.mealName
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(`Menu '${data.mealName}' deleted successfully.`);
        setTimeout(() => {}, 2000);
      } else {
        console.error("Failed to delete meal:", response.status);
      }
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleEditPage = () => {
    navigation.navigate("EditMealPage", { data });
  };

  const handleEditMeal = async () => {
    try {
      const response = await fetch(
        `${REACT_NATIVE_BASE_URL}/api/Meal/EditMeal?mealId=${encodeURIComponent(
          data.mealId
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newMeal: mealName,
            mealImage: mealImage,
          }),
        }
      );

      if (response.ok) {
        console.log(`Meal '${data.mealName}' Edited successfully.`);
        setIsPopoverVisible(false); // Close popover after editing
        setTimeout(() => {}, 2000);
      } else {
        console.error("Failed to edit meal:", response.status);
      }
    } catch (error) {
      console.error("Error editing meal:", error);
    }
  };
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
              {/* <SimpleLineIcons name="briefcase" size={20} color={color} /> */}
            </View>
            <View style={styles.textbox}>
              <Text style={styles.mealName}>{data.mealName}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity style={styles.iconstyle}>
            <Feather
              name="trash-2"
              size={20}
              color="red"
              onPress={handleDeleteMeal}
            />
            <Feather
              name="edit"
              size={20}
              color="red"
              onPress={handleEditPage}
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
    fontSize: 10,
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

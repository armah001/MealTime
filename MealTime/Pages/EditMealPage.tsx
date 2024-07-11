import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../Components/AuthContext";
import NavigationHeader from "../Components/NavigationHeader";
import { REACT_NATIVE_BASE_URL } from "@env";
import MealCard from "../Components/MealCard";
import { getRandomColor, lightenHexColor } from "../Components/Utils/Misc";
import Loader from "../Components/Loader";
import EditMealBottomPopOver from "../Components/EditMealBottomPopOver";

type RootStackParamList = {
  AllMealPage: any;
  AdminPage: any;
  LogIn: any;
  // Add other screen names here
};

type NavigationProp = StackNavigationProp<RootStackParamList, "AllMealPage">;

const EditMealPage = ({ route }) => {
  const { data } = route.params;
  const { clearFields } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp>();
  const [showPopOver, setShowPopOver] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const [mealName, setMealName] = useState(data.mealName);
  //   const [mealImage, setMealImage] = useState(data.mealImage);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    clearFields();
    navigation.navigate("LogIn");
  };

  const handleConfirm = async (mealName, mealImage) => {
    try {
      const response = await fetch(
        `${REACT_NATIVE_BASE_URL}/api/Meal/EditMeal?mealId=${encodeURIComponent(
          data.id
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MealName: mealName,
            MealImage: mealImage,
          }),
        }
      );

      if (response.ok) {
        console.log(`Meal '${data.mealName}' Edited successfully.`);
        setShowPopOver(false); // Close popover after editing
        navigation.navigate("AllMealPage");
        setTimeout(() => {}, 2000);
      } else {
        console.error("Failed to edit meal:", response.status);
      }
    } catch (error) {
      console.error("Error editing meal:", error);
      // Handle error scenario here if needed
    }
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.salutationBar}>
        <NavigationHeader
          onBackPress={() => navigation.goBack()}
          onAddPress={() => setShowPopOver(true)}
          title={"Edit Selected Meal"}
          nameLabel={"Edit"}

        />
      </View>
      <View style={styles.line} />
      <View style={styles.body}>
        {isLoading && <Loader loading />}

        <ScrollView
          contentContainerStyle={styles.mealView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <MealCard
            key={data.mealId}
            data={data}
            color={getRandomColor(data.id)}
            lightColor={lightenHexColor(getRandomColor(data.id), 80)}
            style={undefined}
            imageUrl={data.mealImage}
          />
        </ScrollView>

        {showPopOver && (
          <EditMealBottomPopOver
            compHeight={20}
            onCancel={() => setShowPopOver(false)}
            onConfirm={handleConfirm}
            data={data}
          />
        )}
      </View>
    </View>
  );
};

export default EditMealPage;
const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 0,
    backgroundColor: "white",
    paddingTop: 40,
  },
  cardImage: {
    width: width * 0.95,
    height: height * 0.4,
    resizeMode: "contain",
  },
  imageText: {
    width: width,
    height: height * 0.04,
  },
  meal: {
    width: "100%",
    alignItems: "center",
    height: 90,
    justifyContent: "center",
    marginTop: 140,
  },
  Activities: {
    fontSize: 30,
    fontWeight: "500",
    color: "#162D3A",
    marginLeft: -260,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 45,
  },
  salutationBar: {
    height: 60,
  },
  body: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  bodyContent: {
    marginBottom: 180,
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(217,217,217,1)",
  },
  mealView: {
    padding: 20,
    alignItems: "center",
    width: width * 0.92,
  },
});

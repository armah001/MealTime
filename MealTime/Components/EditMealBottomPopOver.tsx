import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  TextInput,
  Keyboard,
  Animated,
  Image,
  Alert,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import * as ImagePicker from "expo-image-picker";

const EditMealBottomPopOver = ({ data, onConfirm, onCancel, compHeight }) => {
  const [mealName, setMealName] = useState(data.mealName);
  const [mealImage, setMealImage] = useState(data.mealImage);
  const [keyboardOffset, setKeyboardOffset] = useState(new Animated.Value(0));

  const handleMealChange = (text) => {
    setMealName(text);
  };

  const handleImageUpload = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Denied",
          "You need to grant permission to access photos."
        );

        return;
      }
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        allowsMultipleSelection: false, // Allow multiple image selection
      });
      if (!pickerResult.canceled) {
        setMealImage(pickerResult.assets[0].uri); // Update state with selected image URIs
      }
    } catch (error) {
      console.error("Error picking images", error);
    }
  };

  const handleConfirmPress = () => {
    onConfirm(mealName, mealImage);
    onCancel();
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = (event) => {
    Animated.timing(keyboardOffset, {
      duration: 50,
      toValue: -event.endCoordinates.height,
      useNativeDriver: false,
    }).start();
  };

  const keyboardDidHide = () => {
    Animated.timing(keyboardOffset, {
      duration: 300,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        { transform: [{ translateY: keyboardOffset }] },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.cardHeader}>
          <Text style={styles.title}>Edit Meal</Text>
          <TouchableOpacity style={styles.closeIcon} onPress={onCancel}>
            <MaterialCommunityIcons
              name="window-close"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.line} />
        <View style={styles.inputSection}>
          <Text style={styles.text}>Meal Image</Text>
          <TouchableOpacity
            style={styles.imageUploadSection}
            onPress={handleImageUpload}
          >
            <ImageBackground
              source={{ uri: mealImage }}
              style={styles.uploadIcon}
            ></ImageBackground>
          </TouchableOpacity>
          <Text style={styles.text}>Meal Name</Text>
        </View>

        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter name of the Meal"
            value={mealName}
            onChangeText={handleMealChange}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonWidth={width * 0.9}
            title="Update"
            onPress={handleConfirmPress}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default EditMealBottomPopOver;

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  textInputStyle: {
    marginLeft: 20,
    // marginBottom: 40,
    width: width * 0.9,
    height: height * 0.1,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingLeft: 20,
    paddingBottom: 30,
  },
  cardHeader: {
    width: width,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  inputSection: {
    width: width,
    marginBottom: 20,
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: width,
    height: height * 0.5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 50,
  },
  title: {
    color: "#000033",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    color: "black",
    fontSize: 18,
    textAlign: "left",
    fontWeight: "500",
    margin: 20,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
  },
  cancelButton: {
    borderColor: "#000033",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000033",
  },
  closeIcon: {
    paddingBottom: 16,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#000033",
    borderRadius: 5,
    padding: 10,
    width: "45%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(217,217,217,1)",
    marginBottom: 10,
    marginTop: -10,
  },
  imageUploadSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  uploadIcon: {
    marginLeft: 20,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  uploadedIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "cover",
    marginRight: 10,
  },
});

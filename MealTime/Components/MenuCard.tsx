import {
  View,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Platform,
  Switch,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { REACT_NATIVE_BASE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  MenuConfigPage: any;
  AllMenuPage: any;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "AllMenuPage">;

const MenuCard = ({ data, style, color, lightColor, onMenuActivate }) => {
    const navigation = useNavigation<NavigationProp>();

  const handleDeleteMenu = async () => {
    try {
      const response = await fetch(
        `${REACT_NATIVE_BASE_URL}/api/Menu/RemoveMenu?MenuName=${encodeURIComponent(
          data.menuName
        )}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Handle success scenario (e.g., remove menu from UI)
        console.log(`Menu '${data.menuName}' deleted successfully.`);
        setTimeout(() => {}, 2000);
      } else {
        console.error("Failed to delete menu:", response.status);
        // Handle failure scenario if needed
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
      // Handle error scenario if needed
    }
  };

  const handleToggleMenu = async (newValue) => {
    onMenuActivate(data.id);
    console.log("this id the menu ", data.id);
    try {
      const activationCode = newValue ? true : false;

      const response = await fetch(
        `${REACT_NATIVE_BASE_URL}/api/Menu/ActivateMenu?MenuID=${encodeURIComponent(
          data.MenuID
        )}&ActivationCode=${activationCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Handle success scenario (e.g., update UI state)
        console.log(`Menu '${data.menuName}' toggled successfully.`);
        // Assuming you have a callback to update UI state after API call
        onMenuActivate(data.id);
      } else {
        console.error("Failed to toggle menu:", response.status);
        // Handle failure scenario if needed
      }
    } catch (error) {
      console.error("Error toggling menu:", error);
      // Handle error scenario if needed
    }
  };

  useEffect(() => {
    if (handleDeleteMenu) {
      //window.location.reload()
    }
  }, [handleDeleteMenu]);

  const navigateToDetails = () => {
    navigation.navigate("MenuConfigPage"); 
  };

  return (
    <TouchableOpacity onPress={navigateToDetails}>
      <View style={styles.container}>
        <View style={styles.firstRow}>
          <TouchableOpacity>
            <View style={styles.iconAndName}>
              <View style={[styles.imageView, { backgroundColor: lightColor }]}>
                <SimpleLineIcons name="book-open" size={24} color={color} />
              </View>
              <Text style={styles.menuName}>{data.menuName}</Text>
            </View>
          </TouchableOpacity>

          <View>
            <TouchableOpacity>
              <EvilIcons
                name="trash"
                size={30}
                color="red"
                onPress={handleDeleteMenu}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.subText}>Select menu for the week</Text>
          <View style={styles.toggleSwitch}>
            <TouchableOpacity>
              <Switch
                trackColor={{ false: "#F1F1F1", true: "#035176" }}
                thumbColor={data.menuActivated ? "#fff" : "#035176"}
                ios_backgroundColor="#F1F1F1"
                onValueChange={(newValue) => handleToggleMenu(newValue)}
                value={data.menuActivated}
                style={styles.switch}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MenuCard;
const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.1,
    paddingTop: 10,
    backgroundColor: "white",
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
  toggleSwitch: {
    width: width * 0.13,
  },
  switch: {
    transform: [{ scaleX: 0.65 }, { scaleY: 0.65 }],
  },
  vectorImange: {
    backgroundColor: "green",
    width: 40,
    height: 27,
    resizeMode: "cover",
  },
  subText: {
    fontSize: 16,
    fontWeight: "300",
    paddingLeft: 12,
  },
  menuName: {
    fontSize: 20,
    fontWeight: "500",
  },
  firstRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 14,
  },
  secondRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 5,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(34,97,171,0.11)",
    width: width * 0.15,
    height: height * 0.05,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 12,
  },
  iconAndName: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

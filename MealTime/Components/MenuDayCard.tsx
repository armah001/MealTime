import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MenuDayCard = ({ data, style, color, lightColor, onMenuActivate }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        {/* <TouchableOpacity> */}
          <View style={styles.iconAndName}>
            <Text style={styles.menuName}>Monday</Text>
          </View>
        {/* </TouchableOpacity> */}
      </View>

      <View style={styles.secondRow}>
        <TouchableOpacity style={styles.addMealContainer}>
          <Feather
            name="plus"
            size={30}
            color="#035176"
            onPress={() => {
              // Define what happens when the plus icon is pressed
            }}
          />
          <Text style={styles.subText}>Add Meal(s)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuDayCard;

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
  subText: {
    fontSize: 16,
    fontWeight: "300",
    paddingLeft: 12,
    color:"#035176"
  },
  menuName: {
    fontSize: 20,
    fontWeight: "500",
    paddingLeft: 10,
  },
  firstRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 14,
  },
  secondRow: {
    flexDirection: "row", // Ensures items are in a row
    alignItems: "center", // Vertically centers items
    paddingBottom: 5,
  },
  iconAndName: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  addMealContainer: {
    flexDirection: "row", // Ensure the icon and text are in the same line
    alignItems: "center",
  },
});

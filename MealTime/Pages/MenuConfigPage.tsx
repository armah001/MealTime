import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../Components/AuthContext";
import NavigationHeader from "../Components/NavigationHeader";
import { REACT_NATIVE_BASE_URL } from "@env";
import { getRandomColor, lightenHexColor } from "../Components/Utils/Misc";
import Loader from "../Components/Loader";
import MenuDayCard from "../Components/MenuDayCard";

type RootStackParamList = {
  AllMenuPage: any;
  LogIn: any;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "AllMenuPage">;

const MenuConfigPage = ({}) => {
  const { clearFields } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    clearFields();
    navigation.navigate("LogIn");
  };

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.salutationBar}>
        <NavigationHeader
          onBackPress={() => navigation.goBack()}
          onAddPress={undefined}
          title={"Configure Weekly Meals"}
          nameLabel={undefined}
          icon={undefined}
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
          <MenuDayCard
            data={undefined}
            style={undefined}
            color={undefined}
            lightColor={undefined}
            onMenuActivate={undefined}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default MenuConfigPage;
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

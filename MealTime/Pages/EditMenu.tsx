import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Image, BackHandler, ScrollView } from 'react-native';
import CustomButton from '../Components/CustomButton';
import TitleCard from '../Components/TitleCArd';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SalutationBar from '../Components/SalutationBar';
import AdminHeroCard from '../Components/AdminHeroCard';
import AdminMenu from '../Components/AdminMenu';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../Components/AuthContext';
import NavigationHeader from '../Components/NavigationHeader';
import BottomPopOver from '../Components/BottomPopOver';
import MenuCard from '../Components/MenuCard';
import Loader from '../Components/Loader';
import {getRandomColor, lightenHexColor} from '../Components/Utils/Misc'
type RootStackParamList = {
  LogIn: any;
  // Add other screen names here
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LogIn'>;

const AllMenuPage: React.FC = () => {
  const { clearFields } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp>();
  const [showPopOver, setShowPopOver] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    clearFields();
    navigation.navigate('LogIn');
  };

  useEffect(() => {
    // Mock fetching data
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate an API call
      setTimeout(() => {
        setData([
          {
            id: 0,
            title: "Menu 1",
            image: "",
            link: "Menu1"
          },
          {
            id: 1,
            title: "Menu 2",
            image: "",
            link: "Menu1"
          },
          {
            id: 2,
            title: "Menu 5",
            image: "",
            link: "Menu1"
          },
          {
            id: 3,
            title: "Test",
            image: "",
            link: "Menu1"
          },
          {
            id: 4,
            title: "Trial",
            image: "",
            link: "Menu1"
          },
          {
            id: 5,
            title: "Something",
            image: "",
            link: "Menu1"
          },
          {
            id: 6,
            title: "Menu 5",
            image: "",
            link: "Menu1"
          },
          {
            id: 7,
            title: "Test",
            image: "",
            link: "Menu1"
          }
        ]);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.salutationBar}>
        <NavigationHeader
          onBackPress={() => navigation.goBack()}
          onAddPress={() => setShowPopOver(true)}
          title={"All Menus"}
        />
      </View>
      <View style={styles.line} />
      <View style={styles.body}>
        {isLoading && <Loader loading/>}
        {data.length === 0 && !isLoading ? (
          <View style={styles.bodyContent}>
            <Image source={require('../assets/noMenu.png')} style={styles.cardImage} />
            <View style={styles.imageText}>
              <Text style={{ textAlign: "center" }}>
                There are no menus, Click on "Add" to {'\n'} create a new menu.
              </Text>
            </View>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.menuView} 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
            {data.map((menu) => (
              <MenuCard key={menu.id} checkedValue={menu} data={menu} style={undefined} onOpen={undefined} color={getRandomColor(menu.id)} lightColor={lightenHexColor(getRandomColor(menu.id),80)}/>
              //<Text>Hello</Text>
            ))}
          </ScrollView>
        )}
        {showPopOver && (
          <BottomPopOver
            compHeight={24}
            onConfirm={() => { }}
            onCancel={() => setShowPopOver(false)}
          />
        )}
      </View>
    </View>
  );
};

export default AllMenuPage;

const { width, height } = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: "flex-start",
    margin: 0,
    backgroundColor: "white"
  },
  menuView: {
    padding: 20,
    alignItems: 'center',
    width: width * 0.92,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(217,217,217,1)',
  },
  cardImage: {
    width: width * 0.95,
    height: height * 0.4,
    resizeMode: 'contain',
  },
  imageText: {
    width: width,
    height: height * 0.04,
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
    alignItems: 'center',
  },
});

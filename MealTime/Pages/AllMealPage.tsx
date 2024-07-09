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
import { AuthContext} from '../Components/AuthContext';
import NavigationHeader from '../Components/NavigationHeader';
import BottomPopOver from '../Components/BottomPopOver';
import MealBottomPopOver from '../Components/MealBottomPopOver';
import { REACT_NATIVE_BASE_URL } from '@env';
import MealCard from '../Components/MealCard';
import { getRandomColor, lightenHexColor } from '../Components/Utils/Misc';
import Loader from '../Components/Loader';
import EditMealBottomPopOver from '../Components/EditMealBottomPopOver';


type RootStackParamList = {
  LogIn: any;
  // Add other screen names here
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LogIn'>;

const AllMealPage: React.FC = () => {
    const { clearFields } = useContext(AuthContext);
    const navigation = useNavigation<NavigationProp>();
    const [showPopOver, setShowPopOver] = useState(false);
    const[isLoading,setIsLoading]=useState<boolean>(false)
    const [meals, setMeals] = useState<any[]>([]);

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        clearFields();
        navigation.navigate('LogIn');
    };

    useEffect(() => {
    const fetchMeals = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${REACT_NATIVE_BASE_URL}/api/Meal/GetMeals`);
          if (response.ok) {
            const data = await response.json();
            //setMenus(data); // Set fetched menus to state
  
            setMeals(data.map(meal => ({
              ...meal,
            })));
  
          } else {
            console.error('Failed to fetch meals:', response.status);
            // Handle failure scenario if needed
          }
        } catch (error) {
          console.error('Error fetching meals:', error);
          // Handle error scenario if needed
        } finally {
          setIsLoading(false);
        }
      };
      fetchMeals();

    },[]);

    
    return (
        <View style={styles.container}>
            <View style={styles.salutationBar}>
            <NavigationHeader onBackPress={()=>navigation.goBack()} onAddPress={()=>setShowPopOver(true)} title={"All Meals"}/>
            </View>
            <View style={styles.line} />
           <View style={styles.body}>
           {isLoading && <Loader loading />}
          {meals.length === 0 && !isLoading ? (
          <View style={styles.bodyContent}>
             <Image source={require('../assets/noMenu.png')} style={styles.cardImage} >
             </Image>
             <View style={styles.imageText}>
             <Text style={{textAlign:"center"}}>There are no meals, Click on "Add" to {'\n'} create a new meal. </Text>
             </View>
             
          </View>
        ) : (
        <ScrollView contentContainerStyle={styles.mealView} 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>

        {meals.map((meal) =>(
          <MealCard 
          key={meal.mealId}
          data={meal}
          color={getRandomColor(meal.id)}
          lightColor={lightenHexColor(getRandomColor(meal.id), 80)}
          style={undefined}  
          
         

          />
        ))}

        </ScrollView>
        )}
         {showPopOver && (
        <MealBottomPopOver compHeight={20} onCancel={() => setShowPopOver(false)} initialMealName={''} initialMealImage={''} onConfirm={function (): Promise<void> {
              throw new Error('Function not implemented.');
            } } />
      )}
           </View>
         
        </View>
    ); 
};

export default AllMealPage;
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:"flex-start",
        margin:0,
        backgroundColor:"white",
        paddingTop: 40
    },
    cardImage: {
        width: width * 0.95,
        height: height * 0.4,
        resizeMode: 'contain',
    },
    imageText:{
        width:width,
        height:height * 0.04
    },
    meal: {
        width: '100%',
        alignItems: 'center',
        height:90,
        justifyContent:"center",
        marginTop:140
    },
    Activities:{
        fontSize:30,
        fontWeight:"500",
        color:"#162D3A",
        marginLeft:-260
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 45
    },
    salutationBar:{
        height:60,
    },
    body:{
        alignItems:"center",
        justifyContent:"center",
        width:"100%",
        height:"100%",
    },
    bodyContent:{
        marginBottom:180
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(217,217,217,1)',
      },
      mealView: {
        padding: 20,
        alignItems: 'center',
        width: width * 0.92,
      },
});
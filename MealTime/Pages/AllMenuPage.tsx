import React, { useContext, useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Image, BackHandler } from 'react-native';
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


type RootStackParamList = {
  LogIn: any;
  // Add other screen names here
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LogIn'>;

const AllMenuPage: React.FC = () => {
    const { clearFields } = useContext(AuthContext);
    const navigation = useNavigation<NavigationProp>();
    const [showPopOver, setShowPopOver] = useState(false);
    const[isLoading,setIsLoading]=useState<boolean>(false)
    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        clearFields();
        navigation.navigate('LogIn');
    };

    const data =[
      ]
    return (
        <View style={styles.container}>
            <View style={styles.salutationBar}>
            <NavigationHeader onBackPress={()=>navigation.goBack()} onAddPress={()=>setShowPopOver(true)} title={"All Menus"}/>
            </View>
           <View style={styles.body}>
        {/* {getMenuResult.loading && <Loader />} */}
        {data.length!==null && !isLoading && (
          <View style={styles.bodyContent}>
             <Image source={require('../assets/noMenu.png')} style={styles.cardImage} >
             </Image>
             <View style={styles.imageText}>
             <Text style={{textAlign:"center"}}>There are no menus, Click on "Add" to {'\n'} create a new menu. </Text>
             </View>
             
          </View>
        )}
        {data && (
          <View >
            {data.map((meal) => (
             <Text>There are some menus</Text>
            ))}
          </View>
        )}
         {showPopOver && (
        <BottomPopOver compHeight={24} onConfirm={()=>{}} onCancel={() => setShowPopOver(false)} />
      )}
           </View>
         
        </View>
    ); 
};

export default AllMenuPage;
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:"flex-start",
        margin:0,
        backgroundColor:"white"
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
    menu: {
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
    }
});
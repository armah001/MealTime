import React, { useContext, useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import CustomButton from '../Components/CustomButton';
import TitleCard from '../Components/TitleCArd';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import SalutationBar from '../Components/SalutationBar';
import AdminHeroCard from '../Components/AdminHeroCard';
import AdminMenu from '../Components/AdminMenu';
import * as SecureStore from 'expo-secure-store';
import { AuthContext} from '../Components/AuthContext';

type RootStackParamList = {
  LogIn: any;
  AllMenuPage: any;
  // Add other screen names here
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'LogIn'>;

const AdminPage: React.FC = () => {
    const { clearFields } = useContext(AuthContext);
    const navigation = useNavigation<NavigationProp>();

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync("accessToken");
        clearFields();
        navigation.navigate('LogIn');
    };

    const data =[
        {
            id:0,
            title:"Add Menu",
            description:"Create menu for the whole week.",
            image:"",
            link:"AllMenuPage"
        },
        {
            id:1,
            title:"Choose Meals",
            description:"Select meals you want to eat for the week",
            image:"",
            link:"HomePage"
        },
        {
            id:2,
            title:"All Meals",
            description:"View, add, edit and delete all meals",
            image:"",
            link:"AllMealPage"
        },
        {
            id:3,
            title:"Reports",
            description:"View and export data from the app",
            image:"",
            link:"Reports"
        }]
    return (
        <View style={styles.container}>
            <View style={styles.salutationBar}>
            <SalutationBar/>
            </View>
            <View style={styles.TitleCard}>
            <AdminHeroCard/>
            </View>
            <View style={styles.menu}>
                <Text style={styles.Activities}>Activities</Text>
                <AdminMenu data={data} style={undefined}/>
            </View>
            {/* <View style={styles.salutationBar}>
            <SalutationBar/>
            </View>
            
            <TitleCard/>
            <View style={styles.innerContainer}>
            <Text style={styles.textStyle}>Sign Up </Text>
           
            </View> */}
        </View>
    );
};

export default AdminPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:40,
        alignItems: 'center',
        justifyContent:"flex-start",
        margin:0,
        backgroundColor:"white"
    },
    TitleCard: {
        width: '100%',
        alignItems: 'center',
        height:90,
        justifyContent:"center",
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
    }
});
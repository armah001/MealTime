import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import Hero from './Components/Hero';
import SelectionTab from './Components/SelectionTab';
import LogInPage from './Pages/LogInPage';
import SignUpPage from './Pages/SignUpPage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomePage from './Pages/HomePage';
import AdminPage from './Pages/AdminPage';
import SuccessCard from './Components/SucessCard';
import FailCard from './Components/UnsucessfulCard';
import AllMenuPage from './Pages/AllMenuPage';
import AllMealPage from './Pages/AllMealPage';
import AllMealSelectionPage from './Pages/AllMealSelectionPage';
import EditMealPage from './Pages/EditMealPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
      
    //   <SignUpPage/>
    
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home"
       screenOptions={{ unmountOnBlur: true,
        headerLeft: null,
        headerShown: false,
       }}>

        <Stack.Screen name = "SignUp" component ={SignUpPage}/>
        <Stack.Screen name = "LogIn" component ={LogInPage}/>
        <Stack.Screen name = "HomePage" component ={HomePage}/>
        <Stack.Screen name = "AllMenuPage" component ={AllMenuPage}/>
        <Stack.Screen name = "AllMealPage" component ={AllMealPage}/>
        <Stack.Screen name = "AdminPage" component ={AdminPage}/>
        <Stack.Screen name = "SuccessCard" component = {SuccessCard}/>
        <Stack.Screen name = "UnsuccesfulCard" component = {FailCard}/>
        <Stack.Screen name = "AllMealSelectionPage" component={AllMealSelectionPage}/>  
        <Stack.Screen name = "EditMealPage" component= {EditMealPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex:1,
    justifyContent: "center",
    width: '100%',
    height: '35%',
  },
  SelectionTab:{
    width: '100%',
    height: '65%',
   // backgroundColor:"yellow"
  }
});

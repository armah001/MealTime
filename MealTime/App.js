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


const Stack = createStackNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
      
    //   <SignUpPage/>
    
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name = "SignUp" component ={SignUpPage}/>
        <Stack.Screen name = "LogIn" component ={LogInPage}/>
        <Stack.Screen name = "HomePage" component ={HomePage}/>

        <Stack.Screen name = "AdminPage" component ={AdminPage}/>

        <Stack.Screen name = "SuccessCard" component = {SuccessCard}/>

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

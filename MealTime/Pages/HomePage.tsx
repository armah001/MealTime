import { StyleSheet, Text, View,ImageBackground,TouchableOpacity } from 'react-native';
import Hero from '../Components/Hero';
import SelectionTab from '../Components/SelectionTab';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ConfirmModal from '../Components/ConfirmModal';
import { useState } from 'react';
import SuccessCard from '../Components/SucessCard';
        

    type RootStackParamList = {
        AdminPage: any;
        // Add other screen names here
      };
      
      type NavigationProp = StackNavigationProp<RootStackParamList, 'AdminPage'>;




export default function HomePage() {
    const navigation = useNavigation<NavigationProp>();
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  const handleLogout = () => {
  }; 
  return (
   <View style={styles.container}>
<ImageBackground
      source={require('../assets/burger.avif')} 
      style={styles.backgroundImage}
    >
     
      <View style={styles.content}>
        <View style={styles.salutation}>
        <Text style={styles.text}>Hi, Eric!</Text>
        <View>
        </View>
        <View style={styles.settingsIcon}>
      <TouchableOpacity onPress={()=>navigation.navigate("AdminPage")}>
        <MaterialIcons name="admin-panel-settings" size={24} color="white" />
      </TouchableOpacity>
    </View>
    <View style={styles.logOutIcon}>
      <TouchableOpacity onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="white" />
      </TouchableOpacity>
    </View>
        </View>
  
        {!showSuccessCard && (
            <View style={styles.HeroBox}>
              <Text style={styles.HeroText}>Choose Your Meals For The Week</Text>
            </View>
          )}
      </View>
      
    </ImageBackground>
    {/* <View style={styles.HeroBox}>
        <Text style={styles.HeroText}>Choose Your Meals For The Week</Text>
        </View> */}
        <View style={styles.SelectionTab}>
        {showSuccessCard ? <SuccessCard /> : <SelectionTab onConfirm={() => setShowSuccessCard(true)} /> }
        </View>
   </View>     

  );
}
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  SelectionTab:{
      flex:0.7,
      width:"100%",
      height:"100%",
      marginTop:-190,
      
  },
  backgroundImage: {
    flex: 0.3,
    width: "100%", 
    resizeMode: 'cover', 
    justifyContent: 'center', 
  },
  content: {
    flex: 1,
    flexDirection:"column",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent:"space-evenly",
    alignItems:"center",
    marginTop: -190
   
  },
  salutation: {
    flex: 1,
    flexDirection:"row",
    width:"100%",
    justifyContent:"space-between",
    alignItems:"center"
   
  },
  text:{
    fontSize:20,
    fontWeight:"600",
    color:"#fff",
    padding: 30,
  },
  HeroText:{
    textAlign:"center",
    color:"#fff",
    fontSize:35,
    fontWeight:"600",
    marginBottom:60

  },
  HeroBox:{
    width:"75%",
  },
  logOutIcon:{
    justifyContent: 'center',
    alignItems: 'center',
    width:40,
    height:40,
    backgroundColor:"rgba(217,217,217,0.4)",
    borderRadius:100,
    marginRight:20,
  },
  settingsIcon:{
    justifyContent: 'center',
    alignItems: 'center',
    width:40,
    height:40,
    backgroundColor:"rgba(217,217,217,0.4)",
    borderRadius:100,
    marginRight:-40,
  }
});

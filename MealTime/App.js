import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import Hero from './Components/Hero';
import SelectionTab from './Components/SelectionTab';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/burger.avif')} resizeMode='cover' style={styles.image}>

        
      </ImageBackground>
      <View style={styles.SelectionTab}>
        <SelectionTab/>
      </View>
    
    </View>
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

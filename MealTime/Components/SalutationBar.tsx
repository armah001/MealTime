import { MaterialIcons } from '@expo/vector-icons';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native'

const SalutationBar=()=>{
    return (
    <View style={styles.container}>
             <Text style={styles.text}>Hi, Eric!</Text>
        <View style={styles.logOutIcon}>
      <TouchableOpacity onPress={()=>{}}>
        <MaterialIcons name="logout" size={24} color="white" />
      </TouchableOpacity>
    </View>
    </View>
    );
}

const styles=StyleSheet.create({
    container:{
        width:"100%",
        flex: 1,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    text:{
        fontSize:20,
        fontWeight:"600",
        color:"#fff",
        padding: 30,
      },
      logOutIcon:{
        justifyContent: 'center',
        alignItems: 'center',
        width:40,
        height:40,
        backgroundColor:"rgba(217,217,217,0.4)",
        borderRadius:50,
        marginRight:20,
      }
})
export default SalutationBar;
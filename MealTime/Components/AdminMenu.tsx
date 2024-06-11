import { View,StyleSheet, Touchable, TouchableOpacity,Text, ImageBackground, Platform } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
const AdminMenu=({data,style})=>{
    return (
        <View style={[styles.container,style]}>
           {data.map((menu)=>{
            //let active=checkedValue==meal.value;
            return (
            <TouchableOpacity 
            onPress={()=>{}}
               key={menu.id}
               >
                <View style={styles.radioView}>
                <View style={styles.mealNameImage}>
                <View style={styles.backgroundImage}>
                    
                    </View>
                   <View style={styles.menuText}>
                   <Text style={styles.text}>
                    {menu.title}
                </Text>
                <Text style={styles.description}>
                    {menu.description}
                </Text>
                   </View>
                
                </View>
                   
                </View>
                
            </TouchableOpacity>)
           })} 
        </View>
    );
}
export default AdminMenu;

const styles=StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        paddingTop:20,
    },
    mealNameImage:{
        alignContent:"center",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row"
    },
    text:{
        fontSize:20,
        fontWeight:"500",
        width:"100%"
    },
    menuText:{
        paddingLeft:10
    },
    description:{
        fontSize:16,
        fontWeight:400,
        width:"100%"
    },
    radioView:{
        alignContent:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        width:"95%",
        height:80,
        marginBottom:10,
        marginLeft:8,
        paddingLeft:25,
        backgroundColor:"white",
        borderRadius:10,
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            android: {
              elevation: 5,
            },
          }),
    },
    backgroundImage:{
        width:50,
        height:50,
        backgroundColor:"red",
        borderRadius:50,
    }
})
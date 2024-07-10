import { View,StyleSheet, Touchable, TouchableOpacity,Text, ImageBackground ,Dimensions} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


const Radio=({data,checkedValue,onChange,style})=>{

    return (
        <View style={[styles.container,style]}>
           {data.map((meal)=>{
            let active=checkedValue==meal.mealName;
            const imageUrl = meal.mealImage; 
            return (
            <TouchableOpacity 
            onPress={()=>{
                onChange(meal.mealName)
               }}
               key={meal.Id}
               >
                <View style={styles.radioView}>
                <View style={{marginTop:18, width:23}}>
                <MaterialIcons 
                    name={active ? 'radio-button-checked' : 'radio-button-unchecked'} 
                        size={24} style={styles.radio}
/>
                </View>
                <View style={styles.backgroundImage}>
                    <ImageBackground source={{uri: imageUrl}} style={styles.cardImage}>
                  
                    </ImageBackground>
                    </View>

                <Text style={active ? styles.activeText : styles.text}>
                    {meal.mealName}
                </Text>
                </View>
                   
                
            </TouchableOpacity>)
           })} 
        </View>
    );
}
export default Radio;
const {width, height} = Dimensions.get('screen');
const styles=StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        paddingTop:20,
    },
    mealNameImage:{
        width:"90%",
    },
    radio:{
        color:"#254E65"
    },
    text:{
        fontSize:14,
        fontWeight:400,
        width:"75%",
        marginTop:15,
        paddingTop:10,
        textAlign:"left",
        marginRight:8,
        alignItems: "center",
       // backgroundColor:"red"

    },
    activeText:{
        fontSize:14,
        fontWeight:"500",
        width:"75%",
        marginTop:15,
        paddingTop:10,
        textAlign:"left",
        marginRight:8,
        alignItems: "center",
    },
    radioView:{
        alignContent:"center",
        justifyContent:"center",
        flexDirection:"row",
        width:"100%",
        height:80,
        marginBottom:10,
        paddingLeft:10,
        //backgroundColor:"red",
    },
    backgroundImage:{
        width:70,
        height:40,
        paddingTop:10,
        paddingLeft:8,
        //backgroundColor:"rgba(0,0.5,0.4,0.2)"
    },
    cardImage: {
        width: width * 0.13,
        height: height * 0.06,
        resizeMode: 'center',
        borderRadius: 10, 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"rgba(0,0.5,0.4,0.2)"
    },
})
import { View,StyleSheet, Touchable, TouchableOpacity,Text, ImageBackground ,Dimensions} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


const Radio=({data,checkedValue,onChange,style})=>{
    return (
        <View style={[styles.container,style]}>
           {data.map((meal)=>{
            let active=checkedValue==meal.mealName;
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
                        size={24} 
/>
                </View>
                <View style={styles.mealNameImage}>
                <View style={styles.backgroundImage}>
                    <ImageBackground source={{uri: meal.MealImage}} style={styles.cardImage}
                      >
                  
                    </ImageBackground>
                    </View>
                   
                <Text style={styles.text}>
                    {meal.mealName}
                </Text>
                </View>
                   
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

    },
    text:{
        fontSize:16,
        fontWeight:400,
        width:"100%",
        paddingTop:10,
        textAlign:"left"
    },
    radioView:{
        alignContent:"center",
        justifyContent:"space-between",
        flexDirection:"row",
        width:"100%",
        height:80,
        marginBottom:10,
        paddingLeft:25,
    },
    backgroundImage:{
        width:40,
        height:40,
        //backgroundColor:"rgba(0,0.5,0.4,0.2)"
    },
    cardImage: {
        width: width * 0.12,
        height: height * 0.05,
        resizeMode: 'center',
        borderRadius: 10, 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"red"
    },
})
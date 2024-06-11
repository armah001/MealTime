
import {useState} from 'react';
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import { AntDesign } from '@expo/vector-icons';
import DateWidget from './DateWidget';
import Radio from './Radio';

const SelectionTab = () => {
    const[meal,setMeal]=useState("Rice");
    const data =[
        {
            id:0,
            lable:"Jollof Rice with Chicken, Coleslaw, and Soda",
            value:"Jollof",
            image:""
        },
        {
            id:1,
            lable:"Fried Rice with Fish, Mixed Vegetables, and Juice",
            value:"Gari",
            image:""
        },
        {
            id:2,
            lable:"Spaghetti Bolognese with Garlic Bread and Lemonade",
            value:"Rice",
            image:""
        },
        {
            id:3,
            lable:"Grilled Chicken with Mashed Potatoes, Gravy, and Iced Tea",
            value:"Khebab",
            image:""
        },
        {
            id:4,
            lable:"Vegetable Stir-Fry with Tofu, Steamed Rice, and Green Tea",
            value:"pizza",
            image:""
        }

    ]

    return (
        <View style={styles.container}>
                <DateWidget/>
                <View style={styles.radioSelection}>
                    <Radio data={data} checkedValue={meal} onChange={setMeal} style={{marginBottom:15,fontSize:30}}/>
                </View>
            <View style={styles.button}>
            <CustomButton title='Next' buttonWidth={355}/>
            </View>
           
        </View>
        
    );
};

export default SelectionTab;

const styles = StyleSheet.create({
    radioSelection:{
      flex:10,
      width:"100%" 
    },
    button:{
        marginBottom:50
    },
    container: {
      flex:1,
      borderTopLeftRadius:20,
      borderTopRightRadius:20,
      width: '100%',
      height:555,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    DaysBox:{
        flex:1,
        width:"100%",
        marginTop:10,
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
       
    },
    text:{
        color:"black",
        fontSize:25,
        fontWeight:600,
        paddingLeft:20

        },
        arrowIcons:{
            flex:1,
            flexDirection:"row",
            justifyContent:"flex-end",
            alignItems:"center",
            paddingRight:25,
            width:10
        },
        arrowIcon:{
            color:"black",
            paddingRight:10,
        }
  });
  
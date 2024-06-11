
import React from 'react';
import { StyleSheet,View, Text, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
import { AntDesign } from '@expo/vector-icons';

const DateWidget = () => {
    return (
        <View style={styles.container}>
            <View style={styles.DaysBox}>
                <Text style={styles.text} >Monday</Text>
                <View style={styles.arrowIcons}>
                <View style={styles.arrowIcon}>
      <TouchableOpacity onPress={()=>{}}>
        <AntDesign name="arrowleft" size={24} />
      </TouchableOpacity>
    </View>
    <View  >
      <TouchableOpacity onPress={()=>{}}>
        <AntDesign name="arrowright"  size={24}/>
      </TouchableOpacity>
    </View>
                </View>
            </View>
           <View style={{backgroundColor:"rgba(217,217,217,0.4)",width:"100%",height:1}}></View>
        </View>
    );
};

export default DateWidget;

const styles = StyleSheet.create({
    container: {
      flex:1,
      width: '100%',
      height:30,
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
        color:"#162D3A",
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
            color:"#162D3A",
            paddingRight:10,
        }
  });
  